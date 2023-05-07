import axios from "axios";
import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import BookEditPage from "./pages/BookEditPage";
import AccountPage from "./pages/AccountPage";
import LoginPage1 from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import TagPage from "./pages/TagPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import NotFound404Page from "./pages/NotFound404Page";
import { UserContextProvider } from "./UserContext";
import { ShopContextProvider } from "./ShopContext";
import { Cart } from "./components/Cart";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage1 />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/items/:itemId" element={<ItemPage />} />
            <Route path="/items/:itemId/edit" element={<BookEditPage />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound404Page />} />
          </Route>
        </Routes>
      </ShopContextProvider>
    </UserContextProvider>
  );
}

export default App;
