import React, { useEffect, useState } from "react";
import "./index.css";

import { Badge, Divider, Layout, Space, Input, Button, Empty } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Checkout, Landing, Login, OrderHistory, Register } from "./Page";
import Logo from "./assets/smallLogo.svg";
import inputHelper from "./Helper/inputHelper";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  LoginOutlined,
  SearchOutlined,
  ShoppingOutlined,
  TwitterSquareFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { cartItemModel, userModel } from "./Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Storage/redux/store";
import { setLoggedInUser } from "./Storage/redux/userAuthSlice";

import { useGetShopStatusQuery } from "./Apis/shopApi";
import { setSearchItem } from "./Storage/redux/searchSlice";
import { setIsCartOpen } from "./Storage/redux/shoppingCartSlice";
import CartItem from "./Components/cart/CartItem";
import { useShowShoppingCartQuery } from "./Apis/shoppingCartApi";
import OrderDetails from './Page/OrderDetails';
import PaymentComplete from './Components/Payment/PaymentComplete';
import Payment from './Components/Payment/Payment';
import AddressNew from './Components/AddressBook/AddressNew'

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [cartData, setCartData] = useState();
  const [total, setTotal] = useState(0);
  const [userInput, setUserInput] = useState({ search: "" });
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data: currentShopStatus } = useGetShopStatusQuery({});
  const { data: CartData } = useShowShoppingCartQuery({});
  const isCartOpen = useSelector(
    (state: RootState) => state.shoppingCartStore.isCartOpen
  );

  useEffect(() => {
    if (CartData) {
      setCartData(CartData.data);

      const totalNumber = CartData.data.reduce(
        (acc: number, item: cartItemModel) => (acc = item.number + acc),
        0
      );

      setTotal(totalNumber);
    }
  }, [CartData, total]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempdata = inputHelper(e, userInput);
    setUserInput(tempdata);
    dispatch(setSearchItem(tempdata.search));
  };

  useEffect(() => {
    if (currentShopStatus) {
      setStatus(Boolean(currentShopStatus.data));
    }
  }, [currentShopStatus]);

  useEffect(() => {
    const localToken = localStorage.getItem("currentUser");
    if (localToken) {
      dispatch(setLoggedInUser(JSON.parse(localToken)));
    }
  }, []);

  const handleLogout = () => {
    dispatch(setLoggedInUser(""));
    localStorage.removeItem("currentUser");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };

  function handleOpenCart() {
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <Layout className="w-full  flex-1 h-screen relative">
      <Header className="bg-yellow-100 h-9 flex items-center justify-center  min-w-[100vw] ">
        <Link to="/" className="text-orange-500 ">
          Enjoy your food at foodiesky,know more policy click here
        </Link>
      </Header>
      <Layout className="overflow-x-scroll bg-white no-scrollbar">
        <Header className=" bg-white flex items-center  space-x-2 px-2 md:px-10 lg:px-10 min-w-[1118px] sticky top-0 z-10">
          <div
            className="relative flex space-x-1 items-center mr-4    min-w-[170px]  "
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" className="h-14" />
            <div className="text-orange-700 font-black text-lg min-w-[100px] ">
              FOODIE SKY
            </div>
            <div className="absolute right-0 top-4  text-orange-600 italic text-bold  ">
              Delivery
            </div>
          </div>

          <Space
            direction="vertical"
            className=" h-10 min-w-[140px] flex items-center justify-center scale-90  "
          >
            {status && (
              <Badge status="success" text="in business" className="" />
            )}
            {!status && <Badge status="error" text="close" />}
          </Space>

          {/* <Search
          type="default"
          placeholder="input search text"
          className="min-w-[200px]"
          onSearch={onSearch}
        /> */}
          <div className="relative flex items-center w-full  ">
            <Input
              placeholder="Search your dish ..."
              name="search"
              value={userInput.search}
              className="min-w-[200px] rounded-full pl-6 bg-slate-100 max-w-7xl mx-4 -translate-x-4"
              onChange={onSearch}
            />
            <SearchOutlined className="absolute left-2" />
          </div>

          <div className=" flex justify-center items-center space-x-3 ml-10">
            <Button
              type="default"
              className="bg-transparent flex items-center"
              shape="round"
              icon={<UnorderedListOutlined className="text-gray-800" />}
              onClick={() => navigate("/orderhistory")}
            />
            {userData.id && (
              <Badge
                count={total}
                className="flex items-center justify-center p-0 h-10 rounded-lg"
              >
                <Button
                  size="large"
                  className="text-white h-26 flex items-center justify-center border-none"
                  icon={
                    <ShoppingOutlined className="text-gray-500 scale-150" />
                  }
                  onClick={handleOpenCart}
                />

                {isCartOpen && (
                  <div className="flex flex-col bg-white h-96 w-52 absolute top-10 border p-2 rounded-md ">
                    {!cartData ? (
                      <div className="h-80 border mb-4 flex flex-col items-center justify-center">
                        <Empty />
                      </div>
                    ) : (
                      <div className="h-80  mb-4 flex flex-col items-center overflow-y-scroll no-scrollbar">
                        {[...cartData].map(
                          (cartItem: cartItemModel, index: number) => (
                            <CartItem {...cartItem} key={index} />
                          )
                        )}
                      </div>
                    )}

                    <button
                      className="px-4 py-2 text-white bg-black rounded-md  "
                      onClick={() => {
                        dispatch(setIsCartOpen(false));
                        navigate("/checkout");
                      }}
                    >
                      GO TO CHECKOUT
                    </button>
                  </div>
                )}
              </Badge>
            )}

            {userData.id ? (
              <Button
                type="default"
                className="bg-orange-500 flex items-center"
                shape="round"
                icon={<LoginOutlined className="text-white" />}
                onClick={handleLogout}
              />
            ) : (
              <Button
                type="default"
                className="bg-orange-500 flex items-center text-white"
                shape="round"
                // icon={<LoginOutlined className="text-white" />}

                onClick={() => navigate("/login")}
              >
                sign in
              </Button>
            )}
            {userData.id ? (
              <img
                src={`https://randomuser.me/api/portraits/men/${userData.id}.jpg`}
                className="h-10 w-10 rounded-full border-[3px] border-white"
              />
            ) : (
              ""
            )}
          </div>
        </Header>
        <Content
          style={{ margin: "10px 0" }}
          className="border-t-2 border-gray-50"
        >
          <div className="p-4">
            <Routes>
              {/* <Route path="/" element={<PrivateRoute component={Landing} />} /> */}
              <Route path="/" element={<Landing />} />
              <Route path="/orderhistory" element={<OrderHistory />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/paymentComplete" element={<PaymentComplete/>}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orderDetails" element={<OrderDetails />} />
              <Route path="/newAddress" element={<AddressNew />} />


            </Routes>
          </div>
          <Footer
            // style={{ textAlign: "center" }}
            className="w-full bg-[rgba(0,0,0,0.9)] text-white flex flex-col justify-center items-center  min-w-[1120px] "
          >
            <div className="w-2/3 text-center">
              <div className="w-full flex space-x-8 justify-between  items-center  mb-4">
                <div className="flex items-center space-x-2">
                  <img src={Logo} alt="" className="h-12 w-12 " />
                  <span className="text-white font-bold text-2xl">
                    Foodie Sky
                  </span>
                </div>
                <div className="flex space-x-4 lg:-translate-x-10">
                  <Link to="/">About us </Link>
                  <Link to="/">Career</Link>
                  <Link to="/">Contact</Link>
                  <Link to="/">News</Link>
                </div>

                <div className="flex space-x-4 mt-10 md:mt-0 lg:mt-0 ">
                  <FacebookFilled />
                  <LinkedinFilled />
                  <TwitterSquareFilled />
                  <InstagramFilled />
                </div>
              </div>
              <Divider className="text-white bg-gray-400" />
              <span>Copyright ©2023 Foodiesky All rights reserved</span>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
