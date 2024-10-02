import { encode } from 'qss';

class AuthFetch {
  getHeaders() {
    const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

    return {
      accept: 'application/json',
      authorization: `Bearer ${API_TOKEN}`,
    }
  }

  getRequest(method: string, path: string, payload?: Object, customOptions?: Object) {
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
      ...customOptions,
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }
  
    return new Request(path, options);
  }

  async getFetchRequest(method: string, path: string, payload?: Object):Promise<Object> {
    const req = this.getRequest(method, path, payload)
    const response = await fetch(req)
    const data = await response.json()

    return data
  }

  get(path:string, query?: Object) {
    const requestQuery = {
      language: 'zh-tw',
      ...query,
    }
    const requestPath = `${path}?${encode(requestQuery)}`

    return this.getFetchRequest('GET', requestPath)
  }

}
const authFetch = new AuthFetch()

export default authFetch
