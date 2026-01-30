import ScrollSequence from "@/components/ScrollSequence";
import OverlayText from "@/components/OverlayText";
import Navbar from "@/components/Navbar";
import SocialProof from "@/components/SocialProof";
import MenuSection from "@/components/MenuSection";
import OrderDrawer from "@/components/OrderDrawer";

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navbar />
      <ScrollSequence />
      <OverlayText />
      {/* Post-Hero Content */}
      <div className="relative z-20 bg-[#050505]">
        <SocialProof />
        <MenuSection />
      </div>
      <OrderDrawer />
    </main>
  );
}
