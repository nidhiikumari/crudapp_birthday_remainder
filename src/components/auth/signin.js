import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Layout, Input, Typography, Alert, message } from 'antd';
import css from '../common/css';

const { Title } = Typography;

const Signin = () => {
  const navigate = useNavigate();
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  const [flag, setFlag] = useState(false);
  const [formError, setFormError] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Login Successfully',
    });
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await validate(emailLog, passwordLog);
  };

  const validate = (email, password) => {
    const errors = {};
    const pass = localStorage.getItem("Password");
    const emails = localStorage.getItem("Email");
    if (!email) {
      errors.email = 'Email is required!';
      setFlag(true);
    } else if (emails && (emails.replace(/"/g, "") !== email)) {
      errors.email = 'This Email is not valid!';
      setFlag(true);
    } else if (!emails) {
      errors.email = 'This Email is not valid!';
      setFlag(true);
    }
    if (!password) {
      errors.password = 'Password is required!';
      setFlag(true);
    } else if (pass && (password !== pass.replace(/"/g, ""))) {
      errors.password = 'This Password is not valid!';
      setFlag(true);
    } else if (!pass) {
      errors.password = 'This Password is not valid!';
      setFlag(true);
    }
    if (email && password && pass && emails && (password === pass.replace(/"/g, "")) && (email === emails.replace(/"/g, ""))) {
      success();
      setFlag(false);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
    setFormError(errors);
    return errors;
  };

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
        <Title>SIGN IN</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Title style={css.inputTitle} level={5}>Email</Title>
            <Input
              style={css.userSignIn}
              value={emailLog}
              type='text'
              placeholder="useremail"
              onChange={(e) => setEmailLog(e.target.value)}
            />
            {
              flag && formError && formError.email && (
                <Alert message={formError && formError.email} type="error" />
              )
            }
            <Title style={css.inputTitle} level={5}>Password</Title>
            <Input.Password
              style={css.userSignIn}
              value={passwordLog}
              placeholder="password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onChange={(e) => setPasswordLog(e.target.value)}
            />
            {
              flag && formError && formError.password && (
                <Alert message={formError && formError.password} type="error" />
              )
            }
            <button style={css.submitBtn} type="submit">Sign In</button>
          </div>
        </form>
        <Title level={5}>Did not <Link to='/signup'>Sign up</Link>?</Title>
      </Layout>
    </div>
  )
}

export default Signin;
