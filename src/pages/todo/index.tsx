/**
 * title: Todo
 */

import React, { PureComponent } from 'react';
import { Layout, Input, List, Icon } from 'antd';
import { connect } from 'dva';
import { TodoState } from './model';
import * as styles from './index.css';

interface ViewProps {
  todos: TodoState;
  dispatch: any;
  loading: boolean;
}

interface ViewStates {
  pendingTodo: string;
}

@connect(({ todos, loading }) => ({
  todos,
  loading: loading.models.todos,
}))
class Todo extends PureComponent<ViewProps, ViewStates> {
  state = {
    pendingTodo: '',
    loading: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/all',
    });
  }

  addTodo() {
    if (!this.state.pendingTodo) return;

    const { dispatch } = this.props;
    dispatch({
      type: 'todos/add',
      payload: {
        description: this.state.pendingTodo,
      },
    });
    this.setState({ pendingTodo: '' });
  }

  completeTodo(id: number) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/complete',
      payload: {
        id: id,
        completed: true,
      },
    });
  }

  render() {
    return (
      <Layout className={styles.todoLayout}>
        <Input.Search
          className={styles.todoInput}
          size="large"
          placeholder="Something to do..."
          onChange={e =>
            this.setState({
              pendingTodo: e.target.value,
            })
          }
          value={this.state.pendingTodo}
          onSearch={e => this.addTodo()}
          enterButton="Add Todo"
          required={true}
        />
        <List
          className={styles.todoList}
          size="large"
          loading={this.props.loading}
          bordered={true}
          dataSource={this.props.todos.list}
          renderItem={item => (
            <List.Item hidden={item.completed} className={styles.todoItem}>
              {item.description}
              <Icon
                onClick={e => this.completeTodo(item.id)}
                type="check"
                className={styles.todoCheckIcon}
              />
            </List.Item>
          )}
        />
      </Layout>
    );
  }
}

export default Todo;
