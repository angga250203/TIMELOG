"use client"

import { useRef } from "react"
import { Ilog, useLogStore } from "../hooks";

export default function InitLog({logs}: {logs : Ilog[]}){
    const initRef  = useRef<boolean>();

    const prepareLog = () => {
        const result:{
            [key: string]: Ilog;
        }={}

        logs.forEach((log) => {
            result[ log.date as string ] = {...log, date: new Date(log.date)};
        });

        return result;
    }
 
    if (!initRef.current){
        useLogStore.setState({
            logs:prepareLog()
        });


        initRef.current = true
    }

    return null


}