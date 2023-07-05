import TopNav from "./components/TopNav";
import Featured from "./components/Featured";
import AboutUs from "./components/AboutUs";
import OurProducts from "./components/OurProducts";
import TrendingCategories from "./components/TrendingCategories";
function App() {
  return (
    <div className="App">
      <TopNav />
      <Featured />
      <AboutUs />
      <OurProducts />
      <TrendingCategories />
    </div>
  );
}

export default App;
