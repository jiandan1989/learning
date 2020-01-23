import React, { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input } from "antd";

import "./style.css";

// todo1. 初步根据输入值, 调用百度搜索接口
// todo2. 输入URL及添加解析代码, 运行爬取
// todo3. 登录 校验

const Index = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>首页</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="full_wrapper">
        <Input.Search
          enterButton
          style={{ width: 500 }}
          onSearch={val => {
            if (!val) return;
            router.replace(`/search?query=${val}`);
          }}
          // defaultValue="https://cnodejs.org/"
          placeholder="请输入你想获取的页面地址"
        />
      </div>
    </Fragment>
  );
};

export default Index;
