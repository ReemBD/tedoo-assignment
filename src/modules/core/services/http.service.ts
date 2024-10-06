import Axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL: string = 'https://backend.tedooo.com/';

const axios: AxiosInstance = Axios.create({
  withCredentials: false,
});

export const httpService = {
  get<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'GET', data);
  },
  post<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'POST', data);
  },
  put<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'PUT', data);
  },
  delete<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'DELETE', data);
  },
};

async function ajax<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: any = null
): Promise<T> {
  try {
    const res: AxiosResponse<T> = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
    });
    return res.data;
  } catch (err: any) {
    console.log(
      `Had issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${JSON.stringify(
        data
      )}`
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      window.location.assign('/#/login');
    }
    throw err;
  }
}
