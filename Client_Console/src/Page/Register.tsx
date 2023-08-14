import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/smallLogo.svg";
import { useState } from "react";
import { useRegisterUserMutation } from "../Apis/authApi";
import { apiResponse } from "../Interfaces";
const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const onFinish = async (values: any) => {
    setError("");
    if (values.password !== values.confirmedpassword) {
      setError("password is not matched");
      return;
    }

    const response: apiResponse = await registerUser(values);
    console.log(response);
    if (response) {
      if (response.data) {
        if (response.data.msg) {
          setError(response.data.msg);
        } else {
          navigate("/login");
          message.success(
            "Congrats! you have successfull registered an account"
          );
        }
      }
    }
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg ">
        <div className="w-full justify-center  flex mb-4">
          <img src={logo} alt="" className="h-14 w-14" />
        </div>

        <Form
          name="normal_login"
          className="login-form w-[300px]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmedpassword"
            rules={[
              { required: true, message: "Please input your Password again!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirmed password"
            />
          </Form.Item>

          {error && <div className="text-red-500">{error}</div>}

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button w-full bg-blue-500 text-white hover:text-white hover:bg-blue-100 mt-4"
            >
              Sign up
            </Button>
          </Form.Item>

          <Link to="/login">
            <div className="text-center text-[10px] w-full ">
              already have an account click here to log in
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
