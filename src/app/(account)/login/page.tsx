'use client'
import Image from 'next/image';
import Link from 'next/link';
import { observer } from 'mobx-react';

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
import CircularProgress from '@mui/material/CircularProgress';

// Components
import Alert from '@/components/Alert'

// Icons
import { BsCheck2Circle } from "react-icons/bs";

// Stores
import account from '@/stores/account';
  

const page = observer(() => {
    return (
        <>
            {account.loading &&
                <span className='fixed left-0 top-0 h-screen w-screen bg-black/70 z-999 flex-center'>
                    <CircularProgress/>
                </span>
            }
            <section className="card rounded-t-3xl rounded-b-none sm:rounded-t-md sm:rounded-b-md w-full h-4/5 sm:h-auto sm:w-auto backdrop-blur-lg flex border-0 rounded-md shadow-2xl relative
            transition-all duration-300 ease-in-out">
                <div className="w-[22rem] overflow-hidden rounded-l-md hidden md:block">
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
                <form onSubmit={(e)=>account.login(e)} className="w-full sm:w-96 h-full flex flex-col items-center px-4 py-8 md:p-8">
                    <h1 className='text-xl font-bold mb-8 opacity-80'>เข้าสู่ระบบ</h1>
                    <Box sx={{ width: '100%' }} className="flex flex-col gap-2">
                        <TextField id="email" label="อีเมล" variant="outlined"
                            value={account.email}
                            onChange={(e)=>account.setEmail(e.target.value)}
                            sx={{ width: '100%', marginBottom: account.helperText.email ? '0' : '22.91px' }}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined"
                        className={account.helperText.password ? 'pb-0' : 'pb-[20px]'}>
                            <InputLabel htmlFor="password">รหัสผ่าน</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={account.showPassword ? 'text' : 'password'}
                                label="รหัสผ่าน"
                                value={account.password}
                                onChange={(e)=>account.setPassword(e.target.value)}
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
                        </FormControl>
                        <hr className={`hr-w`}/>
                        <Button type='submit' variant='contained' className='w-full text-white h-12'
                            disabled={account.email.length === 0 || account.password.length === 0 }
                        >
                            ยืนยัน
                        </Button>
                    </Box>
                    <div className='w-full mt-4 text-sm'>
                        <Link href={'#'}>คุณลืมรหัสผ่าน?</Link>
                    </div>
                    <div className='flex-y-center gap-4 text-sm mt-24 sm:mt-14 mb-4'>
                        <Link href={'/'}>กลับสู่หน้าหลัก</Link>
                        <hr className='hr-h h-4'/>
                        <Link href={'/register'}>สมัครสมาชิก</Link>
                    </div>
                </form>
            </section>
        </>
    )
})

export default page