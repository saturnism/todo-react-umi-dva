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

### Create a Todo Model and Mock Service
1. Create Todo directory: `mkdir -p src/pages/todo`
1. Create a file to declare domain types: `touch src/pages/todo/types.ts`
   1. Create a `Todo` class. We'll come back to the Model file to wire up `dva`
1. Create a Mock file to host the mock service: `touch src/pages/todo/_mock.ts`
   1. Mock `/api/todos` service (see [source](src/pages/todos/_mock.ts))
   1. Try it out:
      1. Post new Todo: `curl -XPOST -H"Content-Type: application/json" -d'{"description" : "hello"}' localhost:8000/api/todos`
      1. Get Todos: `curl localhost:8000/api/todos`
      1. Patch Todo: `curl -XPATCH -H"Content-Type: application/json" -d'{"completed": true}' localhost:8000/api/todos/0`

### Create a Todo Service
1. Create a Service file: `touch src/pages/todo/service.ts`
   1. Create `TodoService`, see [source](src/pages/todos/service.ts)

### Create the UI
1. Create an `index.tsx` file: `touch src/pages/todo/index.tsx`
1. Put in the basic frontend code:
1. Refresh the page to see it: `http://localhost:8080/todo`

### Wire up DVA
This is perhaps the most complicated thing... :/

1. Create `src/pages/todo/model.ts`
   1. Set namespace to `todos`
   1. Create `TodoState`
   1. Initialize state as a type of `TodoState`
   1. Add a reducer
   1. Add effects. Each "effect" is later triggered by `dispatch` as `type: "[namespace]/[effect name]"`, with `payload`
   1. Once an effect is completed, use `yield put` to trigger a reducer
1. In `src/pages/todo/index.tsx`
   1. Declare an Props interface to access `dispatch`, `loading`, and data from `dva`
       ```
       interface ViewProps extends TodoState {
         dispatch: any;
         loading: boolean;
       }
       ```
   1. Use decoration to connect `dva` to component. 
       ```
       @connect(({ todos, loading }) => ({
         todos,
         loading: loading.models.todos,
       }))
       ```
    1. What does `@connect` do? See [this blog](https://www.cnblogs.com/bjlhx/p/9009056.html), and [Proper Typing of react-redux Connected Components](https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d)
    1. Where does `loading` coming from? See [dva#1464](https://github.com/dvajs/dva/issues/1464)

### Link & Navigation
1. In `src/layouts/index.tsx`
   1. Each `<Menu>` uses the path as `key`, e.g., `<Menu.Item key="/">Home</Menu.Item>`
   1. Use `<Link>` to navigate to URL, e.g., `<Link to="/">Home</Link>`
   1. In `<Menu>`, use `location.pathname` to select current item: `<Menu ... defaultSelectedKeys={[location.pathname]}>...</Menu>`

### Page Title
1. Read [UmiJS - Router - Extending Routing by Annotation](https://umijs.org/guide/router.html#extending-routing-by-annotation)
1. Page title can be set in the comment
    ```
    /**
     * title: Page Title
     */
    ```

### Lint
1. Read [umi-lint](https://www.npmjs.com/package/umi-lint) instructions
1. Add lint: `yarn add umi-lint --dev`
1. Add to `package.json`
    ```
    "scripts": {
      ...
      "lint:umi": "umi-lint --tslint --prettier  src/",
      "precommit:umi": "umi-lint --staged --tslint --stylelint --prettier --fix"
      ...
    }
    ```
1. Run: `yarn lint:umi`
