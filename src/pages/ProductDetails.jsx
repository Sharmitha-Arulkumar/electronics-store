import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ImageSlider from "../components/ImageSlider";
import { FiHeart, FiShoppingCart, FiArrowLeft } from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useShop();

  const item = products.find((p) => p.id === Number(id));
  const saved = wishlist.some((p) => p.id === item?.id);

  if (!item) {
    return (
      <div className="text-center py-20 font-bold text-slate-400">
        Locating matching gear matrix configuration...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-red-500 transition mb-6 cursor-pointer"
      >
        <FiArrowLeft /> <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10">
        <ImageSlider images={item.images} />

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-black uppercase text-red-500 tracking-widest">
              {item.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 mb-4 leading-tight">
              {item.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
              {item.description}
            </p>
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ₹{item.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{item.originalPrice}
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => addToCart(item)}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <FiShoppingCart size={16} /> <span>Add To Cart</span>
            </button>
            <button
              onClick={() => toggleWishlist(item)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-red-500 transition bg-slate-50 dark:bg-slate-800 cursor-pointer"
            >
              <FiHeart
                className={saved ? "fill-red-500 text-red-500" : ""}
                size={18}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
