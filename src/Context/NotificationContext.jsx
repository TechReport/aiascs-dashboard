import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from './AuthContext'
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "https://newsroute.herokuapp.com/";

// const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://secret-ridge-42311.herokuapp.com/api/v1/' : 'http://localhost:5400/api/v1/'

const NotificationContext = createContext();
const MINUTE_MS = 10000;

const NotificationContextProvider = (props) => {
    const [notifications, setNotifications] = useState([]);

    const { state } = useContext(AuthContext)
    console.log(state.currentUser)
    async function fetchdata() {
        console.log('called')
        await axios.get('/notifications').then(res => {
            console.log(res.data)
            setNotifications(res.data)
        })

    }

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('Logs every minute');
            if (state.currentUser.role.genericName === 'ROLE_QUALITY_CONTROLLER_ADMIN')
                fetchdata()
        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications }}  >
            {props.children}
        </NotificationContext.Provider>
    );
}

export { NotificationContextProvider, NotificationContext };