/**
 * api接口
 */

 export const API = {
   dev: 'http://localhost:8388',
   product: 'http://106.12.34.36:8388',
 }

 export const host = API.dev;


export const goods = {
  url: '/api/goods/list',
  method: 'GET',
};

export const GoodsAPI = {
  upload: host + '/api/file/image/upload',
  imageUrl: host + '/api/file/image/',
};