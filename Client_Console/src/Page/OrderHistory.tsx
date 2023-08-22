import {
  useCancelOrderMutation,
  useGetOrderHistoryQuery,
} from "../Apis/orderApi.ts";
import { useEffect, useState } from "react";
import { Popconfirm, Space, Table } from "antd";
import { Link } from "react-router-dom";

const { Column } = Table;

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

  userName: string | null;

  phone: string;

  address: string;

  consignee: string;

  cancelReason: string | null;

  rejectionReason: string | null;

  cancelTime: string | null;

  estimatedDeliveryTime: string;

  deliveryStatus: number;

  deliveryTime: string;

  packAmount: number;

  tablewareNumber: number;

  tablewareStatus: number;

  orderDishes: string | null;
}

const OrderHistory = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20, // Default page size
  });
  const [cancelOrder] = useCancelOrderMutation();
  const { data: orderdata, isLoading } = useGetOrderHistoryQuery({
    page: pagination.current,
    pageSize: pagination.pageSize,
  });

  const [orderHistoryData, setOrderHistoryData] = useState([]);

  useEffect(() => {
    if (orderdata) {
      console.log("total: =======>", orderdata.apiResponse.data.total);
      console.log("record: ------->", orderdata.apiResponse.data.records);
      settotalVal(Number(orderdata.apiResponse.data.total));
      setOrderHistoryData(orderdata.apiResponse.data.records);
    }
  }, [orderdata, pagination]);

  const handleCancel = async (id: number) => {
    try {
      await cancelOrder({ id });
    } catch (err) {
      console.log("err: ", err);
      return;
    }
  };

  const [totalVal, settotalVal] = useState(0);
  const statusTextMap: { [key: number]: string } = {
    1: "Pending Payment",
    2: "To Be Confirmed",
    3: "Confirmed",
    4: "Delivery",
    5: "Completed",
    6: "Cancelled",
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  return (
      <div className="min-h-[66vh]">
        {isLoading && (
            <div className="flex-1 flex justify-center items-center h-[50vh]">
              loading
            </div>
        )}
        {!isLoading && (
            <Table
                dataSource={orderHistoryData}
                rowKey={(record: DataType) => record.orderTime}
                onChange={handleTableChange}
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "30"],
                  position: ["bottomCenter"],
                  // onChange={pageSize=>(setPageSize(size))},
                  total: totalVal,
                }}
            >
              <Column title="Order Number" dataIndex="number" key="number" />
              <Column title="Status" dataIndex="status" key="status" />
              <Column title="OrderTime" dataIndex="orderTime" key="orderTime" />
              <Column
                  title="Status"
                  dataIndex="status"
                  key="status"
                  render={(status: number) => <span>{statusTextMap[status]}</span>}
              />
              <Column title="Price" dataIndex="amount" key="amount" />
              <Column
                  title="Action"
                  key="action"
                  render={(_: any, record: any) => (
                      <Space size="middle">
                        <Link
                            to={{
                              pathname: `/orderDetails/${record.id}`,
                            }}
                        >
                          Details{" "}
                        </Link>

                        <Popconfirm
                            title={"Are you sure cancel this order?"}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleCancel(record.id)}
                        >
                          <a>{record.status === 2 ? "Cancel" : ""}</a>
                        </Popconfirm>
                      </Space>
                  )}
              />
            </Table>
        )}
      </div>
  );
};

export default OrderHistory;
