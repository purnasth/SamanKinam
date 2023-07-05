import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data.map((category) => ({ category, image: "" })));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategoryImage = async (category) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return data[0].image;
      }
    } catch (error) {
      console.error(`Error fetching image for ${category}:`, error);
    }
    return "";
  };

  const fetchCategoryImages = async () => {
    const updatedCategories = await Promise.all(
      categories.map(async (categoryObj) => {
        const { category } = categoryObj;
        const image = await getCategoryImage(category);
        return { category, image };
      })
    );
    setCategories(updatedCategories);
  };

  useEffect(() => {
    fetchCategoryImages();
  }, [categories]);

  return (
    <Router>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center pb-6">
          Trending <span className="text-orange-700">Categories</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map(({ category, image }) => (
            <Link
              to={`/products/${category}`}
              className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              key={category}
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={image}
                  alt={category}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <Link
                  to={`/products/${category}`}
                  className="text-orange-700 underline hover:no-underline"
                >
                  Explore Products
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Router>
  );
};

export default TrendingCategories;
