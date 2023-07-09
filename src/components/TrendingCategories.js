import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleProductClick = async (category) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const product = data[0];
        setSelectedProduct({ category, product });
      }
    } catch (error) {
      console.error(`Error fetching products for ${category}:`, error);
    }
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;
    const starArray = Array.from({ length: filledStars }, (_, index) => (
      <span key={index} className="text-yellow-400">
        &#9733;
      </span>
    ));
    if (remainingStars > 0) {
      starArray.push(
        <span key={filledStars} className="text-gray-300">
          &#9733;
        </span>
      );
    }
    return starArray;
  };

  return (
    <Router>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center pb-6">
          Trending <span className="text-orange-700">Categories</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map(({ category, image }) => (
            <div
              key={category}
              className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                  onClick={() => handleProductClick(category)}
                >
                  Explore Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedProduct && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeProductDetails}
        >
          <div className="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {selectedProduct.category} - {selectedProduct.product.title}
            </h3>
            <div className="flex items-center justify-center mb-4">
              <img
                src={selectedProduct.product.image}
                alt={selectedProduct.product.title}
                className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-contain"
              />
            </div>
            <p className="text-gray-500 text-base sm:text-lg">
              Price: ${selectedProduct.product.price}
            </p>
            <p className="text-gray-500 text-base sm:text-lg">
              Description: {selectedProduct.product.description}
            </p>
            <p className="text-gray-500 text-base sm:text-lg">
              Rating: {renderStars(selectedProduct.product.rating.rate)}
            </p>
            <p className="text-gray-500 text-base sm:text-lg">
              Discount: {selectedProduct.product.discount}%
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
    </Router>
  );
};

export default TrendingCategories;

// ? This is the loading animations
// import React, { useState, useEffect } from "react";
// import { Link, BrowserRouter as Router } from "react-router-dom";

// const TrendingCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "https://fakestoreapi.com/products/categories"
//       );
//       const data = await response.json();
//       setCategories(data.map((category) => ({ category, image: "" })));
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };
//   const getCategoryImage = async (category) => {
//     try {
//       const response = await fetch(
//         `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         return data[0].image;
//       }
//     } catch (error) {
//       console.error(`Error fetching image for ${category}:`, error);
//     }
//     return "";
//   };

//   const fetchCategoryImages = async () => {
//     const updatedCategories = await Promise.all(
//       categories.map(async (categoryObj) => {
//         const { category } = categoryObj;
//         const image = await getCategoryImage(category);
//         return { category, image };
//       })
//     );
//     setCategories(updatedCategories);
//   };

//   useEffect(() => {
//     fetchCategoryImages();
//   }, [categories]);

//   const handleProductClick = async (category) => {
//     try {
//       const response = await fetch(
//         `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         const product = data[0];
//         setSelectedProduct({ category, product });
//       }
//     } catch (error) {
//       console.error(`Error fetching products for ${category}:`, error);
//     }
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null);
//   };

//   const renderStars = (rating) => {
//     const filledStars = Math.floor(rating);
//     const remainingStars = 5 - filledStars;
//     const starArray = Array.from({ length: filledStars }, (_, index) => (
//       <span key={index} className="text-yellow-400">
//         &#9733;
//       </span>
//     ));
//     if (remainingStars > 0) {
//       starArray.push(
//         <span key={filledStars} className="text-gray-300">
//           &#9733;
//         </span>
//       );
//     }
//     return starArray;
//   };
//   return (
//     <Router>
//       <section className="max-w-6xl mx-auto px-4 py-8">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center pb-6">
//           Trending <span className="text-orange-700">Categories</span>
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {categories.map(({ category, image }) => (
//             <div
//               key={category}
//               className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
//                 <img
//                   src={image}
//                   alt={category}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold mb-2">{category}</h3>
//                 <Link
//                   to={`/products/${category}`}
//                   className="text-orange-700 underline hover:no-underline"
//                   onClick={() => handleProductClick(category)}
//                 >
//                   Explore Products
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       {loading && (
//         <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <p className="text-white">Loading...</p>
//         </div>
//       )}
//       {selectedProduct && (
//         <div
//           className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={closeProductDetails}
//         >
//           <div className="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg">
//             <h3 className="text-lg sm:text-xl font-bold mb-2">
//               {selectedProduct.category} - {selectedProduct.product.title}
//             </h3>
//             <div className="flex items-center justify-center mb-4">
//               <img
//                 src={selectedProduct.product.image}
//                 alt={selectedProduct.product.title}
//                 className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-contain"
//               />
//             </div>
//             <p className="text-gray-500 text-base sm:text-lg">
//               Price: ${selectedProduct.product.price}
//             </p>
//             <p className="text-gray-500 text-base sm:text-lg">
//               Description: {selectedProduct.product.description}
//             </p>
//             <p className="text-gray-500 text-base sm:text-lg">
//               Rating: {renderStars(selectedProduct.product.rating.rate)}
//             </p>
//             <p className="text-gray-500 text-base sm:text-lg">
//               Discount: {selectedProduct.product.discount}%
//             </p>
//             <button
//               className="bg-orange-700 text-white py-2 px-4 mt-4 rounded-full flex items-center border-none transition-all duration-300 hover:bg-opacity-80"
//               onClick={closeProductDetails}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// };

// export default TrendingCategories;
