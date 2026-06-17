import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Programs from "@/components/Programs";
import SignUp from "@/components/SignUp";
import About from "@/components/About";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ink">
      <LoadingScreen />
      <Nav />
      <div id="home">
        <ScrollyCanvas />
      </div>
      <Programs />
      <SignUp />
      <About />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
