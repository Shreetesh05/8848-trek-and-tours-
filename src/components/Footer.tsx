import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-white to-gray-50 text-black py-16 px-6 mt-12 border-t border-gray-300 shadow-inner">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-extrabold mb-4 flex items-center">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-lg mr-3 shadow">
                8848
              </span>
              Trekking & Tours
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-md">
              Your gateway to the majestic Himalayas, offering unparalleled
              adventure experiences in Nepal. We specialize in creating memorable
              journeys through the world’s highest peaks.
            </p>

            <div className="flex items-center mt-6 p-3 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition">
              <div className="bg-amber-500 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Certified Sustainable Tourism</p>
                <p className="text-sm text-gray-600">
                  Eco-friendly adventures since 2010
                </p>
              </div>
            </div>

            {/* Logos */}
            <div className="flex items-center space-x-6 mt-6">
              <img
                src="/images/logo.png"
                alt="8848 Trekking & Tours Logo"
                className="h-14 w-14 object-contain hover:scale-105 transition-transform"
              />
              <img
                src="/images/ntb.png"
                alt="NTB Logo"
                className="h-14 w-14 object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xl mb-4 pb-2 border-b border-gray-300">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Trekking Packages",
                "Gallery",
                "Testimonials",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-amber-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="bg-amber-500 h-1.5 w-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-xl mb-4 pb-2 border-b border-gray-300">
              Contact Info
            </h4>
            <address className="not-italic space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="p-2 rounded-lg mr-3 bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p>Thamel, Kathmandu</p>
                  <p>Nepal</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-3 bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p>+977 1 4123456</p>
              </div>

              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-3 bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p>info@8848trekking.com</p>
              </div>
            </address>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6">
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="p-2 rounded-full bg-gray-200 hover:bg-amber-500 hover:text-white transition"
                  aria-label={social}
                >
                  <i className={`fab fa-${social.toLowerCase()} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} 8848 Trekking & Tours. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-amber-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-500 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-amber-500 transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
