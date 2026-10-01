import { useShop } from "../context/ShopContext";
import {
  FiHeart,
  FiShoppingBag,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  // Deduplicate and filter out any invalid or empty objects safely
  const validWishlistItems = (wishlist || []).filter(
    (item) => item && (item.id || item._id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh] font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight flex items-center space-x-3">
          <FiHeart className="text-red-500 fill-red-500" size={28} />
          <span>Your Vault Matrix ({validWishlistItems.length})</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
          Saved high-performance dynamic equipment profiles
        </p>
      </div>

      {/* Empty State Vector View */}
      {validWishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 flex flex-col items-center justify-center space-y-4"
        >
          <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
            <FiHeart size={48} className="text-slate-400 stroke-1" />
          </div>
          <h2 className="text-lg font-black uppercase tracking-tight">
            Your Vault Matrix is Empty
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm font-medium">
            You haven't bookmarked any premium audio setups or active wearable
            hardware trackers yet.
          </p>
          <Link
            to="/products"
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl transition inline-block mt-2 font-bold"
          >
            Explore Gear Catalog
          </Link>
        </motion.div>
      ) : (
        /* Wishlist Grid Component View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {validWishlistItems.map((product) => {
            // Guarantee string conversion for unique element identification key values
            const uniqueKey = product.id
              ? String(product.id)
              : Math.random().toString();

            return (
              <motion.div
                layout
                key={uniqueKey}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between relative shadow-xs hover:shadow-md transition group"
              >
                {/* Quick Remove Expulsion Trigger */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-50 dark:bg-slate-800 shadow-xs text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer"
                  title="Remove from wishlist"
                >
                  <FiTrash2 size={16} />
                </button>

                <Link to={`/product/${product.id}`}>
                  <div className="h-44 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-95 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image source if original URL structure returns error
                        e.target.src = "https://unsplash.com";
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md">
                    {product.category || "Gear"}
                  </span>
                  <h3 className="font-bold text-sm tracking-tight line-clamp-2 h-10 mt-2 text-slate-800 dark:text-slate-200 hover:text-red-500 transition">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-4">
                  <div className="flex items-baseline space-x-2 mb-3">
                    <span className="text-lg font-black">
                      ₹{(product.price || 0).toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Instant Inventory Load Vector Trigger */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition cursor-pointer"
                  >
                    <FiShoppingBag size={14} /> <span>Move To Cart</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
