import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch electronics subset from public repository
    fetch("https://fakestoreapi.com")
      .then((res) => res.json())
      .then((data) => {
        // Remap generalized electronics payload to fit standard consumer brand specs
        const techProducts = data.map((item, index) => {
          const brands = ["VOLT", "AERO", "NEO", "CRUX"];
          const names = [
            "BassPods Pro Wireless Earbuds",
            "PulseFit Active Smartwatch",
            "HyperBoom Wireless Soundbar",
            "SonicStream ANC Headphones",
          ];
          return {
            ...item,
            title: `${brands[index % brands.length]} ${names[index % names.length]}`,
            price: Math.round(item.price * 12),
            originalPrice: Math.round(item.price * 22),
            images: [item.image, item.image, item.image], // Mocked gallery arrays for product slider carousels
          };
        });
        setProducts(techProducts);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to interface with product servers.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const match = prev.find((item) => item.id === product.id);
      if (match) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title.slice(0, 18)}... loaded into cart!`);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const active = prev.find((item) => item.id === product.id);
      if (active) {
        toast.error("Removed from wishlist catalog.");
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success("Saved to your wishlist profile!");
      return [...prev, product];
    });
  };

  return (
    <ShopContext.Provider
      value={{ products, cart, wishlist, loading, addToCart, toggleWishlist }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
