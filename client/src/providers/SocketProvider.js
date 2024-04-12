import React from 'react'
import { useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
export const useSocket = () => {
    return React.useContext(SocketContext);
}

export const SocketProvider = (props) => {
    const socket = useMemo(() => {
        return io(process.env.REACT_APP_SERVER_HOST);
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    )
};

