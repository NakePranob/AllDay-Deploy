'use client'
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';


type Props = {}

const RegisterForm = observer((props: Props) => {
    return (
        <div className='p-4 grid grid-cols-2 gap-4'>
            <div className='col-span-2 '>
                <InputLabel htmlFor="address">ที่อยู่หอพัก</InputLabel>
                <TextField id='address' placeholder='บ้านเลขที่ อำเภอ ตำบล จังหวัด รหัสไปรษณีย์' variant="outlined" sx={{width: '100%'}} required
                value={registerEntrepreneur.address} onChange={(e)=>registerEntrepreneur.setAddress(e.target.value)}/>
            </div>
            <div className="col-span-2">
                <TextField label="ชื่อหอพัก" variant="outlined" sx={{width: '100%'}} required
                value={registerEntrepreneur.name} onChange={(e)=>registerEntrepreneur.setName(e.target.value)}/>
            </div>
            <div className="col-span-2">
                <TextField label="ชื่อหอพักภาษาอังกฤษ" variant="outlined" sx={{width: '100%'}}
                value={registerEntrepreneur.engname} onChange={(e)=>registerEntrepreneur.setEngname(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="ราคาเริ่มต้น" variant="outlined" sx={{width: '100%'}} required
                InputProps={{
                    endAdornment: <InputAdornment position="end">บาท</InputAdornment>,
                }}
                value={registerEntrepreneur.price} onChange={(e)=>registerEntrepreneur.setPrice(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="ลิงค์ที่ตั้ง" variant="outlined" sx={{width: '100%'}} required
                value={registerEntrepreneur.location} onChange={(e)=>registerEntrepreneur.setLocation(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="ลิงค์ Facebook" variant="outlined" sx={{width: '100%'}}
                value={registerEntrepreneur.facebook} onChange={(e)=>registerEntrepreneur.setFacebook(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="ลิงค์ Line" variant="outlined" sx={{width: '100%'}}
                value={registerEntrepreneur.line} onChange={(e)=>registerEntrepreneur.setLine(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="ลิงค์เอกสาร" variant="outlined" sx={{width: '100%'}}
                value={registerEntrepreneur.doc} onChange={(e)=>registerEntrepreneur.setDoc(e.target.value)}/>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                <TextField label="เบอร์ติดต่อ" variant="outlined" sx={{width: '100%'}} required
                value={registerEntrepreneur.phone} onChange={(e)=>registerEntrepreneur.setPhone(e.target.value)}/>
            </div>
        </div>
    )
})

export default RegisterForm