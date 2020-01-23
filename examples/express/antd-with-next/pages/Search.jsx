import React, { useEffect, useState } from "react";
import { List, Avatar, Card } from "antd";

import useLoading from "../hooks/useLoading";
import { searchResultService } from "../service/search";

const SearchPage = () => {
  const [list, setList] = useState([]);
  const { loading, showLoading, hideLoading } = useLoading();

  async function getResult() {
    const result = await searchResultService({
      query: 1
    });
    if (result.status === 200) {
      hideLoading();
      setList(result.data);
    }
  }

  useEffect(() => {
    showLoading();
    getResult();
  }, []);

  return (
    <Card title="搜索结果">
      <List
        loading={loading}
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              // https://unsplash.it/64/64/?random
              // http://placehold.it/64x64
              avatar={<Avatar alt={item.title} src={`https://unsplash.it/64/64/?random=${index}`} />}
              title={<a href={item.href}>{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SearchPage;
