import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const author = "Purna Shrestha";

  return (
    <footer className="bg-orange-700 text-white">
      <div className="container mx-auto py-8 px-4 md:px-0 flex flex-col items-center">
        <div className="w-full md:w-3/4 mb-">
          <div className="flex flex-wrap justify-center md:justify-between ">
            <div className="w-full md:w-1/4 mb-4 md:mb-0 text-center p-4">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                accumsan, arcu sit amet consectetur condimentum.
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0 text-center p-4 hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="text-sm">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0 p-4 text-center">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">123 Sitapaila, Kathmandu, Nepal</p>
              <p className="text-sm">info@samankinam.com</p>
              <p className="text-sm">+123 456 7890</p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0 p-4 hidden md:block">
              <h3 className="text-lg font-semibold mb-4 text-center">Location</h3>
              <div className="h-48 mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3505719181865!2d85.324098414575!3d27.71724503243376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18f960ee30dd%3A0x1141a0067c96a76b!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1625519560119!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="border-t border-white pt-4">
            <p className="text-sm text-center">
              &copy; {currentYear}{" "}
              <a
                href="https://www.purnashrestha.com.np/"
                target="_blank"
                className="text-white"
              >
                {author}
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
