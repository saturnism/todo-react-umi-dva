# Todo App with umi, dva

## Introduction
This is my attempt to build a simple Todo app with umi, dva.

## Setup

## From Scratch
A sequence of steps that I did to create this Todo app.

### Install umi
1. Read [umi Getting Started guide]
1. `yarn global add umi`

### Bootstrap Todo application
1. Create a new project directory: `mkdir todo-umi-dva`
1. Bootstrap `umi`: `yarn create umi`
  1. For *boilerplate type*: choose *app*
  1. For *use typescript*: enter *y*
  1. For *functionality do you want to enable*, select everything(*antd*, *dva*, *code splitting*, *dll*, *internationalization*)
1. Install dependencies: `yarn install`
1. Run in dev mode: `umi dev`
1. Visit via the browser: `http://localhost:8000`

### Use Ant Design's CSS
1. Edit `src/layouts/index.css`
  1. Import antd's CSS: `@import '~antd/dist/antd.css';` (From [Ant Design's Use in Typescript](https://ant.design/docs/react/use-in-typescript))
  1. Delete `font-family` related lines to use Ant Design's default. 

### Use Ant Design's Layout
1. Edit `src/layouts/index.tsx`
  1. Import Ant components
        ```
        import { Layout, Menu, Breadcrumb } from 'antd';
        const { Header, Content, Footer } = Layout;
        ```
  1. Update `render()` to return Ant layout. Notice `props.children` is rendered within the `Content` block.
        ```
        return (
          <Layout className="layout">
          <Header>
          <div className="logo" />
          <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
          >
              <Menu.Item key="1">Home</Menu.Item>
          </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              { props.children }
          </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Todo App Example
          </Footer>
          </Layout>
        );
        ```

### Create a Todo Model and Mock Service
1. Create Todo directory: `mkdir -p src/pages/todo`
1. Create a file to declare domain types: `touch src/pages/todo/types.ts`
  1. Create a `Todo` class. We'll come back to the Model file to wire up `dva`
1. Create a Mock file to host the mock service: `touch src/pages/todo/_mock.ts`
  1. Mock `/api/todos` service (see [source](src/pages/todo/_mock.ts))
  1. Try it out:
    1. Post new Todo: `curl -XPOST -H"Content-Type: application/json" -d'{"description" : "hello"}' localhost:8000/api/todos`
    1. Get Todos: `curl localhost:8000/api/todos`
    1. Patch Todo: `curl -XPATCH -H"Content-Type: application/json" -d'{"completed": true}' localhost:8000/api/todos/0`

### Create a Todo Service
1. Create a Service file: `touch src/pages/todo/service.ts`
  1. Create `TodoService`, see [source](src/pages/todo/service.ts)

### Create the UI
1. Create an `index.tsx` file: `touch src/pages/todo/index.tsx`
1. Put in the basic frontend code:
    ```
    import React, { PureComponent } from 'react';
    import { Layout, Input, Button, Row, Col, List, Icon, Form } from "antd";

    const { Header, Footer, Content } = Layout;

    export default class Todo extends PureComponent {
        render() {
            return(
                <Layout>
                    <Input.Group>
                      <Row gutter={8}>
                      <Col span={16}>
                        <Input size="large" placeholder="Something to do..." required/>
                      </Col>
                      <Col span={8}>
                        <Button size="large" type="primary">Add Todo</Button>
                      </Col>
                      </Row>
                    </Input.Group>
                    <List size="large" bordered renderItem={todo => (
                        <List.Item>
                            hi
                        </List.Item>
                    )}/>
                </Layout>
            );
        }
    }
    ```
1. Add DVA