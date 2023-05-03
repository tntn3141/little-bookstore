import axios from "axios";
import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import { UserContextProvider } from "./UserContext";
import LoginPage1 from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import TagPage from "./pages/TagPage";
import SearchResultPage from "./pages/SearchResultPage";
import NotFound404Page from "./pages/NotFound404Page";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage1 />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/item/:itemId" element={<ItemPage />} />
          <Route path="/tags/:tag" element={<TagPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
