import React from 'react';
import { Card, List, Avatar, Tag } from 'antd';
import { comments } from '../../../../mock/dashboard';

const Quote = () => {
  return (
    <Card bordered={false} style={{ height: 435, overflowY: 'auto' }}>
      <List
        bordered
        dataSource={comments}
        renderItem={({ avatar, name, content, status, date }) => {
          const description = (
            <div style={{ fontSize: 12 }}>
              <div className="content" style={{ fontSize: 12 }}>
                {content}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                <Tag style={{ paddingRight: 16, paddingLeft: 16 }} color="gold">
                  {status}
                </Tag>
                <span>{date}</span>
              </div>
            </div>
          );
          return (
            <List.Item key={name}>
              <List.Item.Meta
                avatar={<Avatar src={avatar} />}
                title={<a href="/">{name}</a>}
                description={description}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default Quote;
