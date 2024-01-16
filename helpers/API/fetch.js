import { getAuthToken, getLangCode } from "./utils";

const fetchAPI = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_LIVE}`, // Replace with your fetchAPI base URL
  headers: {
    "Content-Type": "application/json",
  },
};

const applyInterceptors = (options) => {
  const tokenPromise = getAuthToken();
  const langCodePromise = getLangCode();

  return Promise.all([tokenPromise, langCodePromise]).then(
    ([token, langCode]) => {
      options.headers.lang = langCode;
      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }
      return options;
    }
  );
};

const fetchApi = async (url, options) => {
  try {
    const interceptedOptions = await applyInterceptors(options);
    const response = await fetch(url, interceptedOptions);
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    // console.log(error);
    return {
      error: true,
      status: 500,
      message: "An error occurred during the request.",
    };
  }
};

export const get = async (url, config) => {
  const options = {
    method: "GET",
    headers: { ...fetchAPI.headers, ...config?.headers },
  };
  return fetchApi(`${fetchAPI.baseURL}${url}`, options);
};

export const post = async (url, data, config) => {
  const options = {
    method: "POST",
    headers: { ...fetchAPI.headers, ...config?.headers },
    body: JSON.stringify(data),
  };
  const aa = await fetchApi(`${fetchAPI.baseURL}${url}`, options)
  return aa
};

export const put = async (url, data, config) => {
  const options = {
    method: "PUT",
    headers: { ...fetchAPI.headers, ...config?.headers },
    body: JSON.stringify(data),
  };
  return fetchApi(`${fetchAPI.baseURL}${url}`, options);
};

export const remove = async (url, config) => {
  const options = {
    method: "DELETE",
    headers: { ...fetchAPI.headers, ...config?.headers },
  };
  return fetchApi(`${fetchAPI.baseURL}${url}`, options);
};

export default {
  get,
  post,
  put,
  remove,
  ...fetchAPI, // Include other properties from fetchAPI
};
