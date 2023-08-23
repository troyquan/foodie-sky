import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../Apis/orderApi";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: oneOrderData } = useGetOrderByIdQuery({ id });
  const [dishNames, setDishNames] = useState("");
  const [orderData, setOrderData] = useState({
    id: "",
    number: "",
    status: "",
    userId: "",
    addressBookId: "",
    orderTime: "",
    checkoutTime: "",
    payMethod: 0,
    payStatus: 0,
    amount: "",
    remark: "",
    userName: "",
    phone: "",
    address: "",
    consignee: "",
    cancelReason: "",
    rejectionReason: "",
  });
  useEffect(() => {
    if (oneOrderData) {
      setOrderData(oneOrderData.data);
      console.log("one:", oneOrderData.data);
      const dishList = oneOrderData.data.orderDetailList.reduce(
        (acc: string, order: any) => (acc = acc + "," + order.name),
        ""
      );
      setDishNames(dishList.slice(1));
    }
  }, [oneOrderData]);
  console.log(orderData);
  return (
    <div className="min-w-[1100px]">
      <div className="flex items-center mb-10">
        <div
          className="flex space-x-2 items-center border-r pr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined /> <span>Back</span>
        </div>
        <span className="px-4 font-extrabold">Order Details</span>
      </div>
      <div className="flex space-x-8 px-20">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 min-w-[400px]">
            <span className="">Order Id:</span>{" "}
            <Input value={orderData.number} disabled />
          </div>

          <div className="flex flex-col space-y-2">
            <span className="">Order Dish:</span>{" "}
            <TextArea
              placeholder="give this dish description.."
              name="description"
              //   value={userInput.description}
              value={dishNames}
              rows={4}
              className="w-[500px]"
              disabled
              //   onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <span className="">Address:</span>{" "}
            <Input value={orderData.address} disabled />
          </div>

          <div className="flex flex-col space-y-2">
            <span className="">Delivered Time:</span>{" "}
            <Input value={"2023-8-20"} disabled />
          </div>

          <div className="flex flex-col space-y-2">
            <span className="">Note:</span>
            <TextArea
              // placeholder="give this dish description.."
              name="description"
              //   value={userInput.description}
              value={orderData.remark}
              rows={4}
              className="w-[500px]"
              disabled
              //   onChange={handleUserInput}
            />
          </div>

          <div>
            <div className="flex space-x-2 items-center justify-between">
              <div>Order Status:</div>
              {orderData.status == "6" ? (
                <div className="bg-red-500 text-white px-1 rounded-sm">
                  Canceled
                </div>
              ) : orderData.status == "5" ? (
                <div className="bg-green-500 text-white px-1 rounded-sm">
                  Completed
                </div>
              ) : orderData.status == "4" ? (
                <div className="bg-green-500 text-white px-1 rounded-sm">
                  Being Delivered
                </div>
              ) : orderData.status == "3" ? (
                <div className="bg-yellow-500 text-white px-1 rounded-sm">
                  Waiting for Delivery
                </div>
              ) : orderData.status == "2" ? (
                <div className="bg-cyan-500 text-white px-1 rounded-sm">
                  To be Confirmed
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {orderData.cancelReason && (
              <div className="flex flex-col space-y-2">
                <span className="">Cancellation Reason:</span>
                <TextArea
                  placeholder=".."
                  name="description"
                  //   value={userInput.description}
                  value={orderData.cancelReason}
                  rows={4}
                  className="w-[500px]"
                  disabled
                  //   onChange={handleUserInput}
                />{" "}
              </div>
            )}

            {orderData.rejectionReason && (
              <div className="flex flex-col space-y-2">
                <span className="">Rejection Reason:</span>
                <TextArea
                  placeholder=".."
                  name="description"
                  //   value={userInput.description}
                  value={orderData.rejectionReason}
                  rows={4}
                  className="w-[500px]"
                  disabled
                  //   onChange={handleUserInput}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 bg-black h-[470px]  mt-8">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                // src="https://maps.google.com/maps?width=600&height=400&hl=en&q={4809 rue Bannantyne}&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${orderData.address}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                id="gmap_canvas"
                className="w-full h-[470px]"
                frameBorder="0"
                scrolling="no"
              ></iframe>
              <a href="https://www.eireportingonline.com">
                ei reporting online
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
