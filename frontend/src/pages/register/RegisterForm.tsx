import { Form, Input, Button, Checkbox } from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await axios.post("http://127.0.0.1:3000/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      navigate("/logIn/");
    } catch (error) {
      alert("注册失败！");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["auth-form"]}
    >
      <Form.Item
        label={<span style={{ color: "white", fontSize: "16px" }}>Username</span>}
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "white", fontSize: "16px" }}>Password</span>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "white", fontSize: "16px" }}>Confirm Password</span>}
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("密码确认不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Checkbox>
          <span style={{ color: "white", fontSize: "16px" }}>Remember me</span>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button className={styles["auth-btn"]} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};