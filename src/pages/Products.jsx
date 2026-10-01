import { useState } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard, { SkeletonCard } from "../components/ProductCard";
import { FiSearch, FiLayers, FiGrid } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Products() {
  const { products, loading } = useShop();
  const [search, setSearch] = useState("");
  // Track the active filter selection tab ('all' by default)
  const [activeCategory, setActiveCategory] = useState("all");

  // Modernized semantic category maps mapped to target consumer tech matrices
  const categoriesList = [
    { id: "all", label: "All Gear", icon: <FiGrid /> },
    { id: "earbuds", label: "Wireless Earbuds", keyword: "earbuds" },
    { id: "smartwatch", label: "Smartwatches", keyword: "smartwatch" },
    { id: "soundbar", label: "Audio Soundbars", keyword: "soundbar" },
    { id: "headphones", label: "ANC Headphones", keyword: "headphones" },
  ];

  // Algorithmic layout filter sorting matrix
  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    if (activeCategory === "all") return matchesSearch;

    // Resolve target category context using mapped semantic keywords
    const currentTarget = categoriesList.find((c) => c.id === activeCategory);
    const matchesCategory = product.title
      .toLowerCase()
      .includes(currentTarget?.keyword || "");

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen font-sans">
      {/* Category Filtering Navigation Hub */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest text-red-500 mb-3">
          <FiLayers /> <span>Select Ecosystem Array</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-6">
          Engineered Audio Configurations
        </h1>

        {/* Horizontal Category Switcher Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto px-2">
          {categoriesList.map((category) => {
            const isSelected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                  isSelected
                    ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20 scale-105"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-500 dark:hover:border-red-500 hover:text-red-500"
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Live Search Bar Wrapper Container */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <FiSearch className="absolute left-4 top-4 text-slate-400" size={18} />
        <input
          type="text"
          placeholder={`Search within ${categoriesList.find((c) => c.id === activeCategory)?.label}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-red-500 text-sm font-medium transition-all shadow-xs text-slate-800 dark:text-slate-100"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 hover:text-red-500 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Balanced Category Product Result Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>

      {/* Fallback Blank Vector State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto shadow-xs mt-6">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-wider">
            No devices detected matching this category segment matrix
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="mt-4 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition cursor-pointer"
          >
            Reset Active Filters
          </button>
        </div>
      )}
    </div>
  );
}
