'use client'
import { Inter } from 'next/font/google'
import { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { BsSendFill } from "react-icons/bs";
import { TbMapPinSearch } from "react-icons/tb";
import {io} from 'socket.io-client'

const inter = Inter({ subsets: ["latin"] });

type Message = {
    content: string;
    state_chat: boolean;
};

type Props = {
    chatId: number;
    userId: number;
    dmtId: number;
    msg: any; // Define a specific type for msg if possible
};

const Boxmsg = ({ chatId, userId, dmtId, msg }: Props) => {
    const [message, setMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const socket = useMemo(() => io('http://localhost:4000'), []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket.io server');
        });
    
        socket.emit("join-room", chatId);

        socket.on("receive-message", (message) => {
            console.log(message)
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
            socket.off('connect');
            socket.disconnect();
        };
    }, [chatId]);

    useEffect(() => {
        setChatMessages(msg);
    }, [])

    const sendMessage = () => {
        const form = {
            chatId,
            msg: message,
            sender: true,
            read: 'read_user',
        }
        socket.emit("send-message", chatId, form);
        setMessage(""); // เคลียร์ข้อความหลังส่ง
    };


    return (
        <>
            <div className='flex-1 overflow-y-auto flex flex-col justify-end gap-1 pb-6 relative'>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 scale-150 pb-10'>
                    <h1 className={`text-3xl font-bold text-black dark:text-white relative ${inter.className}`}>
                        <TbMapPinSearch className="absolute text-xl -right-4 -bottom-1 text-blue-400"/>
                        ALLDAY
                        <span className="h-[.2rem] w-20 bg-blue-400 rounded-full absolute right-2 -bottom-1"></span>
                    </h1>
                </div>
                {chatMessages.map((item, i) => (
                    <section key={i} className={`xl:px-4 flex ${item.state_chat && 'justify-end'}`}>
                        <div 
                            className={`${item.state_chat 
                                ? 'rounded-r-md rounded-l-2xl bg-blue-400 text-white' 
                                : 'rounded-l-md rounded-r-2xl bg-slate-200 text-black/60 dark:text-white dark:bg-slate-800'}
                                px-4 py-2 font-medium max-w-[50%]`
                            }
                        >
                            {item.content}
                        </div>
                    </section>
                ))}
            </div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }} 
                className='w-full bg-white dark:bg-gray-800  rounded-full p-1 flex gap-4 shadow-sm'
            >
                <TextField 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined" 
                    placeholder='ข้อความ' 
                    size='small' 
                    sx={{
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.03)', // เปลี่ยนเป็นสีที่คุณต้องการ
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.5)', // เปลี่ยนเป็นสีที่ต้องการเมื่อ hover
                            },
                        },
                    }}
                    className='flex-1 bg-slate-100  dark:bg-gray-900'
                />
                <button 
                    type='submit'
                    className='h-full aspect-square rounded-full text-blue-400 text-2xl flex-center me-4
                    transition-300 hover:text-blue-500 hover:scale-105'>
                    <BsSendFill />
                </button>
            </form>
        </>
    )
}

export default Boxmsg