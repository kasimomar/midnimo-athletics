import Nav from "@/components/Nav";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Programs from "@/components/Programs";
import ProgramInterest from "@/components/ProgramInterest";
import About from "@/components/About";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex={-1} className="bg-ink">
        <div id="home">
          <ScrollyCanvas />
        </div>
        <Programs />
        <ProgramInterest />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
