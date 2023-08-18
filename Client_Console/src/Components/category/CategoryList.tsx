import CateogryCard from "./CateogryCard";

const CategoryList = () => {
  const data = [
    { src: "/All.png", des: "All" },
    { src: "/fish.png", des: "Fish" },
    { src: "/soup.png", des: "Soup" },
    { src: "/rice.png", des: "Staple" },
    { src: "/vegetable.png", des: "Vegetable" },
    { src: "/drinks.png", des: "Drinks" },
  ];
  let content = data.map(({ src, des }, id) => (
    <CateogryCard src={src} des={des} key={id} />
  ));

  return <div className="flex flex-wrap space-x-6 w-full">{content}</div>;
};

export default CategoryList;
