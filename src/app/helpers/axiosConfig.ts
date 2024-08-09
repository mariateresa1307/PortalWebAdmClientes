import axios from "axios";
import { redirect } from 'next/navigation'


export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 30 * 1000 ,
  headers: { "Content-Type": "application/json" },
});

export const getToken = () => {
    try {
        
        const session = JSON.parse(localStorage.getItem('ntu-session') ||  '{}');
        
        if(!session.token) throw new Error('Expired session')
        
        return session.token;
    } catch (error) {
        redirect('/')
    }
}