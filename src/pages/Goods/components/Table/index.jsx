import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import styles from './index.module.scss';

import request from '@/utils/request';
import { goods } from '../../../../dataSourceConfig';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
async function getData(length = 10) {
  /*
  return Array.from({ length }).map(() => {
    return {
      name: ['蓝牙音箱', '天猫精灵', '智能机器人'][random(0, 2)],
      cate: ['数码', '智能'][random(0, 1)],
      tag: ['新品', '预售'][random(0, 1)],
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'][random(0, 2)],
      sales: random(1000, 2000),
      service: ['可预约', '可体验'][random(0, 1)],
    };
  });
  */
  const { data } = await request(goods);
  return data;
};

export default function GoodsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  const fetchData = (len) => {
    setLoading(true);
    mockApi(len).then((data) => {
      setLoading(false);
      setDataSource(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePaginationChange = (current) => {
    setCurrentPage(current);
    fetchData();
  };

  const handleFilterChange = () => {
    fetchData(5);
  };

  const handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        fetchData(10);
      },
    });
  };

  const handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  const renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <IceContainer>
        <Filter onChange={handleFilterChange} />
      </IceContainer>
      <IceContainer>
        <Table loading={isLoading} dataSource={dataSource} hasBorder={true}>
          <Table.Column title="商品名称" dataIndex="title"  />
          <Table.Column title="商品描述" dataIndex="description" width={300}/>
          <Table.Column title="品牌" dataIndex="band" />
          <Table.Column title="型号" dataIndex="mark" />
          <Table.Column title="配置" dataIndex="sales" />
          <Table.Column title="上牌时间" dataIndex="regTime" />
          <Table.Column title="保险时间" dataIndex="insuranceTime" />
          <Table.Column title="验车时间" dataIndex="checkTime" />
          <Table.Column title="过户次数" dataIndex="transferNum" />
          <Table.Column title="汽车排量" dataIndex="outputVolume" />
          <Table.Column title="行驶里程" dataIndex="distance" />
          <Table.Column title="价格(w)" dataIndex="price" />
          <Table.Column title="汽车排放标准" dataIndex="outputStandard" />
          <Table.Column title="车身颜色" dataIndex="color" />
          <Table.Column title="状态" dataIndex="status" />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="更新时间" dataIndex="updateTime" />
          <Table.Column
            title="操作"
            width={200}
            dataIndex="oper"
            cell={renderOper}
          />
        </Table>
        <Pagination
          className={styles.pagination}
          current={currentPage}
          onChange={handlePaginationChange}
        />
      </IceContainer>
    </div>
  );
}
