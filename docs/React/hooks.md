## Hooks {docsify-ignore}

> TODO: 文中有过时或最初写时错误, 待修复

在出现 `React Hooks` 之前在组件内部维护状态需要通过 `state`, 且通常理解的组件定义方式`Function Component`就是简单的无状态组件, 为了解决函数式组件无法维护内部状态提出 `Hooks`概念使得 `Function Component`也可以定义自己的状态

## useState

- 传递的参数为唯一的默认值, 例如 以下代码中, `count` 默认值为 `0`
- 返回值: 定义的状态变量, 以及唯一可以修改变量的函数
- 更新状态函数接收一个类似于 `setState` 中的保存上一状态值
- 惰性初始 `state`, 只会在组件的初始渲染中有用, 后续渲染会被忽略, 如果初始值比较复杂或者通过大量计算获得, 可以传递函数调用
- 如何确保每次的 `state` 更新对应的 `useState`: 靠的是 `hook`调用的顺序(此处应参考下数据格式的队列 `todo`)

```tsx
import React, { useState, Fragment } from "react";
import { Button } from "antd";

function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState({ name: "niexiaofei", age: 10 });

  function onChangeName() {
    setInfo(prevInfo => ({ ...prevInfo, age: prevInfo.age + 1 }));
  }

  return (
    <Fragment>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me
      </Button>
      &nbsp;
      <span>you click {count} times</span>
      <pre>{JSON.stringify(info, null, 2)}</pre>
      <Button onClick={onChangeName}>Change age</Button>
    </Fragment>
  );
}

export default UseStateDemo;
```

## useEffect

- 接收一个函数作为参数, 执行代码类似于使用 `componentDidUpdate`, 不能在此使用 `useState` 中定义的更新函数, 如若需要使用需要进行判断
  可返回一个函数, 类似于 `componentWillUnmount`
