import Navbar from "../components/layout/Navbar";
import CustomHero from "../components/custom/CustomHero";
import CustomWorksCarousel from "../components/custom/CustomWorksCarousel";
import CustomOrderForm from "../components/custom/CustomOrderForm";

export default function Custom() {
  return (
    <div className="min-h-screen ">
      <Navbar />

      <main>
        <CustomHero />
        <CustomWorksCarousel />
        <CustomOrderForm />
      </main>
    </div>
  );
}