import { useShop } from "../context/ShopContext";
import ProductCard, { SkeletonCard } from "../components/ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, loading } = useShop();

  return (
    <div className="pb-16">
      <header className="bg-gradient-to-br from-slate-900 via-slate-950 to-red-950 text-white py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="bg-red-600 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            New Era Launch
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mt-4 mb-6 leading-tight">
            SOUND THAT INTENSIFIES.
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Immerse your senses in custom-tuned architectural audio delivery
            systems engineered with cinematic dynamic active noise
            cancellations.
          </p>
          <Link
            to="/products"
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest inline-block transition"
          >
            Enter Ecosystem
          </Link>
        </motion.div>
      </header>

      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-black tracking-tight mb-8 uppercase border-l-4 border-red-500 pl-3">
          Hot Launches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
