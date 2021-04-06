import { useState } from "react";
import moment from "moment";
import {
  Steps,
  Form,
  Input,
  Button,
  Tag,
  message,
  Cascader,
  DatePicker,
  Descriptions,
  Result
} from "antd";
import { getRandomNumber } from "./getCode";
import "antd/dist/antd.css";
import "./App.css";

const { Step } = Steps;
const { TextArea } = Input;

function App() {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(getRandomNumber(4));
  const [codeInput, setCodeInput] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const onFirstFinish = async () => {
    const validate = await form1.validateFields();
    const formResult = form1.getFieldsValue();
    if (code != codeInput) {
      message.error("验证码为空或有误");
      return;
    }
    setStep(1);
    message.success("提交成功");
  };
  const onSecondFinish = async () => {
    const validate = await form2.validateFields();
    const formResult = form2.getFieldsValue();
    formResult.birthday = moment(formResult.birthday).format("YYYY-MM-DD");
    console.log(formResult);
    setUserInfo(formResult);
    setStep(2);
    message.success("提交成功");
  };
  const changeCode = () => {
    let code = getRandomNumber(4);
    setCode(code);
  };

  const classMessage = [
    {
      value: "信工院",
      label: "信工院",
      children: [
        {
          value: "软件工程",
          label: "软件工程",
          children: [
            {
              value: "软工181",
              label: "软工181",
            },
            {
              value: "软工182",
              label: "软工182",
            },
          ],
        },
        {
          value: "计算机科学与技术",
          label: "计算机科学与技术",
          children: [
            {
              value: "计科181",
              label: "计科181",
            },
            {
              value: "计科182",
              label: "计科182",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="App">
      <Steps size="small" current={step}>
        <Step title="填写邮箱" />
        <Step title="填写信息" />
        <Step title="确认信息" />
      </Steps>
      <div className="form-wrapper">
        {step === 0 && (
          <div className="code-wrapper">
            <Form name="form1" form={form1} onFinish={onFirstFinish}>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "请输入正确的邮箱",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="验证码" name="code">
                <Input
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                  }}
                />
                <Tag
                  onClick={changeCode}
                  style={{
                    width: "30%",
                    marginLeft: "3vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ letterSpacing: "3px", fontSize: "1.2rem" }}>
                    {code}
                  </span>
                </Tag>
              </Form.Item>
              <Form.Item name="button">
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  提交 , 下一步
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {step === 1 && (
          <Form name="form2" form={form2} onFinish={onSecondFinish}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入您的用户名",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "请输入您的密码",
                },
                () => ({
                  validator(_, value) {
                    var ls = 0;
                    if (value.match(/([a-z])+/)) {
                      ls++;
                    }
                    if (value.match(/([0-9])+/)) {
                      ls++;
                    }
                    if (value.match(/([A-Z])+/)) {
                      ls++;
                    }

                    if (ls >= 3 || ls === 0) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("密码必须包含大小写字母和数字");
                    }
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请确认您的密码",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次密码输入不一致");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="birthday"
              label="生日"
              rules={[
                { type: "object", required: true, message: "请选择您的生日" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="地址"
              rules={[
                {
                  type: "string",
                  min: 8,
                  max: 32,
                  message: "地址长度不能小于8位或不能大于32位",
                },
                {
                  required: true,
                  message: "请输入您的地址",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="class"
              label="班级"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "请选择您的班级",
                },
              ]}
            >
              <Cascader placeholder="" options={classMessage} />
            </Form.Item>
            <Form.Item style={{ marginTop: "40px" }} name="button">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                提交 , 下一步
              </Button>
            </Form.Item>
          </Form>
        )}
        {step === 2 && (
          <>
            <Descriptions title="用户信息" bordered>
              <Descriptions.Item label="用户名">
                {userInfo.username}
              </Descriptions.Item>
              <Descriptions.Item label="密码">
                {userInfo.password}
              </Descriptions.Item>
              <Descriptions.Item label="生日">
                {userInfo.birthday}
              </Descriptions.Item>
              <Descriptions.Item label="住址">
                {userInfo.address}
              </Descriptions.Item>
              <Descriptions.Item label="班级">
                {userInfo.class.join("-")}
              </Descriptions.Item>
            </Descriptions>
            <div className="button-wrapper">
              <Button onClick={()=>{setStep(1)}} danger style={{ marginRight: "30px" }}>上一步</Button>
              <Button onClick={()=>{setStep(3)}} type="primary">确认</Button>
            </div>
          </>
        )}
        {step === 3 && (
          <Result
          status="success"
          title="注册成功"
        />
        )}
      </div>
    </div>
  );
}

export default App;
