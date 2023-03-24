import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Layout,
  Modal,
  Typography,
  Space,
  Table,
  Tooltip,
  Button,
  Spin
} from 'antd';
import { LoadingOutlined, DeleteTwoTone, EyeTwoTone, EditTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import css from '../common/css';
import Appbar from '../common/header';
import { deleteUserStart, loadUsersStart } from '../redux/action';

const { Content } = Layout;
const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [id, setId] = useState('');

  const showModal = (deleteId) => {
    setIsModalOpen(true);
    setId(deleteId);
  };

  const handleOk = () => {
    dispatch(deleteUserStart(id));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (data) => {
    navigate(`/edit/${data.id}`, { state: { editData: data.id } });
  };
  const showModalView = (data) => {
    setIsModalViewOpen(true);
    setUserDetails([data]);
  };
  const handleViewOk = () => {
    setIsModalViewOpen(false);
  };
  const handleViewCancel = () => {
    setIsModalViewOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: "Phone",
      width: 200,
    },
    {
      title: 'Actions',
      width: 200,
      render: (text, row) => (
        <Space size="middle">
          <Tooltip title="Details">
            <Button style={css.icons} onClick={() => showModalView(row)}><EyeTwoTone /></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button style={css.icons} onClick={() => showModal(row.id)}><DeleteTwoTone /></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button style={css.icons} onClick={() => handleEdit(row)}><EditTwoTone /></Button>
          </Tooltip>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    dispatch(loadUsersStart())
  }, [dispatch]);

  return (
    <div style={css.root}>
      <Layout>
        <Appbar />
      </Layout>
      <Title>Welcome to Crud App</Title>
      {
        loading ? <Spin style={css.spinner} indicator={antIcon} />
          : (
            <Content
              style={{ padding: '0 210px' }}
            >
              <Table
                columns={columns}
                dataSource={users.map((row) => ({
                  Name: row.name,
                  Email: row.email,
                  id: row.id,
                  Phone: row.phone
                }))}
                bordered
                style={css.tableStyle}
                pagination={{ pageSize: 12 }}
              />
            </Content>
          )
      }
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure want to delete ?</p>
      </Modal>

      <Modal
        title="User Details"
        open={isModalViewOpen}
        onOk={handleViewOk}
        onCancel={handleViewCancel}
      >
        {
          userDetails && userDetails.length > 0 && userDetails.map((list) => (
            <>
              <p><span style={css.textPara}>Id -</span> {list.id}</p>
              <p><span style={css.textPara}>Name -</span> {list.Name}</p>
              <p><span style={css.textPara}>Email -</span> {list.Email}</p>
              <p><span style={css.textPara}>Mobile -</span> {list.Phone}</p>
            </>
          ))
        }
      </Modal>
    </div>
  )
}

export default Index;
