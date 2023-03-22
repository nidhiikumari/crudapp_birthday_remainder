import React from 'react';
import {
  Link
} from 'react-router-dom';
import { Layout, Typography } from 'antd';
import css from './common/css';
const { Title } = Typography;

const PageNotFound = () => {
  return (
    <div style={{ backgroundColor: 'antiquewhite' }}>
      <Layout style={css.pageNotFound}>
        <Title level={1} style={css.titlePage}>404 Error Page</Title>
        <Title level={2} style={css.subContent}>Sorry, This Page Not Found</Title>
        <Link to='/' style={css.backBtn}>Go Back</Link>
      </Layout>
    </div>
  )
};

export default PageNotFound;
