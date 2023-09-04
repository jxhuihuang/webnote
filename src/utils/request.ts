/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getDvaApp } from 'umi';

const codeMessage = {
  // 用户定义
  '-1': '登陆已过期',
  1: '请求失败',
  2: '需要客户端登录',
  4002: '暂无库存',
  4001: '输入参数错误',
  5001: '服务器错误',
  5002: '数据库错误',
  5003: '网络访问错误',
  5004: '自定义表单请求',
  6001: '业务错误',
  6002: '验证码错误',
  // 用户定义 end
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  522: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const showError = (message) => {
  notification.error({
    message: `请求错误`,
    description: message,
    duration: 2,
  });
};
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const dva = getDvaApp();
  const { response, name, message, data, handerError }: any = error;
  if (handerError) {
    throw error;
  }
  if (name === 'TypeError') {
    showError('当前网络不好，请检查网络后重新登录');
    return;
  }
  if (data?.code === -1) {
    showError(codeMessage[data?.code]);
    dva._store.dispatch({
      type: 'login/logout',
      payload: { tokenInvalid: true },
    });
    // dva._store.dispatch({
    //   type: 'login/settokenInvalid',
    //   payload: true,
    // });
  } else if (data?.code === 5004) {
    showError(codeMessage[data?.code]);
    // 自定义表单接口form请求过期
    dva._store.dispatch({ type: 'formSystem/accessRemote' });
  } else {
    // 处理response返回为null的情况
    const newResponse = response || {};
    const errorText = codeMessage[newResponse.status] || newResponse.statusText || message;
    showError(errorText);
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  method: 'post', // 默认请求方式
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

/**
 * request 拦截器
 * 可改变url 或 options.
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
      data: options.data || {},
      headers: {
        'request-type': 'ajax',
        token: localStorage.getItem('token'),
      },
    },
  };
});

/**
 * 对于状态码实际是 200 的错误
 */
request.interceptors.response.use(async (response: any, req) => {
  if (response && response.status === 200) {
    const { responseType = 'json' } = req;

    if (responseType === 'json') {
      const data = await response.clone().json();
      if (data && data.code === 0) {
        // if (data?.info) {
        //   notification.info({
        //     message: `操作成功`, description: data?.info, duration: 2,
        //   });
        // }
        return response;
      }
      const error = new Error(data.info || '操作异常');
      error.data = data;
      // 这里取巧一下，如果想自己处理错误信息则继续抛出错误
      error.handerError = !!req.data?.handerError;

      throw error;
    }
    return response;
  }
  // 404错误也会走这里
  // console.log(response);

  const error = new Error();
  error.response = response;
  throw error;
});
// request
export default request;
