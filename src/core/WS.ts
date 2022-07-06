export default class WS {
  static __instance: WS;
  protected url: string;
  protected socket: WebSocket | null;
  protected pingInterval: NodeJS.Timer | null;

  constructor() {
    if (WS.__instance) {
      return WS.__instance;
    }

    WS.__instance = this;
    this.socket = null;
    this.pingInterval = null;
  }

  private newSocket(path: string) {
    this.socket = new WebSocket(process.env.WS_ENDPOINT + path);
  }

  getMessages(path: string, dispatch: (data: MessageEvent["data"]) => void) {
    this.newSocket(path);
    this.ping();
    this.socket?.addEventListener('open', () => {
      this.socket?.send(JSON.stringify({type: 'get old', content: '0'}));
    });
    this.socket?.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'pong' && data.type !== 'user connected') {
        dispatch(JSON.parse(event.data));
      }
    });
  }

  ping() {
    this.pingInterval = setInterval(() => {
      this.socket?.send(JSON.stringify({type: 'ping'}));
    }, 30000);
  }

  close() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    this.socket?.close();
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({ type: 'message', content: message }));
  }
}