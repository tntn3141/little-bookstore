import ProductDisplay from "../components/ProductDisplay";
import Hero from "../components/Hero";
import SearchSidebar from "../components/SearchSidebar";

export default function IndexPage() {
  return (
    <>
      <Hero />
      <ProductDisplay type={"normal"} />
    </>
  );
}
