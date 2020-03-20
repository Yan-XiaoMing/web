import React, {Component} from 'react';
import {Button, Form, Icon, Input, Steps,DatePicker,Cascader,Result} from 'antd';
import {Top, Main} from './style';
import {FormWrapper} from './style';
import './style.css';

const {Step} = Steps;

class Login extends Component {

  state = {
    step: 2,
    confirmDirty: false,
  };



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.state.step<3){
          this.setState({
            step: this.state.step + 1
          });
        }
      }
    });
  };
  goBack = ()=>{
    this.setState({
      step: this.state.step - 1
    });
  }

  checkPhone = (rule, value, callback) => {
    if (value === '') {
      callback('请输入您的手机号')
    } else if (!new RegExp('^1(3|4|5|6|7|8|9)[0-9]\\d{8}$').test(value)) {
      callback('手机号格式有误')
    } else {
      callback()
    }
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };



  render() {
    const title = ['手机验证', '用户认证', '注册完成'];
    const {step} = this.state;
    const {getFieldDecorator} = this.props.form;


    return (
      <div>
        <Top>
          <Steps size="small" current={step}>
            <Step title={title[0]}/>
            <Step title={title[1]}/>
            <Step title={title[2]}/>
          </Steps>
        </Top>

        <Main>
          <FormWrapper>
            <h1>{title[step]}</h1>

            {step === 0 && (
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item
                  hasFeedback
                >
                  {getFieldDecorator('phone', {
                    rules: [{validator:this.checkPhone}]
                  })(
                    <Input
                      prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="请输入手机号"
                    />
                  )}
                </Form.Item>
                < Form.Item>
                  {
                    getFieldDecorator('code' ,{
                    rules: [{required: true, message: '请输入您的验证码!'}]
                  })(
                    <Input

                    prefix={<Icon type="safety-certificate" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="text"
                    placeholder="请输入验证码"
                    style={{width: '60%', marginRight: '3%'}}
                    />
                    )}
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    获取验证码
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button submit" onClick={this.onNext}>
                    下一步
                  </Button>
                </Form.Item>
              </Form>)}

            {step === 1 && (
              <Form onSubmit={this.handleSubmit} className="login-form-registry">
                <Form.Item style={{marginBottom:'15px'}}>
                  {getFieldDecorator('username', {
                    rules: [{required: true, message: '请输入您的用户名!'}]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="请输入您的用户名"
                    />
                  )}
                </Form.Item >
                <Form.Item style={{marginBottom:'15px'}} hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的密码',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password prefix={<Icon type="unlock" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入您的密码"/>)}
                </Form.Item>
                <Form.Item style={{marginBottom:'15px'}} hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: '请确认您的密码',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请确认您的密码" />)}
                </Form.Item>
                <Form.Item style={{marginBottom:'15px'}}>
                  <DatePicker className="birDate" placeholder="请选择您的生日"/>
                </Form.Item>
                <Form.Item style={{marginBottom:'15px'}}>
                  {getFieldDecorator('address', {
                    rules: [ {max: 12, message: '地址最长12位'},
                      {min: 4, message: '地址至少4位'},
                      {required: true, message: '请输入您的地址信息!'}]
                  })(
                    <Input
                      prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="请输入您的地址信息"
                    />
                  )}
                </Form.Item>
                <Form.Item style={{marginBottom:'15px'}}>
                  <Cascader placeholder="请选择您的班级"
                    options={[
                      {
                        value: '2017级',
                        label: '2017级',
                        children: [
                          {
                            value: '软工171',
                            label: '软工171',
                          },
                        ],
                      },
                      {
                        value: '2018级',
                        label: '2018级',
                        children: [
                          {
                            value: '软工181',
                            label: '软工181',
                          },
                        ],
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button submit" onClick={this.onNext}>
                    下一步
                  </Button>
                </Form.Item>
              </Form>)}

            {
              step === 2&&(
                <Result
                  status="success"
                  title="恭喜您,写完了作业!"
                  extra={[
                    <Button  key="back" onClick={this.goBack}>
                      返回上级
                    </Button>,
                    <Button type="primary" key="go-on">作业不够?</Button>,
                  ]}
                />
              )}


          </FormWrapper>


        </Main>
      </div>

    );
  }
}

export default Form.create()(Login);
