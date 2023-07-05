import TopNav from "./components/TopNav";
import Featured from "./components/Featured";
import AboutUs from "./components/AboutUs";
import OurProducts from "./components/OurProducts";
import TrendingCategories from "./components/TrendingCategories";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <TopNav />
      <Featured />
      <AboutUs />
      <OurProducts />
      <TrendingCategories />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
