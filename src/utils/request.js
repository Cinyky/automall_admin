import axios from 'axios';
import { Message } from '@alifd/next';
import { host } from '../dataSourceConfig';

// Set baseUrl when debugging production url in dev mode

export default async function request(options) {
  try {
    // console.error(process.env);
    if (!options.baseURL) {
      options.baseURL = host;
    }
    console.log(options);
    const response = await axios(options);
    const data = response.data;
    console.log(data);
    if (data) {
      return { response, data };
    } else {
      throw new Error(data.message || '后端接口异常');
    }
  } catch (err) {
    // 统一处理接口异常逻辑
    Message.show({
      type: 'error',
      title: '错误消息',
      content: err.message,
    });
    console.error(err);
    throw err;
  }
}
