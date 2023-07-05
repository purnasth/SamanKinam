import React, { useState, useEffect } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Link, BrowserRouter as Router } from "react-router-dom";

const OurProducts = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory !== null
      ? apiData.filter((product) => product.category === selectedCategory)
      : apiData;

  return (
    <Router>
      <section className="max-w-[1520px] mx-auto px-4 py-8">
        <section className="max-w-[1520px] mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Our
            <span className="text-orange-700"> Products</span>
          </h2>
          <div className="flex justify-center mb-4">
            <Link
              to="/products"
              className={`mr-2 ${
                selectedCategory === null
                  ? "bg-orange-700 text-white"
                  : "bg-gray-300 text-orange-700"
              } py-2 px-4 rounded-full border-none`}
              onClick={() => filterProductsByCategory(null)}
            >
              All
            </Link>
            <Link
              to="/products/cloths"
              className={`mr-2 ${
                selectedCategory === "cloths"
                  ? "bg-orange-700 text-white"
                  : "bg-gray-300 text-orange-700"
              } py-2 px-4 rounded-full border-none`}
              onClick={() => filterProductsByCategory("cloths")}
            >
              Cloths
            </Link>
            <Link
              to="/products/jewels"
              className={`mr-2 ${
                selectedCategory === "jewels"
                  ? "bg-orange-700 text-white"
                  : "bg-gray-300 text-orange-700"
              } py-2 px-4 rounded-full border-none`}
              onClick={() => filterProductsByCategory("jewels")}
            >
              Jewels
            </Link>
            <Link
              to="/products/bags"
              className={`mr-2 ${
                selectedCategory === "bags"
                  ? "bg-orange-700 text-white"
                  : "bg-gray-300 text-orange-700"
              } py-2 px-4 rounded-full border-none`}
              onClick={() => filterProductsByCategory("bags")}
            >
              Bags
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 full:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-white p-4 hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-[200px] h-[200px] object-contain"
                />
                <h3 className="text-lg font-bold text-center">
                  {product.title}
                </h3>
                <p className="text-orange-700 font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm text-center">
                  {product.description.length > 100
                    ? product.description.substring(0, 100) + "..."
                    : product.description}
                </p>
                <button className="bg-orange-700 text-white py-2 px-4 mt-4 rounded-full flex items-center border-none transition-all duration-300 hover:bg-opacity-80">
                  <BsFillCartFill size={18} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </Router>
  );
};

export default OurProducts;
