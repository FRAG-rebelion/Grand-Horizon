import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-prime text-BC py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="text-gray-300">
              Grand Horizon is a luxury hotel dedicated to providing exceptional
              experiences and world-class hospitality.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-second transition duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-second transition duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-second transition duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-second transition duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-second transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-second transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-second transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-second transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Los Angeles</li>
              <li className="text-gray-300">+1 (646) 736-1779</li>
              <li className="text-gray-300">info@grandhorizon.com</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
          </div>
        </div>
            <form className="flex w-full justify-end">
              <input
                type="email"
                placeholder="info@grandhorizon.com"
                className="w-60 px-4 py-2 border border-BC rounded-l-lg focus:outline-none text-second"
              />
              <button
                type="submit"
                className="bg-second text-BC px-4 py-2 rounded-r-lg hover:bg-H transition duration-300"
              >
                Subscribe
              </button>
            </form>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Grand Horizon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;