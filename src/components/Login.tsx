import React from 'react'
import { Button, Modal, Row } from 'antd';
import app from '@/utils/firebase';
import * as firebase from 'firebase';
import { LoginDispatch, LoginState } from '@/models/login';
import { connect } from 'dva';

interface LoginFormProps {
  visible: boolean
  onClose: Function
  dispatch: LoginDispatch
  loading: boolean
}

interface LoginFormState {
}

@connect(({ loading }) => ({
  loading: loading.models.login
}))
export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  private socialLogin = (event : MouseEvent) => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        providerName: "facebook",
      },
      onSuccess: (response) => {
        this.props.onClose();
      },
      onError: (code, msg) => {
        console.log("code : " + code + ", msg: " + msg)
      }
    })

  }

  private handleCancel = (event) => {
    this.props.onClose();
  }

  render() {
    return (
      <Modal visible={this.props.visible} bodyStyle={{textAlign: 'center'}} footer={null} onCancel={this.handleCancel}>
        <Row style={{ marginBottom: 8 }}>
          <span>Login or Sign Up with Existing Social Account</span>
        </Row>
        <Row>
          <Button
            style={{width: '50%'}} size={'large'}
            icon={'facebook'}
            type={'primary'}
            data-provider={'facebook'}
            onClick={this.socialLogin}>Facebook
          </Button>
        </Row>
      </Modal>
    )
  }
}
