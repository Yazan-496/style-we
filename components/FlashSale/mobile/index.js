import HeaderFlashSale from "./HeaderFlashSale";
import TabsFlashSale from "./TabsFlashSale";
import ProductsListFlashSale from "./ProductsListFlashSale";
const products = [
  {
    id: 1,
    image: "/image/catalog/activity/f44e22953a9775b05a480c383d0aa776.webp",
    discount: "-18%",
    href: "#",
    review: "(12)",
    special_price: "35$",
    origin_price: "39$",
    stars: [1, 2, 3, 4],
    count_down: "5:04:23:54",
    title: "Shirt Collar Loose Long sleeve Ultra lightweight Urban Blouse",
  },
  {
    id: 2,
    image: "/image/catalog/activity/f44e22953a9775b05a480c383d0aa776.webp",
    discount: "-38%",
    href: "#",
    review: "(2)",
    special_price: "45$",
    origin_price: "53$",
    stars: [1, 2, 3, 4, 5],
    count_down: "5:04:23:54",
    title: "Shirt Collar Loose Long sleeve Ultra lightweight Urban Blouse",
  },
];
const FlashSale = ({ flashSale }) => {
  return (
    <div className="layout-container bg-[#ffff]">
      <div className="indexstyle-sc-1m6y0ut-0 iqgd">
        <HeaderFlashSale />
        <TabsFlashSale products={flashSale} />
        <ProductsListFlashSale products={flashSale} />
      </div>
    </div>
  );
};
export default FlashSale;
