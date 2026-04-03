import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';

import Testimonials from './components/Testimonials';
import LeadCapture from './components/LeadCapture';
import Footer from './components/Footer';
import EquipmentSection from './components/EquipmentSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-950">
      <NavBar />
      <img src="/agribg.png" alt="AgriRentX Background" className="w-full h-auto block" />
      <Hero />
      <Stats />
      <About />
      <EquipmentSection />
      <Testimonials />
      <LeadCapture />
      <Footer />
    </main>
  );
}
