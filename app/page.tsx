import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';

import Testimonials from './components/Testimonials';
import LeadCapture from './components/LeadCapture';
import Footer from './components/Footer';
import DebugPanel from './components/DebugPanel';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <Stats />
      <About />

      <Testimonials />
      <LeadCapture />
      <Footer />
      <DebugPanel />
    </main>
  );
}
