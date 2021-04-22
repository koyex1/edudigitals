import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, Switch,Radio,
    Slider, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { UserOutlined,UserAddOutlined, ContainerOutlined , MailFilled , PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { languages, countryList, roles} from '../data/data';
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));



function RegisterScreen(props) {
    

    const classes = useStyles();

    const [currency, setCurrency] = useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setUser({ ...user, interestedRole: event.target.value});
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    //dispatch and receiving ends
    const dispatch = useDispatch()
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, error} = userRegister;

    const [user, setUser] = useState({firstName: '', 
    lastName: '', email: '', password: '', interestedRole: '', language: '', 
    phoneNo: '', about: '', subjects: '', ratings: '', projectNos: '', 
    idCard: '', profilePicture: '', charge: '', video: '', verified: ''});

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      if(user.password!==confirmPassword){
            setConfirmed(false)
      }
      else{
        setConfirmed(true)
      }
       if(userInfo){
           props.history.push('/')
       } 
    }, [userInfo,props.history, user.language, confirmPassword, user.password, setErrorMessage])

    const submitHandler=()=>{
      console.log(user);
        dispatch(register(user));
    }
    const [confirmed, setConfirmed] = useState(true)
    const handleMatch = (e) =>{
      setConfirmPassword( e.target.value)
    }

    

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
      onFinish={submitHandler}
    >
      <Form.Item
        name="First Name"
        label="First Name"
        hasFeedback
        rules={[{ required: true, message: 'Please input your FirstName!' }]}
      >
        <Input onChange={e=> setUser({ ...user, firstName: e.target.value})} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="FirstName" />
      </Form.Item>
      <Form.Item
        name="Last Name"
        label="Last Name"
        hasFeedback
        rules={[{ required: true, message: 'Please input your LastName!' }]}
      >
        <Input onChange={e=> setUser({ ...user, lastName: e.target.value})}  prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="LastName" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input onChange={e=> setUser({ ...user, email: e.target.value})}  prefix={<MailFilled className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input 
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          onChange={e=> setUser({ ...user, password: e.target.value})}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
      label="Confirm Password"
        name="confirmPassword"
      >
        <Input 
          
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          onChange={handleMatch}
          placeholder="ConfirmPassword"
        />
        {!confirmed && <label> Password doesn't match </label>}
      </Form.Item>
     

      <Form.Item
        name="role"
        label="Role"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your role!',
          },
        ]}
      >
        <Select placeholder="Please select your role"
            showSearch
            onChange={value=> setUser({ ...user, interestedRole: value})}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
        {roles.map((role) => (
          <Option  value={role}>{role}</Option>
          ))}

        </Select>

        
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your language!',
          },
        ]}
      >
        <Select placeholder="Please select your language"
            showSearch
            optionFilterProp="children"
            onChange={value=> setUser({ ...user, language: value})}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
        {languages.map((language) => (
          <Option   value={language}>{language}</Option>
          ))}
        </Select>
      </Form.Item>

      

      <Form.Item
        name="country"
        label="Country"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
        <Select placeholder="Please select a country"
            showSearch
            optionFilterProp="children"
            onChange={value=> setUser({ ...user, country: value})}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
        {countryList.map((country) => (
          <Option  value={country}>{country}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="phoneNo"
        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
      >
        <Input  onChange={e=> setUser({ ...user, phoneNo: e.target.value})}prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
      </Form.Item>

      <Form.Item name='introduction' label="Introduction">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="subjects"
        label="subjects"
        rules={[{ required: true, message: 'Please input your Subjects!' }]}
      >
        <Input onChange={e=> setUser({ ...user, subjects: e.target.value})} prefix={<ContainerOutlined className="site-form-item-icon" />} placeholder="Subjects" />
      </Form.Item>

      <Form.Item
        name="Charge"
        label="Charge"
        rules={[{ required: true, message: 'Please input your charge!' }]}
      >
      <InputNumber
      onChange={value=> setUser({ ...user, charge: value})}
      defaultValue={0}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
    />
    </Form.Item>

    <Form.Item
        name="upload"
        label="Upload Picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload ID"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

     
<br/>


      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button bold_font">
          Register</Button> Or <Link className="link_black bold_font" href="/signin">Sign In Now!</Link>
      </Form.Item>
    </Form>
                
            
              
            </div>
        </div>
    )
}

export default RegisterScreen
