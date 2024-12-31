import * as socketIO from "socket.io-client";
import { Entity } from "./Entity";
export declare const enum SocektEvents {
    QUERY = "Query",
    MSG = "Msg",
    CONNECTION_BROADCAST = "ConnectionBroadcast",
    DISCONNECTION_BROADCAST = "DisconnectionBroadcast",
    QUERY_RESPONSE = "QueryResponse",
    NATIVE_API_RESPONSE = "NativeAPIResponse",
    NATIVE_API_RESPONSE_ASYNC = "NativeAPIResponse_Async",
    WEB_API_RESPONSE = "WebAPIResponse"
}
export declare interface AirtSocketClientConfig {
    /**
     * 端口号
     * default: window.location.hostname || '127.0.0.1'
     */
    hostname?: Location["hostname"];
    /**
     * Is a USVString containing 端口号.
     * default: '8070'
     */
    port?: Location["port"];
    /**
     * 命名空间
     * default: '8070'
     */
    namespace?: string;
    /**
     * 注册角色的名称
     */
    UserRole: string;
    /**
     * 角色分组
     */
    UserGroup?: string;
    /**
     * 是否开启调试
     * default: false
     */
    devtool?: boolean;
    webApiJson?: Omit<QueryResponse, "InvokerInfo">;
}
export declare type callback<T> = (msg: T) => void;
export declare type MessageObject = Record<string, any>;
export interface ConnectMessage {
    bConnected: true;
    ClientsCountTotal: number;
    InvokerInfo: ClientInfo;
    GroupInfo: GroupInfo;
}
export interface GroupInfo {
    Members: Array<ClientInfo>;
    Name: string;
    Size: number;
}
export interface ClientInfo {
    ID: string;
    UserRole: string;
    UserGroup: string;
    IPAddr: string;
}
export interface DisconnectMessage {
    bConnected: false;
    ClientsCountTotal: number;
    GroupInfo: ClientInfo;
    EventBodyRef: object;
    Reason: string;
    InvokerInfo: ClientInfo;
}
export interface APIInfo {
    /**
     * API 描述
     */
    Description?: string;
    /**
     * API 所需参数对象
     * example
     * {
     *  text:''
     * }
     */
    Parms: Record<string, any>;
    /**
     * 异步回传参数对象
     */
    AwaitResult?: Record<string, any>;
    /**
     * 唯一值
     */
    HashCode?: number;
    /**
     * 参数是否会被校验
     */
    ArgsValidation?: boolean;
}
export interface AirtSocketMessage extends MessageObject {
    /**
     * 实体名称
     */
    Entity: string;
    /**
     * UE5端 API 信息
     */
    NativeAPI?: Record<string, APIInfo>;
    /**
     * Web端 API 信息
     */
    WebAPI?: Record<string, APIInfo>;
}
export interface MessageRequest {
    /**
     * 实体名称
     */
    Entity: string;
    /**
     * 客户端信息
     */
    InvokerInfo: ClientInfo;
    /**
     * UE4端 API 信息
     */
    NativeAPI?: Record<string, APIInfo>;
    /**
     * Web端 API 信息
     */
    WebAPI?: Record<string, APIInfo>;
}
export interface APIResponse {
    /**
     * 状态码
     */
    InvokedResponseCode: number;
    /**
     * 请求端信息
     */
    InvokerInfo: ClientInfo;
    /**
     * 请求的响应信息
     */
    Msg: string;
    /**
     * 响应端信息
     */
    ResponderInfo?: ClientInfo;
}
export interface APIFailResponse extends APIResponse {
    /**
     * 请求体的 API 详情
     */
    InvokedFuncRequest?: APIInfo;
    /**
     * 注册函数的 API 详情
     */
    RegisteredFuncInfo?: APIInfo;
}
export interface NativeAPIResponse extends APIFailResponse {
    /**
     * 调用的 NativeAPI 名字
     */
    InvokedNativeAPI: string;
}
export interface NativeAPIResponseAsync extends NativeAPIResponse {
    /**
     * 回传参数
     */
    AwaitResult: string;
}
export interface WebAPIResponse extends APIFailResponse {
    /**
     * 调用的 WebAPI 名字
     */
    InvokedWebAPI: string;
    /**
     * 实体名称
     */
    Entity: string;
}
export interface QueryResponse {
    /**
     * 查询的客户端信息
     */
    InvokerInfo: ClientInfo;
    /**
     * 响应端信息
     */
    ResponderInfo: ClientInfo;
    /**
     * 注册的实体数量
     */
    RegisteredEntityCount: number;
    /**
     * 所有注册的实体的信息集合
     */
    RegisteredEntityInfo: Record<string, RegisteredEntityInfo>;
    /**
     * 唯一值
     */
    RegisteredEntityAllHashCode: number;
    /**
     * 项目名称
     */
    RegisteredProjectName: string;
    /**
     * 是否是WebAPI
     */
    bIsWebAPI: boolean;
}
export interface RegisteredEntityInfo {
    /**
     * 实体名称
     */
    Entity: string;
    /**
     * 实体母类
     */
    EntityClass: string;
    /**
     * 实体注册声明路径
     */
    EntityPath: string;
    /**
     * 最后更新时间
     */
    UpdatedTime: string;
    /**
     * 唯一值
     */
    EntityHashCode: number;
    /**
     * NativeAPI 集合
     */
    NativeAPI?: Record<string, APIInfo>;
    /**
     * WebAPI 集合
     */
    WebAPI?: Record<string, APIInfo>;
}
export declare type AirtSocketClientDefaultConfig = {
    hostname: string;
    port: string;
    namespace: string;
    UserGroup: string;
    devtool: boolean;
};
declare type ApplyWebAPIMessage = {
    apiName: string;
    Parms: Record<string, any>;
};
declare type RegisteredAPIMessage = {
    apiName: string;
    callback: callback<any>;
};
declare type LogMessageType = string | ApplyWebAPIMessage | RegisteredAPIMessage | WebAPIResponse | QueryResponse | ConnectMessage | DisconnectMessage | NativeAPIResponse | NativeAPIResponseAsync;
export declare class AirtSocketClient {
    entities: Map<string, Entity>;
    config: AirtSocketClientConfig;
    socket: socketIO.Socket;
    UserRole: string;
    constructor(config: AirtSocketClientConfig);
    initDefaultConfig(): void;
    getDefaultConfig(): AirtSocketClientDefaultConfig;
    /**
     * @description: 初始化 socket io 实例
     */
    initSocketIO(): void;
    /**
     * @description: 注册页面实体
     */
    registerEntity(entityName: string, entity: Entity): void;
    /**
     * @description: 获取页面实体
     */
    getEntity(entityName: string): Entity | undefined;
    formatLog(logName: string, message: LogMessageType): void;
    initDevtool(): void;
    onConnect(callback: callback<ConnectMessage>): () => void;
    onDisconnect(callback: callback<DisconnectMessage>): () => void;
    onNativeAPIResponse(callback: callback<NativeAPIResponse>): () => void;
    onNativeAPIResponseAsync(callback: callback<NativeAPIResponseAsync>): () => void;
    onWebAPIResponse(callback: callback<WebAPIResponse>): () => void;
    onQueryResponse(callback: callback<QueryResponse>): () => void;
    /**
     * @description: 查询 entityName 所有调用的 NativeAPI 默认是全部
     * @param {Promise<QueryResponse>} 触发后的回调
     */
    query(entityName?: string): void;
    airtEmit(message: AirtSocketMessage): void;
    onMsg(callback: callback<MessageRequest>): void;
    /**
     * @description: socket 原生事件监听
     */
    on(eventName: string, callback: callback<any>): () => void;
    onMsgOnce(callback: callback<MessageRequest>): void;
    onWebAPI(): void;
    emitAPIResponse(response: WebAPIResponse): void;
    onQuery(): void;
    emitQueryResponse(response: QueryResponse): void;
}
export {};
