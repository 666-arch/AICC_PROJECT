import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { AirtSocketClient } from './AirtSocketClient.js';
import SocketContext from './SocketContext.js';

const AirSocketProvider = ({ config, children, }) => {
    const [socket, setSocket] = useState(
    // new AirtSocketClient(config)
    null);
    const [currentConfig, setCurrentConfig] = useState(config);
    useEffect(() => {
        console.log("config change");
        if (JSON.stringify(currentConfig) !== JSON.stringify(config)) {
            socket && socket.socket.disconnect();
            setSocket(new AirtSocketClient(config));
            setCurrentConfig(config);
        }
    }, [config]);
    useEffect(() => {
        console.log("AirSocketProvider init");
        setSocket(new AirtSocketClient(config));
        setCurrentConfig(config);
        return () => {
            socket && socket.socket.disconnect();
            console.log("AirSocketProvider remove");
        };
    }, []);
    // return React.createElement(
    //   SocketContext.Provider,
    //   { value: socket },
    //   children
    // );
    return (jsx(SocketContext.Provider, Object.assign({ value: socket }, { children: socket ? children : null })));
};

export { AirSocketProvider as default };
