import {HTTPTransport} from "./HTTPTransport";
import {Methods} from "./HTTPTransport";

describe('HTTPTransport', () => {
  const http = new HTTPTransport();
  const apiEndpoint = 'http://httpbin.org/';

  test('should perform GET request', async () => {
    const result = await http.request(`${apiEndpoint}/get`, {method: Methods.GET});
    expect((result as XMLHttpRequest).statusText).toEqual("OK");
  });

  test('should perform POST request', async () => {
    const result = await http.request(`${apiEndpoint}/post`, {method: Methods.POST});
    expect((result as XMLHttpRequest).statusText).toEqual("OK");
  });

  test('should perform PUT request', async () => {
    const result = await http.request(`${apiEndpoint}/put`, {method: Methods.PUT});
    expect((result as XMLHttpRequest).statusText).toEqual("OK");
  });

  test('should perform DELETE request', async () => {
    const result = await http.request(`${apiEndpoint}/delete`, {method: Methods.DELETE});
    expect((result as XMLHttpRequest).statusText).toEqual("OK");
  });
});