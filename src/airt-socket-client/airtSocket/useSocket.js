import { useContext, useMemo } from 'react';
import { handleErrorLog, Entity } from './Entity.js';
import SocketContext from './SocketContext.js';

const useSocket = () => {
    const socket = useContext(SocketContext);
    const entity = useMemo(() => {
        let innerEntity = null;
        if (socket === null) {
            handleErrorLog("useSocket must be uesed in Provider");
        }
        const entityName = socket ? socket.UserRole : "";
        if (entityName === "") {
            handleErrorLog("config.name can not be null");
        }
        if (socket && socket.getEntity(entityName)) {
            innerEntity = socket.getEntity(entityName);
        }
        else if (socket) {
            innerEntity = new Entity(entityName, socket);
        }
        return innerEntity;
    }, [socket]);
    socket && entity && socket.registerEntity(entity.name, entity);
    return socket && entity
        ? {
            socket: socket.socket,
            entity: socket.entities,
            config: socket.config,
            apis: entity.apis,
            manager: entity.manager,
            setAPI: entity.setAPI,
            registerAPI: entity.registerAPI,
            unregisterAPI: entity.unregisterAPI,
            onConnect: socket.onConnect,
            onDisconnect: socket.onDisconnect,
            onQueryResponse: socket.onQueryResponse,
            onNativeAPIResponse: socket.onNativeAPIResponse,
            onNativeAPIResponseAsync: socket.onNativeAPIResponseAsync,
            onWebAPIResponse: socket.onWebAPIResponse,
            query: socket.query,
            airtEmit: socket.airtEmit,
            onMsg: socket.onMsg,
            onMsgOnce: socket.onMsgOnce,
            on: socket.on,
        }
        : null;
};

export { useSocket as default };
