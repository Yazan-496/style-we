"use client"

import { useEffect } from 'react';
import Cookies from "js-cookie"

const TokenComponent = () => {

    useEffect(() => {
        const tokenCookie = Cookies.get('TOKEN_LOCAL_STORAGE') && JSON.parse(Cookies.get('TOKEN_LOCAL_STORAGE'))
        const tokenLocalStorage = localStorage.getItem('TOKEN_LOCAL_STORAGE')
        if (tokenCookie){
            localStorage.setItem("TOKEN_LOCAL_STORAGE", JSON.stringify(tokenCookie))
        }
        else if (tokenLocalStorage){
            Cookies.set("TOKEN_LOCAL_STORAGE", tokenLocalStorage)
        }
    }, [])
    return (
        <></>
    )
}
export default TokenComponent