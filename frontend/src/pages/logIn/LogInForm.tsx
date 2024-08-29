import styles from "./LogInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { logIn } from "../../redux/auth/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const LogInForm = () => {

  const loading = useSelector(s => s.user.loading)
  const jwt = useSelector(s => s.user.token)
  const error = useSelector(s => s.user.error)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{ 
    if(jwt !== null) {
      navigate("/");
    }
  }, [jwt])

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(logIn({
      email: values.username,
      password: values.password
    }))
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
        label={<span style={{ color: 'white', fontSize: '16px' }}>Username</span>}
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'white', fontSize: '16px' }}>Password</span>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        {...tailLayout} name="remember" valuePropName="checked">
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