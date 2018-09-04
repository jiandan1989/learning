import React from 'react';
import { Card, Table } from 'antd';

import { recentSales } from '../../../../mock/dashboard';

const RecentSales = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => { console.log(a.date - b.date); return a.date - b.date },
    }
  ];
  const total = recentSales.length;
  const pagination = {
    position: 'bottom',
    hideOnSinglePage: true,
    pageSize: 5,
    total,
    showTotal: (total, range) => <span style={{ fontSize: 12 }}>{`${range[0]}-${range[1]} of ${total} items`}</span>,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10'],
    showQuickJumper: true,
    size: 'small'
  };
  return (
    <Card bordered={false} style={{ height: 435, overflowY: 'auto' }}>
      <Table
        rowKey={record => record.id}
        style={{ MinHeight: 400 }}
        pagination={pagination}
        dataSource={recentSales}
        columns={columns}
      />
    </Card>
  );
};

export default RecentSales;
