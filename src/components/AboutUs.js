import React, { useState, useEffect } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

const AboutUs = () => {
  const [productImage, setProductImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProductImage = () => {
      setLoading(true);
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomProduct = data[randomIndex];
          setProductImage(randomProduct.image);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product image:", error);
          setLoading(false);
        });
    };

    fetchRandomProductImage();

    const intervalId = setInterval(fetchRandomProductImage, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="max-w-[1520px] mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className=" text-4xl font-bold mb-4 text-center">
        About
        <span className="text-orange-700"> Us</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center mb-8">
        {!loading ? (
          <img src={productImage} alt="Product" className="w-[7rem] mr-4" />
        ) : (
          <div className="bg-gray-200 animate-pulse w-[10rem] h-[10rem] mr-4" />
        )}
        <div className="flex">
          <p
            className="text-orange-700 text-3xl text-center p-4"
            style={{
              fontFamily: "Cedarville Cursive",
              cursive: "Cedarville Cursive",
            }}
          >
            "Quality products. Unbeatable prices."
          </p>
        </div>
      </div>
      <button className="flex items-center bg-orange-700 text-white py-2 px-4 rounded-full border-none m-auto">
        <RiShoppingCart2Line className="mr-2" />
        Shop Now
      </button>
    </section>
  );
};

export default AboutUs;
