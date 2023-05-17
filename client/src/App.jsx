import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import TagPage from "./pages/TagPage";
import { UserContextProvider } from "./UserContext";
import { ShopContextProvider } from "./ShopContext";
import { Cart } from "./components/Cart";
import LoadingIcon from "./components/LoadingIcon";
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage"));
const LazyItemPage = lazy(() => import("./pages/ItemPage"));
const LazyAccountPage = lazy(() => import("./pages/AccountPage"));
const LazyBookEditPage = lazy(() => import("./pages/BookEditPage"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LazySearchPage = lazy(() => import("./pages/SearchPage"));

axios.defaults.baseURL = "https://little-bookstore-api.fly.dev";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <Suspense fallback={<LoadingIcon />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LazyLoginPage />} />
              <Route path="/register" element={<LazyRegisterPage />} />
              <Route path="/account/:subpage?" element={<LazyAccountPage />} />
              <Route path="/items/:itemId" element={<LazyItemPage />} />
              <Route
                path="/items/:itemId/edit"
                element={<LazyBookEditPage />}
              />
              <Route path="/tags/:tag" element={<TagPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<LazySearchPage />} />
              <Route path="*" element={<LazyNotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ShopContextProvider>
    </UserContextProvider>
  );
}

export default App;
