import request from "@/utils/request";
import { baseUrl, baseUrl1 } from "@/services/api";

export const api = {
  news: `${baseUrl}/ajax/news.aspx`, //接口
  indexHtml: `${baseUrl}/`,
  userinfoApi: `${baseUrl1}/user/userinfo`,
};

export async function indexHtml(params, options = {}) {
  return request(api.indexHtml, {
    data: params,
    ...options,
  });
}

export async function news(params, options = {}) {
  return request(api.news, {
    data: params,
    ...options,
  });
}

export async function userinfoApi(params, options = {}) {
  return request(api.userinfoApi, {
    data: params,
    ...options,
  });
}
