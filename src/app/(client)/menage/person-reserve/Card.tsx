'use client';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    data: any;
};

type Dormitory = {
    id: number;
    name: string;
};

type DormitoryType = {
    name: string;
    dormitory: Dormitory;
};

type User = {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string;
    phone: string | null;
    profile: string;
};

type ReserveItem = {
    id: number;
    date: string;
    dormitory_type: DormitoryType;
    user: User;
};

const Card = ({ data }: Props) => {
    const [isHoveredDelete, setIsHoveredDelete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState(data); // Add state to store items

    const deleteReserve = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`/api/reserve/${id}`);
            setItems(items.filter((item: ReserveItem) => item.id !== id)); // Update state after deletion
            
            setLoading(false);
        } catch (error) {
            console.error('Error deleting reserve:', error);
            setLoading(false);
        }
    };

    const confirmLiveAt = async (userId: number, dmtId: number, reserveId: number) => {
        try {
            setLoading(true);
            await axios.post(`/api/liveat`, { userId, dmtId });
            setItems(items.filter((item: ReserveItem) => item.id !== reserveId)); // Correctly filter out the item by reserveId
            
            setLoading(false);
        } catch (error) {
            console.error('Error confirming live at:', error);
            setLoading(false);
        }
    };

    return (
        <>
            {items.map((item: any, key: number) => (
                <div
                    key={item.id}
                    className="card p-6 h-52 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg"
                >
                    <span className="w-44 h-56 rounded-2xl bg-blue-400/20 rotate-45 absolute -left-16 -top-10"></span>
                    <span className="w-56 h-80 rounded-2xl bg-blue-400/10 rotate-45 absolute -left-16 -top-10"></span>
                    {loading && (
                        <span className="w-full h-full left-0 top-0 absolute bg-black/50 z-20 flex-center">
                            <CircularProgress />
                        </span>
                    )}

                    {/* Avatar and User Info */}
                    <div className="overflow-hidden pr-2 flex items-center gap-4 relative z-10">
                        <Avatar
                            alt={`${item.user.firstname} ${item.user.lastname}`}
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profire/${item.user.profile}`}
                            sx={{ width: 56, height: 56, border: '2px solid white' }}
                        />
                        <div>
                            <p className="font-semibold text-lg text-gray-800">
                                {item.user.firstname + ' ' + item.user.lastname}
                            </p>
                            <span className="opacity-70 text-xs">
                                จะเข้าดูหอพักวันที่: {item.date}
                            </span>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="text-xs mt-3 px-4 py-1 bg-black/20 w-28 text-center font-semibold text-white rounded-md relative z-10">
                        {item.user.phone}
                    </div>

                    {/* Room Type and Dormitory */}
                    <div className="absolute right-4 bottom-16 flex flex-col items-end opacity-80">
                        <b className="font-semibold text-gray-600 text-sm">ประเภทห้อง: {item.dormitory_type.name}</b>
                        <b className="text-xs text-gray-500">{item.dormitory_type.dormitory.name}</b>
                    </div>

                    {/* Buttons */}
                    <div className="absolute right-4 bottom-4 flex items-center gap-3">
                        <button
                            onClick={() => deleteReserve(item.id)}
                            className="rounded-full bg-red-500 dark:bg-white dark:text-black text-white hover:bg-red-600 text-2xl h-[38px] flex-center aspect-square shadow-md transition-transform transform hover:scale-95"
                            onMouseEnter={() => setIsHoveredDelete(true)}
                            onMouseLeave={() => setIsHoveredDelete(false)}
                        >
                            {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                        </button>
                        <Button
                            onClick={() => confirmLiveAt(item.user.id, item.dormitory_type.dormitory.id, item.id)}
                            variant="contained"
                            className="rounded-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 shadow-md"
                        >
                            ยืนยันการเข้าอยู่
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
