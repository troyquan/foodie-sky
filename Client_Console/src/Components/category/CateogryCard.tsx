import { useDispatch } from "react-redux";
import { setCategoryItem } from "../../Storage/redux/categorySlice";

interface props {
  src: string;
  des: string;
}
const CateogryCard = ({ src, des }: props) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col space-y-2 justify-center items-center "
      onClick={() => dispatch(setCategoryItem(src.slice(1, -4)))}
    >
      <img
        src={src}
        alt=""
        className="h-16 w-16 rounded-lg hover:shadow-md p-2"
      />
      <div>{des}</div>
    </div>
  );
};

export default CateogryCard;
