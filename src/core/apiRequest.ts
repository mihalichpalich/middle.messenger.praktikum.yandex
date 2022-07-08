import {HTTPTransport} from "./HTTPTransport";
import {OptionType, Methods} from "./HTTPTransport";

const http = new HTTPTransport();

export function request<T extends any>(path: string, options: OptionType, type?: string) {
  return http.request(
    `${process.env.API_ENDPOINT}/${path}`,
    options,
    type
  ).then((data) => {
    return data as unknown as T | APIError;
  });
}

request.get = <T>(path: string) => request<T>(path, {method: Methods.GET});
request.post = <T>(path: string, data?: OptionType["data"]) => request<T>(path, {method: Methods.POST, data});
request.delete = <T>(path: string, data: OptionType["data"]) => request<T>(path, {method: Methods.DELETE, data});
request.put = <T>(path: string, data: OptionType["data"], type?: string) => request<T>(path, {method: Methods.PUT, data}, type);