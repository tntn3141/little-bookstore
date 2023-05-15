import { createContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (data) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === data._id) == null) {
        data.quantity = 1;
        return [...currentItems, data];
      } else {
        return currentItems.map((item) => {
          if (item._id === data._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (data) => {
    setCartItems((currentItems) => {
      // If there's one copy of the item, remove it from cartItems
      if (currentItems.find((item) => item._id === data._id) === 1) {
        return currentItems.filter((item) => item._id !== data._id);
      } else {
        return currentItems.map((item) => {
          if (item._id === data._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItem = (data) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item._id !== data._id);
    });
  };

  const cartTotal = cartItems.reduce(
    (total, item) => item.quantity * item.price + total,
    0
  );

  const contextValue = {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    cartItems,
    cartQuantity,
    cartTotal,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
