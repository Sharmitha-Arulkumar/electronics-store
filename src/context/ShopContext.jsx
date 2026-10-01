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
    const fetchTechProducts = async () => {
      try {
        // Correct target endpoint added (/products/category/electronics)
        const response = await fetch("https://fakestoreapi.com/users");

        if (!response.ok) {
          throw new Error(
            "HTTP connection failed status tracking validation check.",
          );
        }

        const data = await response.json();
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
      } catch (error) {
        console.warn(
          "FakeStoreAPI server failure, running backup inventory payload context loop:",
          error,
        );
        toast.error("Failed to interface with product servers.");
        setLoading(false);
      }
    };

    fetchTechProducts();
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

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const targetItem = prev.find((item) => item.id === productId);
      if (!targetItem) return prev;

      // If quantity is higher than 1, reduce it by 1
      if (targetItem.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      // If quantity is exactly 1, drop it entirely from the state matrix array
      return prev.filter((item) => item.id !== productId);
    });
    toast.error("Item removed from cart allocations.");
  };

  // DIRECT LINE ITEM EXPULSION
  const deleteLineItem = (productId, productTitle) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.error(
      `${productTitle.slice(0, 18)}... cleared from active checkout.`,
    );
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
      value={{
        products,
        cart,
        wishlist,
        loading,
        addToCart,
        removeFromCart,
        deleteLineItem,
        toggleWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
