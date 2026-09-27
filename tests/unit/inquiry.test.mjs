import { test } from "node:test";
import assert from "node:assert/strict";
import { handleInquiry } from "../../lib/inquiry-handler.ts";

const fields = { name: "Test Family", email: "family@example.test", program: "Community Weekend Soccer", message: "What should we bring?", website: "", requestId: "d9ac6689-f27e-420b-83e5-89ea562b8839" };
function setup(overrides = {}) {
  const sends = [];
  let botCalls = 0;
  const deps = { enabled: true, domain: "mail.example.test", recipient: "admin@example.test", checkBot: async () => { botCalls++; return { isBot: false }; }, send: async (mail, key) => { sends.push({ mail, key }); return { data: { id: "test-id" }, error: null }; }, ...overrides };
  const request = (body = fields, headers = {}) => new Request("https://midnimo.example.test/api/inquiry", { method: "POST", headers: { origin: "https://midnimo.example.test", "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
  return { deps, sends, request, botCalls: () => botCalls };
}

test("routes plain text only to the configured organization with reply-to and stable retry keys", async () => {
  const s = setup();
  for(let i=0;i<2;i++) assert.equal((await handleInquiry(s.request({ ...fields, to: "attacker@example.test", from: "attacker@example.test", message: "<script>plain text</script>" }), s.deps)).status, 200);
  assert.equal(s.sends[0].mail.to, "admin@example.test");
  assert.equal(s.sends[0].mail.from, "Midnimo Athletics Website <inquiries@mail.example.test>");
  assert.equal(s.sends[0].mail.replyTo, fields.email);
  assert.match(s.sends[0].mail.text, /<script>plain text<\/script>/);
  assert.equal(s.sends[0].mail.html, undefined);
  assert.equal(s.sends[0].key, s.sends[1].key);
  await handleInquiry(s.request({ ...fields, message: "Changed" }), s.deps);
  assert.notEqual(s.sends[1].key, s.sends[2].key);
});

test("accepts an optional empty question", async () => {
  const s=setup(); assert.equal((await handleInquiry(s.request({...fields,message:""}),s.deps)).status,200);
  assert.match(s.sends[0].mail.text,/No additional question provided/);
});

for (const [label, invalid] of Object.entries({ whitespaceName:{name:"  "}, headerInjection:{name:"A\r\nBcc: attacker@example.test"}, multipleRecipients:{email:"a@example.test,b@example.test"}, badEmail:{email:"broken"}, unknownProgram:{program:"other"}, longMessage:{message:"x".repeat(3001)}, wrongType:{message:[]}, trap:{website:"https://spam.example.test"}, invalidId:{requestId:"1"}, nullBody:null, arrayBody:[] })) {
  test(`rejects ${label} before contacting a provider`,async()=>{
    const s=setup();const body=invalid===null||Array.isArray(invalid)?invalid:{...fields,...invalid};
    assert.equal((await handleInquiry(s.request(body),s.deps)).status,400);
    assert.equal(s.sends.length,0);assert.equal(s.botCalls(),0);
  });
}

test("rejects oversized actual streams and malformed JSON",async()=>{
  const s=setup();
  for(const raw of ['{',JSON.stringify({...fields,message:"x".repeat(17000)})]){
    const req=new Request('https://midnimo.example.test/api/inquiry',{method:'POST',headers:{origin:'https://midnimo.example.test','content-type':'application/json'},body:raw});
    assert.equal((await handleInquiry(req,s.deps)).status,400);
  }
  assert.equal(s.sends.length,0);
});

test("rejects cross-origin, missing-origin and non-JSON requests",async()=>{
  const s=setup();
  assert.equal((await handleInquiry(s.request(fields,{origin:'https://elsewhere.example.test'}),s.deps)).status,403);
  const req=s.request();req.headers.delete('origin');assert.equal((await handleInquiry(req,s.deps)).status,403);
  assert.equal((await handleInquiry(s.request(fields,{'content-type':'text/plain'}),s.deps)).status,415);
  assert.equal(s.sends.length,0);
});

test("missing configuration fails closed",async()=>{
  for(const config of [{enabled:false},{domain:undefined},{domain:'bad@domain.test'}]){
    const s=setup(config);assert.equal((await handleInquiry(s.request(),s.deps)).status,503);assert.equal(s.sends.length,0);
  }
});

test("blocks bots and verification errors without sending",async()=>{
  for(const [checkBot,status]of [[async()=>({isBot:true}),403],[async()=>{throw Error('private diagnostic')},503]]){
    const s=setup({checkBot});const r=await handleInquiry(s.request(),s.deps);assert.equal(r.status,status);assert.equal(s.sends.length,0);assert.doesNotMatch(await r.text(),/private diagnostic/);
  }
});

test("provider errors and exceptions never produce success or leak details",async()=>{
  for(const send of [async()=>({data:null,error:{message:'private key or contact'}}),async()=>({data:null,error:null}),async()=>{throw Error('private key or contact')}]){
    const s=setup({send});const r=await handleInquiry(s.request(),s.deps);assert.ok(r.status>=500);assert.doesNotMatch(await r.text(),/private key or contact/);
  }
});
