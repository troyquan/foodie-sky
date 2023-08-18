import { Carousel } from "antd";
import { CategoryList, DishList } from "../Components";

const Landing = () => {
  const contentStyle: React.CSSProperties = {
    height: "200px",
    display: "flex",
    color: "#fff",

    background: "#364d79",
  };

  return (
    <div className="flex-1 flex flex-col items-center min-w-[1100px]  min-h-[70vh] ">
      <div className="w-full md:w-2/3 lg:w-1/2  min-w-[1100px] mb-10  flex flex-col  ">
        <div className="px-2 mb-6">
          <CategoryList />
        </div>

        <Carousel autoplay className="">
          <div className="flex overflow-visible px-2 mb-6">
            <div className="flex  justify-between space-x-4 w-full overflow-visible">
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1685472405.2283988.jpg"
                alt="img"
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg"
                style={contentStyle}
              />
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1686853951.8310657.jpg"
                alt=""
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg"
                style={contentStyle}
              />
            </div>
          </div>

          <div className="flex overflow-visible px-2 mb-6">
            <div className="flex  justify-between space-x-4 w-full overflow-visible">
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1687888348.7213635.jpg"
                alt="img"
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg"
                style={contentStyle}
              />
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1689016317.747369.jpg"
                alt=""
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg"
                style={contentStyle}
              />
            </div>
          </div>
          {/* 
          <div className="flex px-4 ">
            <div className="flex justify-between space-x-4 w-full overflow-hidden">
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1687888348.7213635.jpg"
                alt="img"
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg "
                style={contentStyle}
              />
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1689016317.747369.jpg"
                alt=""
                className="w=[49%] hover:shadow-md shadow-gray-900 rounded-lg "
                style={contentStyle}
              />
            </div>
          </div> */}

          <div className="flex px-2">
            <div className="flex justify-between space-x-4 w-full rounded-full bg-white">
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1689120197.4930706.jpg"
                alt="img"
                className="w-[49%] hover:shadow-md shadow-gray-900 rounded-lg"
                style={contentStyle}
              />
              <img
                src="https://apis3.fantuan.ca/image/platformad_image_1689120112.0336633.jpg"
                alt=""
                className="w-[49%]  hover:shadow-md shadow-gray-900 rounded-lg "
                style={contentStyle}
              />
            </div>
          </div>
        </Carousel>

        <div className="px-2 w-full  ">
          <DishList />
        </div>
      </div>
    </div>
  );
};

export default Landing;
