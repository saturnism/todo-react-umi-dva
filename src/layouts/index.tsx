import React from 'react';
import { Layout, Menu, Spin } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import { OnlineState } from '@/models/online';
import { ClickParam } from 'antd/lib/menu';
import { LoginForm } from '@/components/Login';
import { LoginState } from '@/models/login';
import { Dispatch } from 'redux';

const { Header, Content } = Layout;

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History
  location?: Location
  online?: OnlineState
  login?: LoginState
  dispatch: Dispatch<any>
  loading: any
}

interface BasicLayoutState {
  showLogin: boolean
}

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  state = {
    showLogin: false
  }
  showSignIn = (param : ClickParam) => {
    this.setState({
      ...this.state,
      showLogin: true
    })
  }

  signOut = () => {
    this.props.dispatch({
      type: 'login/logout'
    })
  }

  render() {
    return (
      <Spin spinning={!this.props.online} tip="Waiting to connect to the internet...">
        <Layout className="layout">
          <Header >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[location.pathname]}
              style={{ lineHeight: '64px' }}
              hidden={this.props.loading.models.login}
            >
              <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="/todos"><Link to="/todos">Todo</Link></Menu.Item>
              {!this.props.login.loggedIn && <Menu.Item style={{ float: 'right' }} onClick={this.showSignIn}>Sign In</Menu.Item>}
              {this.props.login.loggedIn && <Menu.Item style={{ float: 'right' }} onClick={this.signOut}>Sign Out</Menu.Item>}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
        <LoginForm
          visible={this.state.showLogin} onClose={() => {
          this.setState({...this.state, showLogin: false})
        }}
        />
      </Spin>
    )
  }

}

export default connect(({online, login, loading}) => ({online: online.online, login, loading}))(BasicLayout);
