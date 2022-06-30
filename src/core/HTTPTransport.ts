export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface OptionType {
  data?: Record<string, string>;
  method: Methods;
}

export default class HTTPTransport {
  request = (url: string, options: OptionType, type = "application/json") => {
    const {data, method} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.onload = function() {
        resolve(this.response);
      };

      xhr.setRequestHeader("Content-type", type);

      xhr.timeout = 15000;
      xhr.onabort = () => reject({ resolve: "abort" });
      xhr.onerror = () => reject({ resolve: "network error" });
      xhr.ontimeout = () => reject({ resolve: "timeout" });
      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === Methods.GET || !data) {
        xhr.send();
      } else if (type === "multipart/form-data") {
        xhr.send(data as any);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}