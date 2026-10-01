import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { toggleWishlist, addToCart, wishlist } = useShop();
  const isFav = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-50 dark:bg-slate-800 shadow-xs text-slate-400 hover:text-red-500 transition cursor-pointer"
      >
        <FiHeart
          className={isFav ? "fill-red-500 text-red-500" : ""}
          size={18}
        />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="h-44 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-95"
          />
        </div>
        <h3 className="font-bold text-sm tracking-tight line-clamp-2 h-10 text-slate-800 dark:text-slate-200">
          {product.title}
        </h3>
      </Link>

      <div className="mt-4">
        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-lg font-black">₹{product.price}</span>
          <span className="text-xs text-slate-400 line-through">
            ₹{product.originalPrice}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <FiShoppingCart size={14} /> <span>Add To Cart</span>
        </button>
      </div>
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 space-y-4 animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-800 h-44 rounded-xl" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl mt-4" />
    </div>
  );
}
