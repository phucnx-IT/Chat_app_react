import { Spin } from 'antd';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';

export const AuthContext = createContext();

export default function AuthProvider({children}) {
        const [userData, setUserData]=useState({});
        const [isLoading, setIsLoading]=useState(true);
        const navigate = useNavigate();
        useEffect(()=>{
                const unsubscribed= auth.onAuthStateChanged((user)=>{
                        if (user) {
                                const {displayName, email, uid, photoURL}=user;
                                setUserData({displayName,email, uid, photoURL})
                                setIsLoading(false)
                                return navigate('/');
                        }
                        setIsLoading(false)
                        navigate('/login')
                })
                return ()=>{
                        unsubscribed();
                }
        },[navigate])
        return (
                <AuthContext.Provider value={userData}>
                        {isLoading?<Spin></Spin>:children}
                </AuthContext.Provider>
        )
}