- 等同于将 `componentDidUpdata` `componenDidMount`, `componentWillUnmout` 合并为一个 `hook` 调用
- 根据官网提示虽然可以模拟出类似的生命周期, 但并不是真正的可以使用, 例如添加一个 `resize` 监听事件
- 接收第二个参数, 作为优化方法 最下方有具体描述, 此处没理解懂
- [更多](https://reactjs.org/docs/hooks-effect.html)

```tsx
import React, { useEffect, useState, Fragment } from "react";
import { Button } from "antd";

export default function UseEffectDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setCount(count + 1);
    }

    function resizeHandler() {
      setCount(count + 1);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      // todo 不明白此处为什么总是出现两次 will, 除了 willUnmout时会调用, 刚挂载此组件时也会调用
      // 消除使用 useEffect 带来的副作用, 此处为 resize
      window.removeEventListener("resize", resizeHandler);
    };
  }, [count]);

  return (
    <Fragment>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me
      </Button>
      &nbsp;
      <span>now count is: {count}</span>
    </Fragment>
  );
}
```

## useRef

```tsx
import React, { useRef, useEffect } from "react";
import { Button } from "antd";

export default function UseRefDemo() {
  const ints = useRef(null);

  useEffect(() => {
    console.log(ints, ">>>>>>>>>>");
  });
  return <Button ref={ints}>useRef</Button>;
}
```

- 在函数组件中使用 `ref`, 同 [createRef]() 功能相同
- 返回一个 `ref` 对象, 持续整个组件的生命周期内, 在组件卸载时销毁
- 除了可以用于获取 DOM 元素或者节点外, 还可以用于 设置定时器或者其他值, 例如以下代码

```tsx
import React, { useRef, useEffect, useState } from "react";
import { Button } from "antd";

const { Group: ButtonGroup } = Button;

function setIntervalWithUseEffect({ setCount, count }) {
  return setInterval(() => {
    setCount(count + 1);
  }, 500);
}

export default function UseRefDemo() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    /**
     * @desc: 混合了定时器, 此处会多次打印,
     * 将 ints 作为第二参数传递进去, 阻止多次调用, 但没能测试出有其他相关影响
     */
    console.log(ints, ">>>>>>>>>>");
  }, [ints]);

  useEffect(() => {
    const timer = setIntervalWithUseEffect({ setCount, count });
    intervalRef.current = timer;
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [count]);

  function clickSetInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // todo: 点击停止, 点击继续
    // intervalRef.current = setIntervalWithUseEffect({ setCount, count });
  }
  return (
    <ButtonGroup>
      <Button type="primary">{count}</Button>
      <Button type="primary" onClick={clickSetInterval}>
        clearInterval
      </Button>
    </ButtonGroup>
  );
}
```

## useReducer

- 可以通过 `reducer`(可以理解为组件内的 [Redux](https://redux.js.org/)) 更方便的管理组件本地复杂 `state`

```tsx
import React, { useReducer, Fragment } from "react";
import { Modal, Button } from "antd";

const initState = {
  count: 0,
  visible: false
};

function reducer(state, { payload = {}, type }) {
  if (type === "reset") {
    return initState;
  }

  return {
    ...state,
    ...payload
  };
}

export default function ReducerBasicExample() {
  const [state, dispatchState] = useReducer(reducer, initState);
  const { visible, count } = state;

  const showModal = () => {
    dispatchState({
      payload: { visible: true, count: count + 1 }
    });
  };

  const onCloseModal = () => {
    dispatchState({
      payload: {
        visible: false
      }
    });
  };
  return (
    <Fragment>
      <Button onClick={showModal}>展开</Button>
      <Modal
        title={count}
        visible={visible}
        onOk={onCloseModal}
        onCancel={onCloseModal}
      >
        通常是在多个 state, 超过三个以上的状态管理, 或者较为复杂的数据格式时
      </Modal>
    </Fragment>
  );
}
```

## useContext

不嵌套组件的情况下使用 定义`context`中的数据, 在此`hook` 出现之前 需要使用 `Consumer`来获取到 `Provider` 中定义的 `value` 值, 但是有局限性, 只在子组件中使用函数型组件进行接收, 且当组件中接收的值不是很符合使用时的格式时需要对其进行转换,有些难以维护

注意: `useContext` 接收的必须是通过 `createContext` 创建的对象

```tsx
const MyContext = React.createContext({}); // 在没有定义 Provider value 值时,默认取值
```

##### `Class` 组件

```tsx
class ParentCompnent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen = () => {
    this.setState(prevState => {
      isOpen: !prevState.isOpen,
    });
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Button onClick={toggleOpen}>Click me</Button>
        <ChildAComponent />
      </MyContext.Provider>
    );
  }
}

class ChildAComponent extends PureComponent {
  // value 打印出来为一个对象, { isOpen: false | true }

  render() {
    return (
      <MyContext>
      {(value) => (
        <div>{JSON.stringify(value)}</div>
      )}
      </MyContext>
    );
  }
}
```

在`Class` 组件中使用 `Provider` 和 `Consumer` 来获取到 `context`中值时, 有些难以维护

虽然此时看着还能够接收, 是因为接收的值很单一, 但是如果接受的值比较复杂, 需要进行处理逻辑时,看着就比较麻烦
尽管是不推荐在接收值之后对数据进行修改, 但这并不是完全能够避免的,`当然指的是大部分组件都是使用 Function Component`

- 代码有些过于复杂
- 多个子组件中共享 `context`数据使用时不是太友好
- 数据格式比较复杂时不利于维护

##### 使用`useContext`

```tsx
const ParentComponent: React.FC = () => {
  return (
    <MyContext.Provider>
      <ChildAComponent />
    </MyContext.Provider>
  );
};

// 可以通过使用 useContext 在渲染组件 return 之前获取到 value 中的值
const ChildAComponent: React.SFC = () => {
  const value = useContext(MyContext);
  return <div>{JSON.stringify(value)}</div>;
};
```

## 自定义

[**在线示例**](https://codesandbox.io/s/zidingyihooks-ceshi-c6wb2)

#### 约定

- 自定义`hook` 的约定: 以`use` 开头, 并且调用其他的`hook` 或其他自定义的 `hook`, 才会被称为自定义的 `hook`
- 多个组件使用相同的`hook` 会共享 `state` 么: 不会自定义`hook` 是一种重用状态逻辑的机制, 所以每次调用自定义 `hook` 时, 其中所有 `state` 和副作用都是完全隔离的

### usePrevious

- 通过 [refs](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state) 自定义 Hooks 实现获取[上一轮的值](https://react.docschina.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)

```tsx
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

<!-- ## 结合 Antd {docsify-ignore} -->

### useModal

- 使用 [Ant Design](https://ant.design/index-cn) 组件库时, 经常会碰到有使用 [Modal](https://ant.design/components/modal-cn/) 或者 [Drawer](https://ant.design/components/drawer-cn/) 情况, 但是每次都需要使用 useState 进行维护 visible 的值, 比较麻烦

```tsx
import { useState } from "react";

const useModal = (state: boolean = false) => {
  const [visible, setVisible] = useState(state);

  function onShow() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  return { visible, setVisible, onShow, onClose };
};
```

### useQueryParams

- 主要用于比如表格([Table](https://ant.design/components/table-cn/), [List](https://ant.design/components/list-cn/) 等查询类组件时) 或者其他定义参数时

```tsx
import { useState } from "react";

const useQueryParams = <T>(
  state: T
): {
  queryParams: T;
  updateQueryParams: Function;
} => {
  const [queryParams, setQueryParams] = useState(state);

  function updateQueryParams(payload: object = {}) {
    setQueryParams((prevParams: T) => ({
      ...queryParams,
      ...payload
    }));
  }

  return { queryParams, updateQueryParams };
};
```

### useDetailModal

- 主要用于比如表格中有修改时, 需要从列表当前行中获取到数据时, 并且和新增使用同一个 [Modal](https://ant.design/components/modal-cn/) 或者 [Drawer](https://ant.design/components/drawer-cn/)

```tsx
import { useState } from "react";

const useDetailModal = (
  state: boolean = false
): {
  visible: boolean;
  isUpdata: boolean;
  detailInfo: any;
  modalType: string;
  onShowDetail: Function;
  onCloseDetail: Function;
  setDetailInfo: Function;
} => {
  const { visible, onShow, onClose } = useModal(state);
  const [modalType, setModalType] = useState("");
  const [detailInfo, setDetailInfo] = useState({});
  const isUpdate = modalType === "update";

  // 默认为新增类型, 定义新增: add 编辑 / 修改 : update
  function onShowDetail({
    mt = "add",
    record = {}
  }: {
    mt?: string;
    record?: object;
  }) {
    setModalType(mt);
    setDetailInfo(record);
    onShow();
  }

  function onCloseDetail() {
    setModalType("");
    onClose();
    setDetailInfo({});
  }

  return {
    visible,
    isUpdate,
    modalType,
    detailInfo,
    onShowDetail,
    setDetailInfo,
    onCloseDetail
  };
};
```

### useQueryData

- 方便于请求, 不用写太多的 [useAsync](https://github.com/umijs/hooks/blob/master/src/useAsync/index.ts)

```tsx
import { useEffect, useState } from "react";

/**
 * queryService: 封装的请求方法
 * defaultData: 默认值, 当前使用 { list: [], total: 0 } 在业务中使用比较多的列表中定义的格式(和后台约定统一列表返回格式)
 */
const useQueryData = (
  queryService: Function,
  defaultData: any = { list: [], total: 0 }
) => {
  // 可以添加返回 useAsync 支持的属性
  const { data, run: queryData, loading } = useAsync(queryService, [], {
    manual: true
  });

  const result = useMemo(() => {
    // 此处可以添加自己业务中使用到的判断防范
    if (data && data.success) {
      return data.data || defaultData;
    }
    return defaultData;
  }, [data]);

  return { result, loading, queryData };
};
```

### useUpdate

```tsx
import { useEffect, useState } from "react";

/**
 * updateService: 需要接收为请求方法
 * callback: 成功后的回调
 */
const useUpdate = (updateService: Function, callback?: Function) => {
  const { data, run: updateFn, loading } = useAsync(updateService, [], {
    manual: true
  });

  const [isSuccess, setIsSuccess] = useState(data && data.success);

  useEffect(() => {
    setIsSuccess(data && data.success);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);

      if (callback) {
        callback();
      }
    }
  }, [isSuccess]);

  return { isSuccess, updateFn, loading };
};
```

## 参考

- [Live Demo](https://codepen.io/niexiaofei/pen/GeWeXZ)
- [在线示例](https://codesandbox.io/s/learn-hooks-0fosd)
- [hooks](https://reactjs.org/docs/hooks-intro.html)
- [react-use](https://github.com/streamich/react-use): 封装的一些自定义 Hook
- [umi/hooks](https://hooks.umijs.org/): 更多包含有结合 [Antd](https://ant.design/index-cn) 组件使用的 `hooks`
- [react-router-dom](https://reacttraining.com/react-router/web/api/Hooks): 在新版本 `v5.1` 中可以使用的`hook`, `useHistory`, `useParams`, `useLocation` 和 `useRouteMatch`
- [Primer on Reac Hooks](https://testdriven.io/blog/react-hooks-primer/)
- [此文档不做参考](https://www.yuque.com/xiaofanteam/frontend/vaitm5)
