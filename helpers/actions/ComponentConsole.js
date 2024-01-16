'use client';
import {useEffect} from "react";

const ComponentConsole = async ( data, type ) => {
    // useEffect(() => {
    //     if (process.env.NEXT_PUBLIC_SERVER_SIDE_CONSOLE) {
    // }
    // }, [data]);
    return {
        data,
        type,
    };
};
export default ComponentConsole;