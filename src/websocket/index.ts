/**
 * @description 来自DataV的消息体
 */
interface DataVWebSocketMessage {
  /**
   * @description 发送消息标识
   */
  type: string;
  /**
   * @description 这个entity真不是我写的。。。找不到在哪配置
   * @default ""
   */
  entity: string;
  /**
   * @description 也是发送消息标识。。。官方文档说以event判断为准
   */
  event: string;
  /**
   * @description WebSocket节点屏幕id
   */
  source: string;
  /**
   * @description 包含的屏幕数组 用来充当原先Entity
   */
  target?: string[];
  /**
   * @description 触发DataV-WebSocket节点发送消息的节点的数据源，可以自定义
   */
  data: any;
}

export interface AirtSocketMessage {
  /**
   * 实体名称
   */
  Entity: string;
  /**
   * @description 调用API名称：API参数
   */
  [apiName: string]: any;
}

const messageIsFromDataV = (message: DataVWebSocketMessage | AirtSocketMessage): message is DataVWebSocketMessage => {
  return (
    typeof (message as DataVWebSocketMessage).event === "string" &&
    typeof (message as DataVWebSocketMessage).source === "string"
  );
};

class AirtWebSocket {
  ws: WebSocket | null;
  url: string;
  role: string;
  webApiMap: Map<string, Function>;
  udpMap: Map<string, Function>;
  dataVApiMap: Map<string, Function>;
  msgBeforeConnect: Array<string>;
  lockReconnect: boolean;
  timeout: null | number;
  onReceivedUdp: (msg: string) => void;

  constructor(url: string, role: string) {
    this.ws = null;
    this.url = url;
    this.role = role;
    this.webApiMap = new Map();
    this.dataVApiMap = new Map();
    this.udpMap = new Map<string, Function>();
    this.msgBeforeConnect = [];
    this.lockReconnect = false;
    this.timeout = null;
    this.onReceivedUdp = () => {};
  }

  initWebSocket(url?: string) {
    const that = this;
    url && (this.url = url);
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log("websocket is connected");
      // 去重
      Array.from(new Set(that.msgBeforeConnect)).forEach((msg) => that.ws && that.ws.send(msg));
    };
    this.ws.onclose = () => {
      that.reconnect();
    };
    this.onMessage();
  }

  reconnect() {
    if (this.lockReconnect) return;

    this.lockReconnect = true;

    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.initWebSocket();
      this.lockReconnect = false;
    }, 2000);
  }

  isJSON(str: string) {
    if (typeof str == "string") {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }
  onMessage() {
    const that = this;
    this.ws &&
      this.ws.addEventListener("message", (event) => {
        const { data } = event;
        if (that.isJSON(data)) {
          const msg = JSON.parse(data) as AirtSocketMessage | DataVWebSocketMessage;
          // 来自DataV，且target包括此role
          if (messageIsFromDataV(msg)) {
            console.log(`From DataV: ${data}`);

            msg.target &&
              msg.target.includes(that.role) &&
              that.dataVApiMap.has(msg.event) &&
              that.dataVApiMap.get(msg.event)!(msg.data);
          } else if (msg.Entity === that.role) {
            // 来自UE/中控消息, 且Entity为role
            console.log(`From Other Clients: ${data}`);
            const { Entity, ...api } = msg;
            Object.entries(api).forEach(([apiName, params]) => {
              that.webApiMap.has(apiName) && that.webApiMap.get(apiName)!(params);
            });
          } else {
            this.handleUdpMessage(data);
          }
        } else {
          this.handleUdpMessage(data);
        }
      });
  }

  private handleUdpMessage(data: string) {
    const udpAction = this.udpMap.get(data);

    udpAction && udpAction();
    this.onReceivedUdp && this.onReceivedUdp(data);
  }

  /**
   * @description websocket 原生send, 用于给普通发消息
   */
  send(msg: Record<string, any>) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.msgBeforeConnect.push(JSON.stringify(msg));
    }
  }
  registerWebAPI(apiName: string, func: Function) {
    this.webApiMap.set(apiName, func);
  }
  unregisterWebAPI(apiName: string) {
    this.webApiMap.delete(apiName);
  }
  registerDataVAPI(eventName: string, func: Function) {
    this.dataVApiMap.set(eventName, func);
  }
  registerUdpApi(commandName: string, func: Function) {
    this.udpMap.set(commandName, func);
  }
  unregisterDataVAPI(eventName: string) {
    this.dataVApiMap.delete(eventName);
  }
  /**
   * @description 调用UE函数
   */
  callUEFunction() {}

  /**
   * @description 断开连接
   */
  disconnect() {
    this.ws && this.ws.close();
  }

  /**
   * @
   */
  setOnReceivedUdp(callback: (msg: string) => void) {
    this.onReceivedUdp = callback;
  }
}

// const websocket = new AirtWebSocket(`wss://${window.location.hostname}:8080?UserRole=WebClient`, "WebClient");
const websocket = new AirtWebSocket(`ws://localhost:8282?UserRole=WebClient`, "WebClient");
// const websocket = new AirtWebSocket(`wss://192.168.2.219:8070?UserRole=WebClient`, "WebClient");

export default websocket;
