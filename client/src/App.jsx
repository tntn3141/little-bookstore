import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import dotenv from "dotenv";
dotenv.config();

import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import TagPage from "./pages/TagPage";
import { UserContextProvider } from "./UserContext";
import { ShopContextProvider } from "./ShopContext";
import LoadingIcon from "./components/LoadingIcon";
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage"));
const LazyItemPage = lazy(() => import("./pages/ItemPage"));
const LazyAccountPage = lazy(() => import("./pages/AccountPage"));
const LazyBookEditPage = lazy(() => import("./pages/BookEditPage"));
const LazySearchPage = lazy(() => import("./pages/SearchPage"));
const LazyNewBooksPage = lazy(() => import("./pages/NewBooksPage"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));

axios.defaults.baseURL = process.env.BASE_URL;
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
              <Route path="/new" element={<LazyNewBooksPage />} />
              <Route path="/tags/:tag" element={<TagPage />} />
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
