'use client'
import Image from 'next/image';
import Link from 'next/link';
import { observer } from 'mobx-react';

// Components
import Alert from '@/components/Alert'

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// Stores
import account from '@/stores/account';


const page = observer(() => {
    return (
        <>
            <section className="card w-[90%] sm:w-auto backdrop-blur-lg flex border-0 rounded-lg shadow-2xl relative
            transition-all duration-300 ease-in-out">
                <div className="w-[22rem] overflow-hidden rounded-l-lg hidden md:block">
                    <Image
                        src={`/acc.jpg`}
                        alt="list DMT"
                        width={320}
                        height={370}
                        className='h-full w-full
                        object-cover object-center'
                        priority
                    />
                </div>
                <form onSubmit={(e)=>account.register(e)} className="w-full sm:w-96 h-full flex flex-col items-center px-4 py-8 md:p-8">
                    <h1 className='text-xl font-bold mb-8 opacity-80'>สมัครสมาชิก</h1>
                    <Box sx={{ width: '100%' }} className="flex flex-col gap-2">
                        <TextField id="email" label="อีเมล" type='email' variant="outlined" 
                            sx={{ width: '100%', marginBottom: account.helperText.email ? '0' : '22.91px' }}
                            error={account.helperText.email ? true : false}
                            helperText={account.helperText.email ? account.helperText.email : ''}
                            value={account.email}
                            onChange={(e)=>account.setEmail(e.target.value)}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined" error={account.helperText.password ? true : false}
                        className={account.helperText.password ? 'pb-0' : 'pb-[19.91px]'}>
                            <InputLabel htmlFor="password">รหัสผ่าน</InputLabel>
                            <OutlinedInput
                                id="password"
                                error={account.helperText.password ? true : false}
                                type={account.showPassword ? 'text' : 'password'}
                                label="รหัสผ่าน"
                                value={account.password}
                                onChange={(e)=>account.setRegisterPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => account.setShowPassword()}
                                            onMouseDown={account.handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {account.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {account.helperText && <FormHelperText>{account.helperText.password}</FormHelperText>}
                        </FormControl>
                        <FormControl sx={{ width: '100%' }} variant="outlined" error={account.helperText.confirmPassword ? true : false}
                        className={account.helperText.confirmPassword ? 'pb-0' : 'pb-[19.91px]'}>
                            <InputLabel htmlFor="confirmPassword">ยืนยันรหัสผ่าน</InputLabel>
                            <OutlinedInput
                                error={account.helperText.confirmPassword ? true : false}
                                id="confirmPassword"
                                type={account.showPassword ? 'text' : 'password'}
                                label="ยืนยันรหัสผ่าน"
                                value={account.confirmPassword}
                                onChange={(e)=>account.setConfirmPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => account.setShowPassword()}
                                            onMouseDown={account.handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {account.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {account.helperText && <FormHelperText>{account.helperText.confirmPassword}</FormHelperText>}
                        </FormControl>
                        <hr className='hr-w'/>
                        <Button type='submit' variant='contained' className='w-full text-white h-10'
                            disabled={account.email.length === 0 || account.password.length === 0 || account.confirmPassword.length === 0 || 
                            Object.keys(account.helperText).length !== 0}
                        >
                            ยืนยัน
                        </Button>
                    </Box>
                    <div className='flex-y-center gap-4 text-sm mt-9'>
                        <Link href={'/'}>กลับสู่หน้าหลัก</Link>
                        <hr className='hr-h h-4'/>
                        <Link href={'/login'}>เข้าสู่ระบบ</Link>
                    </div>
                </form>
            </section>
            <Alert open={account.alert.open} state={account.alert.state} text={account.alert.text} 
            link={account.alert.link} close={()=>account.resetAlert()}/>
        </>
    )
})

export default page