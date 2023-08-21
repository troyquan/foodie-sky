import Payment from '../Components/Payment/Payment';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Divider, Table, Space, Button, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from "../Storage/redux/store";
import { useSelector } from "react-redux";
import CartItem from '../Components/cart/CartItem';


interface DataType {
  key: React.Key;
  id: number;
  consignee: string;
  phone: number;
  address: string;
  label: string;
}




const Checkout = () => {


  const columns: ColumnsType<DataType> = [
    {
      title: 'Index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',

    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',

    },
    {
      title: 'Label',
      dataIndex: 'label',
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: DataType) => (
        <Space size="small">
          <button
            onClick={() => handleDelete(record.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </Space>
      )
    }
  ];

  const token = localStorage.getItem('token');

  const navigate = useNavigate();




  const [addressData, setAddressData] = useState<DataType[]>([]);
  const [selectedAddressId, setselectedAddressId] = useState(0);
  const [remark, setRemark] = useState('');
  const [orderNumber, setOrderNumber] = useState(null);


  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newRemark = event.target.value;
    setRemark(newRemark);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/user/addressBook/list', {
        headers: {
          token: token,
        },
      });

      const data = response.data.data.map((row: DataType) => ({
        ...row,
        key: row.id, // Assuming "id" is the unique identifier for each row
      }));

      setAddressData(data);
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // 调用后端 API 执行删除操作
      const response = await axios.delete(`/api/user/addressBook/${id}`, {
        headers: {
          token: token,
        },
      });

      // 根据返回结果更新页面数据，重新获取数据
      if (response.status === 200) {
        fetchData(); // 重新获取数据以更新表格
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  useEffect(() => {
    // Assuming you have at least one row in addressData
    if (addressData.length > 0) {
      setSelectedRowKeys([addressData[0].key]);
      setselectedAddressId(addressData[0].id); // Assuming id is the appropriate field to set
    }
  }, [addressData]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(selectedRowKeys as number[]);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const selectedAddressId = selectedRowKeys.map(key => key as number);
      setselectedAddressId(selectedAddressId[0]);
      console.log(selectedAddressId[0])
    },
    getCheckboxProps: (record: DataType) => ({
      // Remove the "consignee" line from here for now
      disabled: record.consignee === 'Disabled User',
    }),
  };



  const [totalPrice, setTotalPrice] = useState(0);

  async function processPayment() {
    try {
      const response = await axios.get(
        "/api/user/shoppingCart/",
        {
          headers: {
            token: token
          }
        }
      );

      console.log("获取购物车信息 " + response)
      if (response.data) {
        setTotalPrice(response.data.data); // Update the state with the received data

      }
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      const formattedTime = `${oneHourLater.getFullYear()}-${(oneHourLater.getMonth() + 1).toString().padStart(2, '0')}-${oneHourLater.getDate().toString().padStart(2, '0')} ${oneHourLater.getHours().toString().padStart(2, '0')}:${oneHourLater.getMinutes().toString().padStart(2, '0')}:${oneHourLater.getSeconds().toString().padStart(2, '0')}`;

      console.log(selectedAddressId)
      console.log(remark)
      console.log(formattedTime)
      console.log(totalPrice)
      const postData = {
        addressBookId: selectedAddressId,
        remark: remark,
        estimatedDeliveryTime: formattedTime,
        amount: totalPrice,               
        packAmount: 0,
        payMethod: 0,       
        tablewareNumber: 0,
        tablewareStatus: 0,
        deliveryStatus: 0,
      }

      console.log(postData)


      // Use async/await to handle axios.post
      try {
        const response = await axios.post(`/api/user/order/submit`, postData, {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        });
        console.log("OrderNumber" + response.data.data.orderNumber)
        if (response.data.code === 1) {
          setOrderNumber(response.data.data.orderNumber)
        }
        localStorage.setItem("orderNumber", response.data.data.orderNumber);

      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePaymentButtonClick = async () => {
    const response = await processPayment();
    console.log(response)

    navigate('/payment');



  };

  const cartItems = useSelector((state: RootState) => state.shoppingCartStore.cartItems);

  console.log(cartItems)
  useEffect(() => {
    setSelectionType("radio");
    fetchData();


  }, []);

  return (
    <>
      <div className='min-w-[70vh]'>
        <div className="container">
          <div>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none hover:text-red-300 mx-4"
              onClick={() => navigate("/newAddress")}
            >
              +Add Address
            </Button>

            <Divider />


            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={addressData}
            />
          </div>
          <Divider />
          <div>
            <Input.TextArea rows={4} placeholder="Enter your note here..." value={remark}
              onChange={handleTextAreaChange} />
          </div>

          <div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id} // Make sure to use a unique key
                image={item.image}
                name={item.name}
                number={item.number}
                amount={item.amount}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:scale-105 transform transition">
              Order More
            </button>
            <button onClick={handlePaymentButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:scale-105 transform transition">
              Submit Order
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
