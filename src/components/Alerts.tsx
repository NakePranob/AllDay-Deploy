'use client'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { observer } from 'mobx-react';
import alerts from '@/stores/alerts';

// Material UI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Icons
import { BsCheck2Circle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};

const Alerts = observer(() => {
    const onSubmited = () => {
        if (alerts.state.link !== null) {
            router.push(alerts.state.link)
        }
        alerts.resetAlert()

    }
    const router = useRouter()
    if (alerts.state.open) {
        if (alerts.state.state === 'success') {
            return (
                <Modal
                    open={alerts.state.open}
                    onClose={()=>alerts.resetAlert()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="bg-base w-[90%] sm:w-[360px] rounded-lg alert z-999">
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }} className='flex-center'>
                            <BsCheck2Circle className='text-6xl text-green-500'/>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center text-green-500 font-bold'>
                            Successfully
                        </Typography>
                        <Typography id="modal-modal-description" className='text-center mb-4'>
                            {alerts.state.text}
                        </Typography>
                        { alerts.state.link !== null &&
                            <Typography id="modal-modal-description" sx={{ mt: 10 }} className='text-center'>
                                <Button type='submit' variant='contained' sx={{ color: 'white' }} onClick={onSubmited}>ดำเนินการต่อ</Button>
                            </Typography>
                        }
                    </Box>
                </Modal>
            )
        } else if (alerts.state.state === 'warning') {
            return (
                <Modal
                    open={alerts.state.open}
                    onClose={()=>alerts.resetAlert()}
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
                            {alerts.state.text}
                        </Typography>
                        { alerts.state.link !== null &&
                            <Typography id="modal-modal-description" sx={{ mt: 10 }} className='text-center'>
                                <Button type='submit' variant='contained' sx={{ color: 'white' }} onClick={onSubmited}>ดำเนินการต่อ</Button>
                            </Typography>
                        }
                    </Box>
                </Modal>
            )
        } else {
            return (
                <Modal
                    open={alerts.state.open}
                    onClose={()=>alerts.resetAlert()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="bg-base w-[90%] sm:w-[360px] rounded-lg alert z-999">
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }} className='flex-center'>
                            <MdErrorOutline className='text-6xl text-red-500'/>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                            Error
                        </Typography>
                        <Typography id="modal-modal-description" className='text-center text-red-500 font-bold mb-4'>
                            {alerts.state.text}
                        </Typography>
                        { alerts.state.link !== null &&
                            <Typography id="modal-modal-description" sx={{ mt: 10 }} className='text-center'>
                                <Button type='submit' variant='contained' sx={{ color: 'white' }} onClick={onSubmited}>ดำเนินการต่อ</Button>
                            </Typography>
                        }
                    </Box>
                </Modal>
            )
        }
    }
})

export default Alerts