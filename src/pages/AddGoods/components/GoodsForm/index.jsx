import React, { useRef } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Message,
  NumberPicker,
  DatePicker,
  Radio,
  Select,
  Upload
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '@/components/PageHead';
import styles from './index.module.scss';

const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;
import { GoodsAPI } from '../../../../dataSourceConfig';


export default function GoodsForm() {
  const formEl = useRef(null);

  const formChange = (value) => {
    console.log('value', value);
  };

  const validateAllFormField = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  return (
    <div>
      <PageHead title="添加商品" />
      <IceContainer style={{ padding: '40px' }}>
        <IceFormBinderWrapper
          onChange={formChange}
          ref={formEl}
        >
          <div className={styles.formItem}>
            <div className={styles.formLabel}>商品名称：</div>
            <IceFormBinder name="goodsName" required message="商品名称必填">
              <Input
                placeholder="请输入商品名称"
                style={{ width: '400px' }}
              />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="goodsName" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>条形码：</div>
            <IceFormBinder name="code">
              <Input
                placeholder="请输入数字条形码"
                style={{ width: '400px' }}
              />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>库存量：</div>
            <IceFormBinder name="stock" required message="联系方式必填">
              <NumberPicker />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>商品标签：</div>
            <IceFormBinder name="bookName">
              <Select
                placeholder="请选择"
                mode="multiple"
                style={{ width: '400px' }}
              >
                <Option value="1">新品</Option>
                <Option value="2">数码</Option>
                <Option value="3">智能</Option>
                <Option value="4">生活</Option>
              </Select>
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>商品价格：</div>
            <IceFormBinder name="price" required message="商品价格必填">
              <Input
                placeholder="请输入商品价格: ￥199.99"
                style={{ width: '400px' }}
              />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="price" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>预售时间：</div>
            <IceFormBinder name="reverseTime">
              <RangePicker style={{ width: '400px' }} />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>预约条件：</div>
            <IceFormBinder name="payment">
              <RadioGroup
                dataSource={[
                  {
                    value: '1',
                    label: '需要支付',
                  },
                  {
                    value: '2',
                    label: '无需支付',
                  },
                ]}
              />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>体验展示：</div>
            <IceFormBinder name="show">
              <RadioGroup
                dataSource={[
                  {
                    value: '1',
                    label: '展示',
                  },
                  {
                    value: '2',
                    label: '不展示',
                  },
                ]}
              />
            </IceFormBinder>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formLabel}>体验展示：</div>
            <IceFormBinder name="image">
              <Upload.Card
                listType="card"
                action={GoodsAPI.upload}
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                defaultValue={[]}
                limit={2}
                name="image"
              />
            </IceFormBinder>
          </div>

          <Button type="primary" onClick={validateAllFormField}>
            提 交
          </Button>
        </IceFormBinderWrapper>
      </IceContainer>
    </div>
  );
}
