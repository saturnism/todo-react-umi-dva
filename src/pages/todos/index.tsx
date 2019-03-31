/**
 * title: Todo
 */

import React, { PureComponent } from 'react';
import { Layout, Input, List, Icon } from 'antd';
import { connect } from 'dva';
import { TodosState } from './model';
import * as styles from './index.css';

interface ViewProps {
  todos: TodosState;
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

  addTodo() {
    if (!this.state.pendingTodo) return;

    const { dispatch } = this.props;
    dispatch({
      type: 'todos/push',
      payload: {
        description: this.state.pendingTodo,
        completed: false,
      },
    });
    this.setState({ pendingTodo: '' });
  }

  completeTodo(id: number) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/update',
      id: id,
      payload: {
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
