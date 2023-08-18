import { cartItemModel } from "../../Interfaces";
import { Typography } from "antd";
// Import your CSS file

const { Text } = Typography;

const CartItem = ({ image, name, number, amount }: cartItemModel) => {
  return (
    <div className="flex space-x-2 border w-full rounded-lg px-2 py-2 my-2">
      <img src={image} alt="" className="h-10 w-10 rounded-md" />
      <div className="flex flex-col space-y-2">
        <Text className="ellipsis-text text-[10px] font-bold">{name}</Text>

        <div>
          <span>
            {number} * ${amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
// amount: number;
//   createTime: string;
//   dishFlavor: null;
//   dishId: number;
//   id: number;
//   image: string;
//   name: string;
//   number: number;
//   dishItemId?: number;
//   setmealId: null;
//   userId: number;
