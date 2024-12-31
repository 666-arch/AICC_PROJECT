import * as socketIO from 'socket.io-client';

var SocektEvents;
(function (SocektEvents) {
    SocektEvents["QUERY"] = "Query";
    SocektEvents["MSG"] = "Msg";
    SocektEvents["CONNECTION_BROADCAST"] = "ConnectionBroadcast";
    SocektEvents["DISCONNECTION_BROADCAST"] = "DisconnectionBroadcast";
    SocektEvents["QUERY_RESPONSE"] = "QueryResponse";
    SocektEvents["NATIVE_API_RESPONSE"] = "NativeAPIResponse";
    SocektEvents["NATIVE_API_RESPONSE_ASYNC"] = "NativeAPIResponse_Async";
    SocektEvents["WEB_API_RESPONSE"] = "WebAPIResponse";
})(SocektEvents || (SocektEvents = {}));
class AirtSocketClient {
    constructor(config) {
        var _a;
        console.log("AirtSocketClient constructor");
        const { hostname = (_a = window.location.hostname) !== null && _a !== void 0 ? _a : "127.0.0.1", port = "8040", namespace = "/AIRT", UserRole, UserGroup = "AirtChannel", } = config;
        this.UserRole = UserRole;
        this.config = config;
        this.entities = new Map();
        this.socket = socketIO.default(`http://${hostname}:${port}${namespace}`, {
            query: {
                UserRole,
                UserGroup,
            },
            transports: ["websocket"],
        });
        // this.initDefaultConfig();
        this.onWebAPI();
        this.onQuery();
        this.initDevtool();
    }
    initDefaultConfig() {
        this.config = Object.assign(this.config, this.getDefaultConfig());
    }
    getDefaultConfig() {
        var _a;
        return {
            hostname: (_a = window.location.hostname) !== null && _a !== void 0 ? _a : "127.0.0.1",
            port: "8040",
            namespace: "/AIRT",
            UserGroup: "AirtChannel",
            devtool: false,
        };
    }
    /**
     * @description: 初始化 socket io 实例
     */
    initSocketIO() {
        const { hostname, port, namespace, UserRole, UserGroup } = this.config;
        const ioUrl = `http://${hostname}:${port}${namespace}`;
        this.socket = socketIO.default(ioUrl, {
            query: {
                UserRole,
                UserGroup,
            },
            transports: ["websocket"],
        });
    }
    /**
     * @description: 注册页面实体
     */
    registerEntity(entityName, entity) {
        this.entities.set(entityName, entity);
    }
    /**
     * @description: 获取页面实体
     */
    getEntity(entityName) {
        return this.entities.get(entityName);
    }
    formatLog(logName, message) {
        this.config.devtool &&
            console.log("%c[AirtSocketClientDevLog  ".concat(logName, "]"), "color: darkred;", message);
    }
    initDevtool() {
        const that = this;
        this.onConnect((msg) => that.formatLog("onConnect", msg));
        this.onDisconnect((msg) => that.formatLog("onDisconnect", msg));
        this.onWebAPIResponse((msg) => that.formatLog("onWebAPIResponse", msg));
        this.onNativeAPIResponse((msg) => that.formatLog("onNativeAPIResponse", msg));
        this.onNativeAPIResponseAsync((msg) => that.formatLog("onNativeAPIResponseAsync", msg));
    }
    onConnect(callback) {
        return this.on(SocektEvents.CONNECTION_BROADCAST, callback);
    }
    onDisconnect(callback) {
        return this.on(SocektEvents.DISCONNECTION_BROADCAST, callback);
    }
    onNativeAPIResponse(callback) {
        return this.on(SocektEvents.NATIVE_API_RESPONSE, callback);
    }
    onNativeAPIResponseAsync(callback) {
        return this.on(SocektEvents.NATIVE_API_RESPONSE_ASYNC, callback);
    }
    onWebAPIResponse(callback) {
        return this.on(SocektEvents.WEB_API_RESPONSE, callback);
    }
    onQueryResponse(callback) {
        return this.on(SocektEvents.QUERY_RESPONSE, callback);
    }
    /**
     * @description: 查询 entityName 所有调用的 NativeAPI 默认是全部
     * @param {Promise<QueryResponse>} 触发后的回调
     */
    query(entityName) {
        const Entity = entityName !== null && entityName !== void 0 ? entityName : "All";
        this.socket.emit(SocektEvents.QUERY, { Entity });
    }
    // 封装Emit
    airtEmit(message) {
        this.socket.emit(SocektEvents.MSG, message);
    }
    // 监听Msg
    onMsg(callback) {
        this.on(SocektEvents.MSG, callback);
    }
    /**
     * @description: socket 原生事件监听
     */
    on(eventName, callback) {
        const that = this;
        this.socket.on(eventName, callback);
        return function () {
            that.socket.off(eventName, callback);
        };
    }
    // 监听Msg事件一次
    onMsgOnce(callback) {
        this.socket.once(SocektEvents.MSG, callback);
    }
    // 监听WebAPI
    onWebAPI() {
        console.log("Had on Msg");
        const that = this;
        this.onMsg((msg) => {
            const { WebAPI, Entity } = msg;
            console.log("Got Msg from Node:", msg);
            if (WebAPI && that.entities.has(Entity)) {
                const entity = that.getEntity(Entity);
                entity.applyWebAPI(msg);
            }
        });
    }
    // 发送WebAPIResponse
    emitAPIResponse(response) {
        this.formatLog("emitAPIResponse: ", response);
        this.socket.emit(SocektEvents.WEB_API_RESPONSE, response);
    }
    onQuery() {
        const that = this;
        this.on(SocektEvents.QUERY, (msg) => {
            that.config.webApiJson &&
                that.emitQueryResponse(Object.assign({ InvokerInfo: msg.InvokerInfo }, that.config.webApiJson));
        });
    }
    //发送 queryResponse
    emitQueryResponse(response) {
        this.formatLog("emitQueryResponse", response);
    }
}

export { AirtSocketClient, SocektEvents };
