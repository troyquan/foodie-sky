import { Badge, Card, message } from "antd";
import { TiShoppingCart } from "react-icons/ti";
import { TbDiamondFilled } from "react-icons/tb";
import { StarFilled } from "@ant-design/icons";

import { SD_CURRENCY } from "../../Utilities/SD";
import { setShoppingCart } from "../../Storage/redux/shoppingCartSlice";
import { useDispatch } from "react-redux";

import {
  useAddShoppingCartMutation,
  useShowShoppingCartQuery,
} from "../../Apis/shoppingCartApi";
import { useEffect, useState } from "react";
import { useGetShopStatusQuery } from "../../Apis/shopApi";
export interface props {
  name: string;
  image: string;
  price: number;
  id: number;
}
const DishCard = ({ name, image, price, id }: props) => {
  const dispatch = useDispatch();

  const [cartItemsData, setCartItemsData] = useState([]);
  const [addDishToCart] = useAddShoppingCartMutation();
  const [status, setStatus] = useState(false);
  const { data: CartData } = useShowShoppingCartQuery({});

  const { data: currentShopStatus } = useGetShopStatusQuery({});
  let token = localStorage.getItem("token");
  let isEligible = token && status;

  useEffect(() => {
    if (currentShopStatus) {
      setStatus(currentShopStatus.data);
      console.log("status:", status);
      console.log("token", token);
      console.log("eli:", isEligible);
    }
  }, [currentShopStatus]);

  useEffect(() => {
    if (CartData) {
      setCartItemsData(CartData.data);
    }
  }, [CartData]);

  let colored = (id + 1) % 2 == 0;
  let discount = (id + 2) % 5 == 0;
  let discount2 = (id + 1) % 2 == 0;
  let tag1 = id % 2 == 0;
  let tag2 = id % 5 == 0;

  //      id?: number;
  //   dishItemId?: number;
  //   dishItem?: dishModel;
  //   quantity?: number;

  const addToCart = async () => {
    if (!isEligible) {
      if (!status) {
        message.error("our restaurant is not in bussiness");
      }
      if (!token) {
        message.error("Only signed in user allowed ");
      }

      return;
    }
    await addDishToCart({ dishId: id });
    message.success("you have successfully added one to cart");
    dispatch(setShoppingCart(cartItemsData));
  };
  return (
    <div>
      {colored ? (
        <Badge.Ribbon
          text={<div className="text-sm text-white">Exclusive</div>}
          color={"#eab308"}
        >
          <Card
            cover={
              <div className="h-36">
                <img
                  alt="example"
                  src={image}
                  className="h-28 w-full object-cover rounded-lg "
                />
                {discount ? (
                  <div className="absolute left-0 top-4 bg-rose-500 text-white rounded-r-md px-1 py-1 text-[12px]">
                    {discount2 ? "Get 5% Off" : "10% Off for Pickup Orders"}
                  </div>
                ) : (
                  ""
                )}
                <div className="pt-3 px-2">
                  <div className="font-bold items-center flex space-x-2">
                    <TbDiamondFilled className="text-yellow-600 opacity-75 scale-125" />
                    <span>{name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2 items-center">
                      <StarFilled className="text-teal-400" />
                      <span className="scale-y-90 text-[10px] font-semibold">
                        <span className="font-semibold">
                          {SD_CURRENCY.CAD}{" "}
                        </span>
                        {price.toFixed(2)} / portion
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <button className="text-yellow-400 bg-[rgba(0,0,0,0.8)] px-2 text-[12px]">
                        Member Merchant
                      </button>
                      {tag1 && (
                        <div className="bg-rose-100  text-red-400 px-2 text-[12px]">
                          Get 10% Off
                        </div>
                      )}
                      {tag2 && (
                        <div className="bg-rose-100  text-red-400 px-2 text-[12px]">
                          Up to 50%
                        </div>
                      )}
                    </div>
                    <TiShoppingCart className="scale-125" onClick={addToCart} />
                  </div>
                </div>
              </div>
            }
          />
        </Badge.Ribbon>
      ) : (
        <Card
          //   style={{ width: 300 }}
          cover={
            <div className="h-36">
              <img
                alt="example"
                src={image}
                className="h-28 w-full object-cover rounded-lg "
              />
              {discount ? (
                <div className="absolute left-0 top-4 bg-rose-500 text-white rounded-r-md px-1 py-1 text-[12px]">
                  {discount2 ? "Get 5% Off" : "10% Off for Pickup Orders"}
                </div>
              ) : (
                ""
              )}
              <div className="pt-3 px-2">
                <div className="font-bold items-center flex space-x-2">
                  <TbDiamondFilled className="text-yellow-600 opacity-75 scale-125" />
                  <span>{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center">
                    <StarFilled className="text-teal-400" />
                    <span className="scale-y-90 text-[10px] font-semibold">
                      <span className="font-semibold">{SD_CURRENCY.CAD} </span>
                      {price.toFixed(2)} / portion
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-2 ">
                    <button className="text-yellow-400 bg-[rgba(0,0,0,0.8)] px-2 text-[12px]">
                      Member Merchant
                    </button>
                    {tag1 && (
                      <div className="bg-rose-100  text-red-400 px-2 text-[12px]">
                        Get 10% Off
                      </div>
                    )}
                    {tag2 && (
                      <div className="bg-rose-100  text-red-400 px-2 text-[12px]">
                        Up to 50%
                      </div>
                    )}
                  </div>
                  <TiShoppingCart className="scale-125" onClick={addToCart} />
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
    // <div className="">
    //   <div>
    //     <img
    //       src={image}
    //       alt=""
    //       className="h-28 w-full object-cover rounded-lg hover:shadow-lg"
    //     />
    //   </div>

    //   <div>
    //     <div>{name}</div>
    //     <div>{price}</div>
    //   </div>
    // </div>
  );
};

export default DishCard;
