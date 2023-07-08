import React, { useState, useEffect } from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
  AiFillTag,
} from "react-icons/ai";
import { BsFillCartFill, BsPerson } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { FaUserFriends, FaGoogleWallet } from "react-icons/fa";
import {
  MdHelp,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

const TopNav = () => {
  const [sideNav, setSideNav] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/")
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  console.log(sideNav);

  return (
    <div className="max-w-[1520px] mx-auto flex justify-between items-center p-4 sticky top-0 bg-white z-20">
      <div className="flex items-center">
        <div onClick={() => setSideNav(!sideNav)} className="cursor-pointer">
          <AiOutlineMenu size={25} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 pb-2 font-bold cursor-pointer">
          Saman
          <span className="text-orange-700">Kinam</span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px] cursor-default">
          <p className="bg-orange-700 text-white rounded-full p-2 font-bold">
            Free
          </p>
          <p className="p-2 font-bold">Delivery</p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:2-[500px]">
        <AiOutlineSearch size={25} className="cursor-pointer" />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search products, brands and more"
        />
      </div>
      <button className="bg-orange-700 text-white border-none hidden md:flex items-center py-2 rounded-full">
        <BsFillCartFill size={20} />
        &nbsp;Cart
      </button>

      {sideNav ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"
          onClick={() => setSideNav(!sideNav)}
        ></div>
      ) : (
        ""
      )}
      <div
        className={
          sideNav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setSideNav(!sideNav)}
          size={30}
          className="absolute right-5 top-6 cursor-pointer"
        />
        <h2 className="text-3xl p-4 font-bold">
          Saman<span className="text-orange-700">Kinam</span>
          <nav>
            <ul className="flex flex-col py-8 text-gray-900 text-lg">
              <li className="flex py-4 hover:bg-gray-200 transition-colors duration-300">
                <a
                  href={`${apiData.length > 0 ? apiData[0].url : "#"}`}
                  className="mr-4 text-orange-700 hover:text-orange-800"
                >
                  <BsPerson
                    size={25}
                    className="text-white bg-black rounded-full p-1"
                  />
                </a>
                <a
                  href={`${apiData.length > 0 ? apiData[0].helpLink : "#"}`}
                  className="hover:text-orange-800"
                >
                  My Account
                </a>
              </li>
              <li className="flex py-4 hover:bg-gray-200 transition-colors duration-300">
                <a
                  href={`${apiData.length > 1 ? apiData[1].url : "#"}`}
                  className="mr-4 text-orange-700 hover:text-orange-800"
                >
                  <TbTruckReturn
                    size={25}
                    className="text-white bg-black rounded-full p-1"
                  />
                </a>
                <a
                  href={`${apiData.length > 1 ? apiData[1].helpLink : "#"}`}
                  className="hover:text-orange-800"
                >
                  Delivery
                </a>
              </li>
              <li className="flex py-4 hover:bg-gray-200 transition-colors duration-300">
                <a
                  href={`${apiData.length > 2 ? apiData[2].url : "#"}`}
                  className="mr-4 text-orange-700 hover:text-orange-800"
                >
                  <BsFillCartFill
                    size={25}
                    className="text-white bg-black rounded-full p-1"
                  />
                </a>
                <a
                  href={`${apiData.length > 2 ? apiData[2].helpLink : "#"}`}
                  className="hover:text-orange-800"
                >
                  My Cart
                </a>
              </li>
              <li className="flex py-4 hover:bg-gray-200 transition-colors duration-300">
                <a
                  href={`${apiData.length > 3 ? apiData[3].url : "#"}`}
                  className="mr-4 text-orange-700 hover:text-orange-800"
                >
                  <FaGoogleWallet
                    size={25}
                    className="text-white bg-black rounded-full p-1"
                  />
                </a>
                <a
                  href={`${apiData.length > 3 ? apiData[3].helpLink : "#"}`}
                  className="hover:text-orange-800"
                >
                  My Wallet
                </a>
              </li>
              <li className="flex py-4 hover:bg-gray-200 transition-colors duration-300">
                <a
                  href={`${apiData.length > 4 ? apiData[4].url : "#"}`}
                  className="mr-4 text-orange-700 hover:text-orange-800"
                >
                  <MdHelp
                    size={25}
                    className="text-white bg-black rounded-full p-1"
                  />
                </a>
                <a
                  href={`${apiData.length > 4 ? apiData[4].helpLink : "#"}`}
                  className="hover:text-orange-800"
                >
                  Help
                </a>
              </li>
            </ul>
          </nav>
        </h2>
      </div>
    </div>
  );
};

export default TopNav;

