'use client'
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loading indicator
import InputAdornment from '@mui/material/InputAdornment';
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdDeleteOutline  } from "react-icons/md";
import { RiEdit2Line, RiEdit2Fill } from "react-icons/ri";
// Material UI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Icons
import { IoWarningOutline } from "react-icons/io5";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};

const Page = () => {
    const [open, setOpen] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [isHoveredEdit, setIsHoveredEdit] = useState<number | null>(null);
    const [isHoveredDelete, setIsHoveredDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState(true); // State for loading
    const [deleteLoading, setDeleteLoading] = useState(false); // State for loading

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Set loading to true before fetching
            try {
                const result = await axios.get('/api/dormitory');
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        }
        fetchData();
    }, []);

    const deleteDormitory = async (id: number | null) => {
        try {
            setDeleteLoading(true);
            setOpen(null);
            await axios.delete(`/api/dormitory/${id}`);
            setDeleteLoading(false);
            setData(prevData => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting dormitory:', error);
            alert('เกิดข้อผิดพลาดในการลบข้อมูล');
        }
    };

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(data.length / limit);

    // ฟังก์ชันสำหรับกรองข้อมูลตามคำค้นหา
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // คำนวณข้อมูลที่จะใช้ในแต่ละหน้า
    const startIndex = (currentPage - 1) * limit;
    const currentData = filteredData.slice(startIndex, startIndex + limit);

    // ฟังก์ชันสำหรับเปลี่ยนหน้า
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    function isOdd(number: number) {
        return number % 2 !== 0;
    }

    return (
        <div className='container pt-20 md:pt-28 pb-8'>
            {deleteLoading &&
                <span className='flex-center fixed top-0 left-0 h-screen w-screen bg-black/50 z-999'>
                    <CircularProgress />
                </span>
            }
            <Modal
                open={open !== null ? true : false}
                onClose={()=>setOpen(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="bg-base w-[90%] sm:w-[360px] rounded-lg alert z-999">
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }} className='flex-center'>
                        <IoWarningOutline className='text-6xl text-yellow-400'/>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center text-yellow-500 font-bold'>
                        Warning
                    </Typography>
                    <Typography id="modal-modal-description" className='text-center mb-4'>
                        ต้องการลบหอพักนี้หรือไม่?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 10 }} className='text-center'>
                        <Button type='submit' variant='contained' sx={{ color: 'white' }} onClick={()=>deleteDormitory(open)}>ดำเนินการต่อ</Button>
                    </Typography>
                </Box>
            </Modal>
            <div className="card py-4 px-6">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-semibold mb-4'>
                        รายการหอพัก
                    </h1>
                    <TextField 
                        placeholder="ค้นหา..." variant="outlined" className='mb-4 w-40 sm:w-56'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IoSearch/></InputAdornment>,
                        }}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto min-w-[50rem] w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-items text-sm">
                                    <th className="p-2">ลำดับ</th>
                                    <th className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">ชื่อหอพัก</th>
                                    <th className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">ราคา</th>
                                    <th className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">เจ้าของ</th>
                                    <th className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">เบอร์โทรศัพท์</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={item.id} className={`border-table ${!isOdd(index) && 'bg-blue-400/10'}`}>
                                        <td className="p-2 font-semibold">{startIndex + index + 1}</td>
                                        <td className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</td>
                                        <td className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">{item.price}</td>
                                        <td className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">{item.user.firstname} {item.user.lastname}</td>
                                        <td className="p-2 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">{item.phone && 0}{item.phone}</td>
                                        <td className="p-2 pt-[10px] flex justify-end items-center space-x-3">
                                            <Link 
                                                href={`/menage/${item.id}`}
                                                onMouseEnter={() => setIsHoveredEdit(index)}
                                                onMouseLeave={() => setIsHoveredEdit(null)}
                                                className='transition-300 hover:scale-110'
                                            >
                                                {isHoveredEdit === index ? <RiEdit2Fill className="w-5 h-5"/> : <RiEdit2Line className="w-5 h-5"/>}
                                            </Link>
                                            <button
                                                onClick={()=>setOpen(item.id)}
                                                onMouseEnter={() => setIsHoveredDelete(index)}
                                                onMouseLeave={() => setIsHoveredDelete(null)}
                                                className='transition-300 hover:scale-110 hover:text-red-500 cursor-pointer'
                                            >
                                                {isHoveredDelete === index ? <MdDelete className="w-5 h-5"/> : <MdDeleteOutline className="w-5 h-5"/>}
                                            </button>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <label>
                        แสดง:
                        <Select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className='ms-2'
                            size='small'
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                    </label>

                    <div className="flex-y-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="py-2 px-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm
                            hover:opacity-70 hover:scale-95 transition-300"
                            disabled={currentPage === 1}
                        >
                            ย้อนกลับ
                        </button>
                        <span>{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="py-2 px-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm
                            hover:opacity-70 hover:scale-95 transition-300"
                            disabled={currentPage === totalPages}
                        >
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
