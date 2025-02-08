import Footer from "./Footer";
import FreeGames from "./FreeGames";
import Hero from "./Hero";
import Navbar from "./Navbar";
import TopFeatured from "./TopFeatured";
import TopSellers from "./TopSellers";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopSellers />
      <FreeGames />
      <TopFeatured />
      <Footer />
    </div>
  );
};

export default LandingPage;
