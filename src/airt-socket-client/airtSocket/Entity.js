const getVariableType = (variable) => {
    var _a;
    const typeStr = (_a = Object.prototype.toString.call(variable).match(/\[object (.*?)\]/)) === null || _a === void 0 ? void 0 : _a[1];
    return typeStr.toLowerCase();
};
const handleErrorLog = (str) => {
    var errorLog = "[AirtSocketIOClient Error] ".concat(str);
    return console.error(errorLog);
};
class Entity {
    constructor(name, manager) {
        this.name = name;
        this.manager = manager;
        this.apis = new Map();
        this.apiStack = new Set();
    }
    /**
     * @description: 注册 WebAPI
     * @param apiName
     * @param callback
     */
    registerAPI(apiName, callback) {
        const that = this;
        if (typeof apiName === "object") {
            Object.entries(apiName).forEach(([apiName, callback]) => {
                that.setAPI(apiName, callback);
            });
        }
        else if (typeof apiName === "string" && callback) {
            this.setAPI(apiName, callback);
        }
        else if (typeof apiName !== "string") {
            handleErrorLog(`apiName should be string or object, but get ${getVariableType(apiName)}`);
        }
    }
    /**
     * @description: 注销 WebAPI
     * @param apiName
     * @param callback
     */
    unregisterAPI(apiName) {
        const that = this;
        if (Array.isArray(apiName)) {
            apiName.forEach((name) => {
                that.apis.delete(name);
            });
        }
        else if (typeof apiName === "string") {
            that.apis.delete(apiName);
        }
        else {
            handleErrorLog(`apiName should be string or string[], but get${getVariableType(apiName)}`);
        }
    }
    /**
     * 内部使用
     * @description: 设置 WebAPI
     * @param apiName
     * @param callback
     */
    setAPI(apiName, callback) {
        if (getVariableType(callback) !== "function") {
            handleErrorLog(`callback should be function, but get ${getVariableType(callback)}`);
        }
        if (callback === this.apis.get(apiName)) {
            return false;
        }
        if (apiName !== "") {
            this.manager.formatLog("registerAPI", { apiName, callback });
            this.apis.set(apiName, callback);
        }
        else {
            handleErrorLog("apiName is not allowed to be null");
        }
    }
    applyWebAPI(msg) {
        const that = this;
        if (!msg.WebAPI) {
            handleErrorLog("WebAPI is required");
            return;
        }
        Object.entries(msg.WebAPI).forEach(([apiName, value]) => {
            const { Parms } = value;
            let response;
            that.manager.formatLog('applyWebAPI', { apiName, Parms });
            if (that.apis.has(apiName)) {
                that.apis.get(apiName)(Parms);
                const startTime = new Date().getTime();
                const endTime = new Date().getTime();
                response = {
                    Entity: that.name,
                    InvokedWebAPI: apiName,
                    InvokerInfo: msg.InvokerInfo,
                    InvokedResponseCode: 200,
                    Msg: "Entity: ".concat(that.name, ": WebAPI: ").concat(apiName, ", with Params Num ").concat("1", ", TimeCost: ").concat(`${endTime - startTime}`, "ms"),
                };
            }
            else {
                response = {
                    Entity: that.name,
                    InvokedWebAPI: apiName,
                    InvokerInfo: msg.InvokerInfo,
                    InvokedResponseCode: 404,
                    Msg: "Entity: ".concat(that.name, ": WebAPI: ").concat(apiName, ", ").concat(apiName, " is not registered"),
                };
            }
            that.manager.emitAPIResponse(response);
        });
    }
}

export { Entity, getVariableType, handleErrorLog };
