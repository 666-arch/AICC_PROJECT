import { APIInfo, AirtSocketClient, MessageRequest, callback } from "./AirtSocketClient";
export declare type EntityAPIObject<T extends callback<any>> = {
    [apiName: string]: T;
};
export declare type APIS = {
    apis: APISList;
    request: Array<Promise<any>>;
};
export declare type APISList = {
    [key: string]: APISObject;
};
export declare type APISObject = {
    value: APIInfo;
    success: (value: unknown) => void;
    fail: (reason: unknown) => void;
};
export declare const getApisByMsg: (msg: MessageRequest) => {
    apis: APISList;
    requests: Promise<unknown>[];
};
export declare const getVariableType: (variable: unknown) => string;
export declare const handleErrorLog: (str: string) => void;
export declare class Entity {
    apis: Map<string, Function>;
    manager: AirtSocketClient;
    name: string;
    apiStack: Set<callback<any>>;
    constructor(name: string, manager: AirtSocketClient);
    /**
     * @description: 注册 WebAPI
     * @param apiName
     * @param callback
     */
    registerAPI<T extends callback<any>>(apiName: string | EntityAPIObject<T>, callback?: T): void;
    /**
     * @description: 注销 WebAPI
     * @param apiName
     * @param callback
     */
    unregisterAPI(apiName: string | string[]): void;
    /**
     * 内部使用
     * @description: 设置 WebAPI
     * @param apiName
     * @param callback
     */
    setAPI<T extends callback<any>>(apiName: string, callback: T): false | undefined;
    applyWebAPI(msg: MessageRequest): void;
}
