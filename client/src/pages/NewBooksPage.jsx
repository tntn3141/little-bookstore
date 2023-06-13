import ProductDisplay from "../components/ProductDisplay";
import SearchSidebar from "../components/SearchSidebar";

export default function NewBooksPage() {
  return (
    <>
      <SearchSidebar />
      <ProductDisplay type={"latest"} />
    </>
  );
}
