import Taro from '@tarojs/taro';

interface RequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
}

interface ResponseData {
  code: number;
  message: string;
  data: any;
}

function request<T = any>(params: RequestParams): Promise<T> {
  const { url, method = 'GET', data = {}, header = {} } = params;
  const token = Taro.getStorageSync('token');
  const headers = {
    ...header,
    Authorization: `Bearer ${token}`,
  };

  return Taro.request<ResponseData>({
    url,
    method,
    data,
    header: headers,
  })
    .then(res => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { code, message, data } = res.data;
      if (code === 0) {
        return data as T;
      } else {
        throw new Error(`请求错误，错误码：${code}，错误信息：${message}`);
      }
    })
    .catch(error => {
      Taro.showToast({ title: error.message, icon: 'none' });
      throw error;
    });
}

export default request;