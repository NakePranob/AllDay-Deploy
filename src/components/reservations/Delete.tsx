'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import type { AlertType } from '@/Types/alert'

// Material UI
import Button from '@mui/material/Button'

// Components
import Alert from "@/components/Alert";

const Delete = ({id}: {id: number}) => {
    const router = useRouter();
    const [alert, setAlert] = useState<AlertType>({
        open: false,
        state: '',
        text: '',
        link: null
    });

    const resetAlert = () => {
        if (alert.state !== "error") {
            router.push('/')
        }
        setAlert({
            open: false,
            state: '',
            text: '',
            link: null
        });
    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve/${id}`);
            setAlert({
                open: true,
                state: 'success',
                text: 'ยกเลิกการจองสำเร็จ',
                link: '/'
            })
        } catch (error) {
            console.error(error);
            setAlert({
                open: true,
                state: 'error',
                text: 'เกิดข้อผิดพลาดในการยกเลิกการจอง',
                link: null
            });
        }
    }

    return (
        <>
            <Button onClick={()=>handleDelete(id)} variant="contained" color="error" className="bg-red-500 text-white rounded-full">
                ยกเลิกการจอง
            </Button>
            <Alert open={alert.open} state={alert.state} text={alert.text} 
            link={alert.link} close={resetAlert}/>
        </>
    )
}

export default Delete