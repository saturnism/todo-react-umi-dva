import React from 'react';
import { Layout, Menu, Spin } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import { OnlineState } from '@/models/online';

const { Header, Content } = Layout;

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
  online?: OnlineState;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <Spin spinning={!props.online} tip="Waiting to connect to the internet...">
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/todos"><Link to="/todos">Todo</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {props.children}
      </div>
    </Content>
    </Layout>
    </Spin>
  );
};

export default connect(({online}) => ({online: online.online}))(BasicLayout);
