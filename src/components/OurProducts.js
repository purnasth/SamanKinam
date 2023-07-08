import React, { useState, useEffect } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Link, BrowserRouter as Router } from "react-router-dom";

const OurProducts = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
    setIsCartVisible(true);
  };

  const removeFromCart = (product) => {
    if (product.quantity > 1) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== product.id
      );
      setCartItems(updatedCartItems);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const filteredProducts =
    selectedCategory !== null
      ? apiData.filter((product) => product.category === selectedCategory)
      : apiData;

  return (
    <Router>
      <section className="max-w-[1520px] mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Our<span className="text-orange-700"> Products</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col items-center bg-white p-4 hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${
                selectedProduct && selectedProduct.id === product.id
                  ? "shadow-2xl bg-gray-300"
                  : ""
              }`}
              onClick={() => handleCardClick(product)}
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
              <button
                className="bg-orange-700 text-white py-2 px-4 mt-4 rounded-full flex items-center border-none transition-all duration-300 hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <BsFillCartFill size={18} className="mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {selectedProduct.title}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-contain"
                />
              </div>
              <p className="text-gray-500 text-base sm:text-lg">
                Price: ${selectedProduct.price}
              </p>
              <p className="text-gray-500 text-base sm:text-lg">
                Category: {selectedProduct.category}
              </p>
              <p className="text-gray-500 text-base sm:text-lg">
                Description: {selectedProduct.description}
              </p>
              <button
                className="bg-orange-700 text-white py-2 px-4 mt-4 rounded-full flex items-center border-none transition-all duration-300 hover:bg-opacity-80"
                onClick={closeProductDetails}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* {isCartVisible && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-300">
            <h3 className="text-lg font-bold mb-4">Your Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600 italic">Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain mr-2"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {item.title}
                        </p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                        {item.quantity > 1 && (
                          <p className="text-red-500">
                            Quantity: {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="text-white text-md bg-red-500 px-3 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-red"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )} */}

        {isCartVisible && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-300">
            <h3 className="text-lg font-bold mb-4">Your Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600 italic">Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain mr-2"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {item.title}
                        </p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                        {item.quantity > 1 && (
                          <p className="text-red-500">
                            Quantity: {item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="text-white text-md bg-red-500 px-3 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-red"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.length > 0 && (
              <div className="mt-4 text-right">
                <p className="text-gray-600">
                  Total Price: ${calculateTotalPrice()}
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </Router>
  );
};

export default OurProducts;
