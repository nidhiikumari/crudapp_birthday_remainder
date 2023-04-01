import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Input, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updatedUser } from '../redux/action';
import css from '../common/css';
import Appbar from '../common/header';

const { Title } = Typography;

const initialState = {
  name: '',
  email: '',
  phone: ''
};

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const users = useSelector(state => state.data);
  const [formValue, setFormValue] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Users Updated Succesfully',
    });
  };

  const { name, email, phone } = formValue;
  const Id = state.editData;
  const submitHandle = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      dispatch(updatedUser(formValue));
      success();
      setTimeout(() => {
        navigate('/');
      }, 2000)
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  useEffect(() => {
    if (state.editData) {
      const singleUser = users && users.user && users.user.length > 0 && users.user.find((item) => item.id === Number(state.editData))
      setFormValue({ ...singleUser })
    }
  }, [state.editData, users.user]);

  return (
    <div>
      <Appbar />
      <Layout style={css.addUserBox}>
        <Title>Edit User</Title>
        <form onSubmit={submitHandle}>
          <Title style={css.inputTitle} level={5}>Username</Title>
          <Input
            style={css.userInput}
            type='text'
            name='name'
            value={name || ''}
            onChange={onInputChange}
            placeholder="username"
            required
          />
          <Title style={css.inputTitle} level={5}>Email</Title>
          <Input
            style={css.userInput}
            type='email'
            name='email'
            value={email || ''}
            onChange={onInputChange}
            placeholder="useremail"
            required
          />
          <Title style={css.inputTitle} level={5}>Mobile</Title>
          <Input
            style={css.userInput}
            type='number'
            name='phone'
            value={phone || ''}
            onChange={onInputChange}
            placeholder="Mobile"
            required
          />
          <button style={css.submitBtn} type="submit">Update</button>
        </form>
      </Layout>
    </div>
  )
}

export default Edit;