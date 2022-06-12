enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface OptionType {
  headers: Record<string, string>;
  data: Record<string, string>;
  method: Methods;
}

export default class HTTPTransport {
  queryStringify = (data: OptionType["data"]) => {
    return Object.entries(data).reduce((res, item, index) => {
      const [key, value] = item;
      const str = index === 0 ? '?' : '&';

      return res.concat(`${str}${key}=${value.toString()}`);
    }, '');
  };

  request = (url: string, options: OptionType, timeout = 5000) => {
    const {headers = {}, data, method} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === Methods.GET ? (url + this.queryStringify(data)) : url);

      xhr.onload = function() {
        resolve(xhr);
      };

      Object.entries(headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }
    });
  };
}