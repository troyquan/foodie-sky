import {useGetOrderDetailsQuery} from "../Apis/orderApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "antd";

interface DataType {
    id: number;
    number: string;
    status: number;
    userId: number;
    addressBookId: number;
    orderTime: string;
    checkoutTime: string;
    payMethod: number;
    payStatus: number;
    amount: number;
    remark: string;
    userName: null;
    phone: string;
    address: string;
    consignee: string;
    cancelReason: null;
    rejectionReason: null;
    cancelTime: null;
    estimatedDeliveryTime: string;
    deliveryStatus: number;
    deliveryTime: null;
    packAmount: number;
    tablewareNumber: number;
    tablewareStatus: number;
    orderDishes: null;
    orderDetailList: OrderDetailType[] | null;
}

interface OrderDetailType {
    id: number;
    name: string;
    orderId: number;
    dishId: number;
    setmealId: null;
    dishFlavor: null;
    number: number;
    amount: number;
    image: string;
}

const OrderDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: orderdata, isLoading} = useGetOrderDetailsQuery({
        id: Number(id),
    });

    const [orderInfo, setOrderInfo] = useState<DataType>();

    const [orderItem, setOrderItem] = useState<OrderDetailType[]>([]);

    const fetchData = () => {
        // console.log("1111111111111", orderdata);
        if (orderdata) {
            setOrderInfo(orderdata.apiResponse.data);
            setOrderItem(orderdata.apiResponse.data.orderDetailList);
        }
    };

    // const fetchData = async ()=>{
    //     const resData = await orderdata
    //     console.log("22222222222222",resData)
    //         setOrderInfo(resData.data)
    //         setOrderItem(resData.data.orderDetailList)
    //
    // }

    useEffect(() => {
        fetchData();
    }, [orderdata]);

    return (
        <div className="flex flex-col justify-center items-center">
            {isLoading && (
                <div className="flex-1 flex justify-center items-center h-[50vh]">
                    loading
                </div>
            )}
            {!isLoading && (
                <Card style={{width: 600}}>
                    <Card style={{width: 300}}>
                        <p>Client Name: {orderInfo?.consignee}</p>
                        <p>Client Address: {orderInfo?.address}</p>
                        <p>Client Phone: {orderInfo?.phone}</p>
                    </Card>

                    <Card style={{width: 500}}>
                        <div>
                            <Row>
                                <Col span={12}>Order Number: {orderInfo?.number}</Col>

                                <Col span={12}>Order Status: {orderInfo?.status}</Col>
                            </Row>
                        </div>
                        <div style={{marginTop: "20px"}}></div>
                        <p>Foodie Sky</p>
                        <div>
                            {orderItem.map((item, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col span={10}>{item.name}</Col>
                                        <Col span={7}>Quantity: {item.number}</Col>
                                        <Col span={7}>Price: ${item.amount}</Col>
                                    </Row>
                                    <div style={{marginTop: "10px"}}></div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Row>
                        <Col span={8}>
                            <div style={{marginTop: "100px"}}></div>
                            <Button block onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={14}>
                            <div className="site-card-border-less-wrapper">
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={20}>Subtotal</Col>
                                        <Col span={4}>
                                            {orderInfo?.amount
                                                ? (orderInfo.amount / 1.15).toFixed(2)
                                                : "N/A"}
                                        </Col>
                                    </Row>
                                    <div style={{marginTop: "16px"}}></div>
                                    <Row>
                                        <Col span={20}>Tax & Others</Col>
                                        <Col span={4}>
                                            {orderInfo?.amount
                                                ? (orderInfo.amount * 0.15).toFixed(2)
                                                : "N/A"}
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <div style={{marginTop: "16px"}}></div>
                                    <Row>
                                        <Col span={20}>Total</Col>
                                        <Col span={4}>{orderInfo?.amount || "N/A"}</Col>
                                    </Row>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}

        </div>
    );
};

export default OrderDetails;
