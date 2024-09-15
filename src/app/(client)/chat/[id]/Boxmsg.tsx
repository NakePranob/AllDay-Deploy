'use client'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { BsSendFill } from "react-icons/bs";
import io from 'socket.io-client';

type Message = {
    // Define the structure of a message here
    id: number;
    text: string;
    sender: number; // Assuming sender is a user ID or similar
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

    useEffect(() => {
        // Create a socket connection
        const socket = io();

        // Join the room
        socket.emit("join-room", chatId);

        // Listen for incoming messages
        socket.on('message', (message: Message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [chatId]);


    return (
        <>
            <div className='flex-1 overflow-y-auto flex flex-col justify-end gap-1 pb-6'>
                <section className='xl:px-4 flex'>
                    <div className='rounded-l-md rounded-r-2xl
                    px-4 py-2 bg-slate-400 text-white font-medium max-w-[50%]'>
                        มีหอว่างบ่หำ มีหอว่างบ่หำ มีหอว่างบ่หำมีหอว่างบ่หำมีหอว่างบ่หำ
                    </div>
                </section>
                <section className='xl:px-4 flex'>
                    <div className='rounded-l-md rounded-r-2xl
                    px-4 py-2 bg-slate-400 text-white font-medium max-w-[50%]'>
                        มีหอว่างบ่หำ
                    </div>
                </section>
                <section className='xl:px-4 flex justify-end'>
                    <div className='rounded-r-md rounded-l-2xl
                    px-4 py-2 bg-blue-400 text-white font-medium max-w-[50%]'>
                        มีหอว่างบ่หำ
                    </div>
                </section>
            </div>
            <form 
                className='w-full bg-white dark:bg-white  rounded-full p-1 flex gap-4 shadow-sm'
            >
                <TextField 
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
                    className='flex-1 bg-slate-100 dark:bg-gray-800'
                />
                <button className='h-full aspect-square rounded-full text-blue-400 text-2xl flex-center me-4
                    transition-300 hover:text-blue-500 hover:scale-105'>
                    <BsSendFill />
                </button>
            </form>
        </>
    )
}

export default Boxmsg