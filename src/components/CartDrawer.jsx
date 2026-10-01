import { motion } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, addToCart, removeFromCart, deleteLineItem } = useShop();

  const dynamicTotalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop Layer */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col text-slate-900 dark:text-slate-50"
        >
          {/* Header Module */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight uppercase flex items-center space-x-2">
              <FiShoppingBag className="text-red-500" />{" "}
              <span>
                Your Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Line Items Container Matrix */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <FiShoppingBag size={48} className="stroke-1 animate-pulse" />
                <p className="font-bold text-sm tracking-tight uppercase">
                  Your layout bag is completely empty
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 mix-blend-multiply dark:mix-blend-normal"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-black text-red-500 mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    {/* Quantity Adjustment Engine */}
                    <div className="flex items-center space-x-2 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg w-fit p-0.5">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-500 hover:text-red-500 transition cursor-pointer"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="text-xs font-black px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 text-slate-500 hover:text-red-500 transition cursor-pointer"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteLineItem(item.id, item.title)}
                    className="p-2 text-slate-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Billing Footer Block */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Check Valuation
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ₹{dynamicTotalCost.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={() =>
                  toast.success("Checkout system sequence integrated!")
                }
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest py-4 rounded-xl transition shadow-md shadow-red-600/10 cursor-pointer"
              >
                Proceed To Checkout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
