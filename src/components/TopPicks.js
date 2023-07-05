import React, { useState, useEffect } from "react";
import { BsFillCartFill } from "react-icons/bs";

const TopPicks = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  return (
    <section className="max-w-[1520px] mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-4 text-center">
        Top
        <span className="text-orange-700"> Picks</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {apiData.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[200px] h-[200px] object-contain"
            />
            <h3 className="text-lg font-bold text-center">{product.title}</h3>
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
  );
};

export default TopPicks;
