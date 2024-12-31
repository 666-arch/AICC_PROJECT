import React from "react";
import { AirtSocketClientConfig } from "./AirtSocketClient";
export interface AirSocketProviderProps {
    config: AirtSocketClientConfig;
    children?: React.ReactNode;
}
declare const AirSocketProvider: React.FC<AirSocketProviderProps>;
export default AirSocketProvider;
