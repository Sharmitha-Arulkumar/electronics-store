import { useState } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard, { SkeletonCard } from "../components/ProductCard";
import { FiSearch } from "react-icons/fi";

export default function Products() {
  const { products, loading } = useShop();
  const [search, setSearch] = useState("");
  const [priceCap, setPriceCap] = useState(1500);

  const matched = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= priceCap,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl h-fit">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-400 mb-4">
            Refinement Controls
          </h3>
          <div>
            <label className="block text-xs font-bold mb-2 uppercase text-slate-500">
              Max Budget (₹{priceCap})
            </label>
            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={priceCap}
              onChange={(e) => setPriceCap(Number(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search wireless gear, smartwatches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-red-500 font-medium text-sm transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : matched.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {!loading && matched.length === 0 && (
            <p className="text-center text-slate-400 font-bold py-16">
              No audio configurations match your parameters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
