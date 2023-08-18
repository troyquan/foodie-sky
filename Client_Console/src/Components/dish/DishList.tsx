import { useEffect, useState } from "react";
import { useGetDishesQuery } from "../../Apis/dishApi";
import { DishCard } from "..";
import { props } from "./DishCard";
import { RootState } from "../../Storage/redux/store";
import { useSelector } from "react-redux";
import { SD_FILTER } from "../../Utilities/SD";
import { Dropdown, MenuProps, Space, message } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import dishModel from "../../Interfaces/dishModel";
const DishList = () => {
  const { data } = useGetDishesQuery({});
  const [dishesData, setDishesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortName, setSortName] = useState(SD_FILTER.NAME_A_Z);

  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );
  const categoryType = useSelector(
    (state: RootState) => state.categoryStore.category
  );

  useEffect(() => {
    if (data) {
      setDishesData(
        data.apiResponse.data.filter((dish: any) => dish.status == 1)
      );
    }
  }, [data]);

  useEffect(() => {
    if (dishesData) {
      //   if (searchValue) {
      //     setDishesData(
      //       dishesData!.filter((dish: any) =>
      //         dish.name.toLowerCase().includes(searchValue.toLowerCase())
      //       )
      //     );
      //   } else {
      //   }

      const tempArray = handleFilter(searchValue, sortName, categoryType);
      setFilteredData(tempArray);
    }
  }, [searchValue, dishesData, sortName, categoryType]);

  const handleFilter = (
    searchValue: string | null,
    sortType: SD_FILTER,
    categoryType: String
  ) => {
    let tempArray = [...dishesData];

    switch (categoryType) {
      case "All":
        tempArray = [...dishesData];
        break;
      case "fish":
        tempArray = [...dishesData].filter(
          (dish: dishModel) => dish.categoryId == 20 || dish.categoryId == 16
        );
        break;

      case "soup":
        tempArray = [...dishesData].filter(
          (dish: dishModel) => dish.categoryId == 21
        );
        break;

      case "rice":
        tempArray = [...dishesData].filter(
          (dish: dishModel) => dish.categoryId == 12
        );
        break;

      case "vegetable":
        tempArray = [...dishesData].filter(
          (dish: dishModel) => dish.categoryId == 19
        );
        break;

      case "drinks":
        tempArray = [...dishesData].filter(
          (dish: dishModel) => dish.categoryId == 11
        );
        break;

      default:
        tempArray = [...dishesData];
        break;
    }

    if (searchValue) {
      tempArray = dishesData.filter((dish: dishModel) =>
        dish.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortType === SD_FILTER.NAME_A_Z) {
      tempArray.sort(
        (a: dishModel, b: dishModel) =>
          Number(a.name.trim().toUpperCase().charCodeAt(0)) -
          Number(b.name.trim().toUpperCase().charCodeAt(0))
      );
    }
    if (sortType === SD_FILTER.NAME_Z_A) {
      tempArray.sort(
        (a: dishModel, b: dishModel) =>
          Number(b.name.trim().toUpperCase().charCodeAt(0)) -
          Number(a.name.trim().toUpperCase().charCodeAt(0))
      );
    }
    if (sortType === SD_FILTER.PRICE_LOW_HIGH) {
      tempArray.sort(
        (a: dishModel, b: dishModel) => Number(a.price) - Number(b.price)
      );
    }
    if (sortType === SD_FILTER.PRICE_HIGH_LOW) {
      tempArray.sort(
        (a: dishModel, b: dishModel) => Number(b.price) - Number(a.price)
      );
    }

    return tempArray;
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key == "1") {
      setSortName(SD_FILTER.PRICE_LOW_HIGH);
      message.info("you set the price low to high");
    }
    if (key == "2") {
      setSortName(SD_FILTER.PRICE_HIGH_LOW);
      message.info("you set the price high to low");
    }
    if (key == "3") {
      setSortName(SD_FILTER.NAME_A_Z);
      message.info("you set the name A to Z");
    }
    if (key == "4") {
      setSortName(SD_FILTER.NAME_Z_A);
      message.info("you set the name Z to A");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: SD_FILTER.PRICE_LOW_HIGH,
      key: "1",
    },
    {
      label: SD_FILTER.PRICE_HIGH_LOW,
      key: "2",
    },
    {
      label: SD_FILTER.NAME_A_Z,
      key: "3",
    },
    {
      label: SD_FILTER.NAME_Z_A,
      key: "4",
    },
  ];
  //   let filteredData =
  //     dishesData &&
  //     [...dishesData].map(({ name, image, price, id }: props, index: number) => (
  //       <DishCard key={index} name={name} image={image} price={price} id={id} />
  //     ));
  return (
    <>
      <div className="mb-6 flex justify-between items-center ">
        <h2 className="font-bold text-2xl text-stone-600 ">All Dishes</h2>
        <div>
          <div className="flex items-center space-x-2">
            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="flex items-center space-x-2">
                    <FilterOutlined className="scale-150" />
                    <span className="font-semibold text-base text-stone-600">
                      Filter
                    </span>
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-8">
        {filteredData.map(
          ({ name, image, price, id }: props, index: number) => (
            <DishCard
              key={index}
              name={name}
              image={image}
              price={price}
              id={id}
            />
          )
        )}
      </div>
    </>
  );
};

export default DishList;
