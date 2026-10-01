import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useShop } from "../context/ShopContext";
import {
  FiSun,
  FiMoon,
  FiShoppingCart,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { cart, wishlist } = useShop();

  const linkClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-wider transition ${isActive ? "text-red-500" : "text-slate-600 dark:text-slate-300 hover:text-red-500"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-red-600 dark:text-red-500"
        >
          VOLT.
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <Link
            to="/products"
            className="relative p-2 text-slate-700 dark:text-slate-300"
          >
            <FiHeart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-bounce">
                {wishlist.length}
              </span>
            )}
          </Link>
          <div className="relative p-2 text-slate-700 dark:text-slate-300">
            <FiShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {cart.length}
              </span>
            )}
          </div>
          <Link
            to="/login"
            className="hidden md:block bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90"
          >
            Login
          </Link>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col space-y-4 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="font-bold text-slate-700 dark:text-slate-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenu(false)}
              className="font-bold text-slate-700 dark:text-slate-300"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="font-bold text-slate-700 dark:text-slate-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="font-bold text-slate-700 dark:text-slate-300"
            >
              Contact
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="w-full text-center bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-3 rounded-xl font-bold uppercase tracking-wider"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
