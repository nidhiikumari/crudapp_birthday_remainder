import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Layout, Input, Typography, Alert, message } from 'antd';
import css from '../common/css';

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const [formError, setFormError] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Registered Successfully',
    });
  };
  const handleSubmit = async (e) => {
    await e.preventDefault();
    await validate(userName, userEmail, userPassword);
  };

  const validate = (name, email, pass) => {
    const Value = pass.trim();
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    if (!name) {
      errors.name = 'Name is required!';
      setFlag(true);
    }
    if (!email) {
      errors.email = 'Email is required!';
      setFlag(true);
    } else if (!regex.test(email)) {
      errors.email = 'This is not a valid email formate!';
      setFlag(true);
    }
    if (!pass.length) {
      errors.password = 'Password is required!';
      setFlag(true);
    } else if (pass.length < 4) {
      errors.password = 'Password must be more than 4 characters';
      setFlag(true);
    } else if (pass.length > 12) {
      errors.password = 'Password cannot exceed more than 12 charaters';
      setFlag(true);
    } else if (!uppercaseRegExp.test(Value)) {
      errors.password = 'At least one Uppercase';
      setFlag(true);
    } else if (!lowercaseRegExp.test(Value)) {
      errors.password = 'At least one Lowercase';
      setFlag(true);
    } else if (!digitsRegExp.test(Value)) {
      errors.password = 'At least one digit';
      setFlag(true);
    } else if (!specialCharRegExp.test(Value)) {
      errors.password = 'At least one Special Characters';
      setFlag(true);
    }
    setFormError(errors);
    return errors;
  };

  const checkError = () => {
    if (formError.email) {
      setFlag(true);
    } else if (formError.password) {
      setFlag(true);
    } else if (!formError.email && !formError.password && userName && userEmail && userPassword) {
      localStorage.setItem("Email", JSON.stringify(userEmail));
      localStorage.setItem("Password", JSON.stringify(userPassword));
      success();
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
    }
  };

  useEffect(() => {
    checkError();
  }, [formError]);

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
        <Title>SIGN UP</Title>
        <form onSubmit={handleSubmit}>
          <div style={css.userContent}>
            <Title style={css.inputTitle} level={5}>Name</Title>
            <Input
              style={css.userInput}
              type='text'
              placeholder="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {
              flag && formError && formError && formError.name && (
                <Alert message={formError.name} type="error" />
              )
            }
            <Title style={css.inputTitle} level={5}>Email</Title>
            <Input
              style={css.userInput}
              placeholder="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {
              flag && formError && formError && formError.email && (
                <Alert message={formError.email} type="error" />
              )
            }
            <Title style={css.inputTitle} level={5}>Password</Title>
            <Input.Password
              style={css.userInput}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {
              flag && formError && formError && formError.password && (
                <Alert message={formError.password} type="error" />
              )
            }
            <button style={css.signupBtn} type="submit">Create Account</button>
          </div>
        </form>
        <Title level={5}>Already Registered{" "}<Link to='/signin'>Login </Link> ?</Title>
      </Layout>
    </div >
  )
}

export default Signup;
