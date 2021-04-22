import React, { Fragment, useEffect, useState } from 'react'
import { Form, Input, Button, Select, InputNumber, Switch,Radio,
    Slider, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { reverify } from '../actions/userActions';




function ReverificationScreen() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, error} = userSignin;
  const [info, setInfo] = useState({firstName:'', lastName: ''})

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    

    const dispatch = useDispatch();

   const onFinish = () => {
      reverify( userInfo._id, info);
    }

    return (
        <div className="sign_form">
        
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  prefix={<UserOutlined className="site-form-item-icon" />} 
         onChange={e=> setInfo({ ...info, firstName: e.target.value})}
        placeholder="FirstName" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  prefix={<UserOutlined className="site-form-item-icon" />} 
         onChange={e=> setInfo({ ...info, lastName: e.target.value})}
        placeholder="LastName" />
      </Form.Item>
            <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button bold_font">
          Submit</Button> 
      </Form.Item>
      </Form>
        </div>
       
    )
}

export default ReverificationScreen
