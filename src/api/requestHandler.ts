import { AxiosError, AxiosResponse } from "axios";

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = { code: "success"; data: V };

type ErrorResponse<E = any> = { code: "error"; error: E };

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): BaseResponse<V, E> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (e: any) {
      const errorMsg =
        e?.response?.data?.message || e?.response?.data?.errors || e.message;

      return { code: "error", error: errorMsg as E };
    }
  };
