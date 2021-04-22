import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

function SigninScreen(props) {
    const classes = useStyles();
    //for receiving
    //dispatch and select
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo, error} = userSignin;

    //for sending out
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
    

    const onFinish = ()=>{
        dispatch(signin(email, password))
    }

    useEffect(()=>{
    if(userInfo){
        userInfo && props.history.push('/');
    }
    

    },[props.history, userInfo])

    return (
        <div className="sign_container">
            <div className="welcome">
                Hi, We are glad you're here
            </div>
            <div className="sign_form">
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input onChange={(e)=>{setEmail(e.target.value)}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input onChange={(e)=>{setPassword(e.target.value)}}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>


      <Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Link className="link_black bold_font login-form-forgot" href="#">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button> Or <Link className="link_black bold_font" href="/register"> Register Now!</Link>
      </Form.Item>
    </Form>
                
            </div>
        </div>
    )
}

export default SigninScreen;
