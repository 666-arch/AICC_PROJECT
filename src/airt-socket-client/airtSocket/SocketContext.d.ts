import React from "react";
import { AirtSocketClient } from "./AirtSocketClient";
declare const SocketContext: React.Context<AirtSocketClient | null>;
export default SocketContext;
