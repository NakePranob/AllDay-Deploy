'use client'
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur'

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


type Props = {}

const FormState = observer((props: Props) => {
    return (
        <div className='px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.home}
                    onChange={(e)=>registerEntrepreneur.setState('home', e.target.checked)}
                />} 
                label="บ้านพัก"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.park_car}
                    onChange={(e)=>registerEntrepreneur.setState('park_car', e.target.checked)}
                />} 
                label="ลานจอดรถยนต์"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.park_motorcycle}
                    onChange={(e)=>registerEntrepreneur.setState('park_motorcycle', e.target.checked)}
                />} 
                label="ลานจอดมอเตอร์ไซต์"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.lift}
                    onChange={(e)=>registerEntrepreneur.setState('lift', e.target.checked)}
                />} 
                label="ลิฟท์โดยสาร"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.fingerprint}
                    onChange={(e)=>registerEntrepreneur.setState('fingerprint', e.target.checked)}
                />} 
                label="ระบบลายนิ้วมือ"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.keycard}
                    onChange={(e)=>registerEntrepreneur.setState('keycard', e.target.checked)}
                />} 
                label="ระบบ keycard"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.man}
                    onChange={(e)=>registerEntrepreneur.setState('man', e.target.checked)}
                />} 
                label="ผู้ชายเข้าอยู่ได้"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.female}
                    onChange={(e)=>registerEntrepreneur.setState('female', e.target.checked)}
                />} label="ผู้หญิงเข้าอยู่ได้"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.animal}
                    onChange={(e)=>registerEntrepreneur.setState('animal', e.target.checked)}
                />} 
                label="เลี้ยงสัตว์ได้"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.fitness}
                    onChange={(e)=>registerEntrepreneur.setState('fitness', e.target.checked)}
                />} 
                label="ฟิตเนส"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.wifi}
                    onChange={(e)=>registerEntrepreneur.setState('wifi', e.target.checked)}
                />} 
                label="ฟรี Wi-Fi"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.cctv}
                    onChange={(e)=>registerEntrepreneur.setState('cctv', e.target.checked)}
                />} 
                label="กล้องวงจรปิด"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.smoke}
                    onChange={(e)=>registerEntrepreneur.setState('smoke', e.target.checked)}
                />} 
                label="พื้นที่สูบบุหรี่"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.restaurant}
                    onChange={(e)=>registerEntrepreneur.setState('restaurant', e.target.checked)}
                />} 
                label="ร้านอาหาร"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.store}
                    onChange={(e)=>registerEntrepreneur.setState('store', e.target.checked)}
                />} 
                label="ร้านสะดวกซื้อ"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.washing}
                    onChange={(e)=>registerEntrepreneur.setState('washing', e.target.checked)}
                />} 
                label="เครื่องซักผ้า"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.security_guard}
                    onChange={(e)=>registerEntrepreneur.setState('security_guard', e.target.checked)}
                />} 
                label="เจ้าหน้าที่รักษาความปลอดภัย"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
            <FormControlLabel 
                control={<Checkbox checked={registerEntrepreneur.state.security_door}
                    onChange={(e)=>registerEntrepreneur.setState('security_door', e.target.checked)}
                />} 
                label="ประตูรักษาความปลอดภัย"
                sx={{gridColumn: 'span 1 / span 1', height: '2rem'}}
            />
        </div>
    )
})

export default FormState