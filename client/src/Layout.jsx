import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart } from "./components/Cart";
import { ShopContext } from "./ShopContext";
import { useContext, useState } from "react";

export default function Layout() {
  const { toggleCart } = useContext(ShopContext)
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header />
      <Cart open={open} />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
