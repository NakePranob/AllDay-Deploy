import { makeAutoObservable } from "mobx";
import { validateInput } from "@/function/validateInput";
import { signIn } from "next-auth/react";
import axios from "axios";
import { AlertType } from "@/Types/alert";

class account {
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    showPassword: boolean = false;
    helperText: { [key: string]: string } = {};
    state: boolean = false;
    alert: AlertType = {
        open: false,
        state: '',
        text: '',
        link: null
    };

    constructor() {
        makeAutoObservable(this);
    }

    resetAlert() {
        this.alert.open = false;
        this.alert.state = '';
        this.alert.text = '';
        this.alert.link = null;
    }

    setAlert(alert: AlertType) {
        this.alert = alert;
    }


    setEmail(value: string) {
        this.email = value;
        // ตรวจสอบรูปแบบอีเมลด้วย regex ที่เหมาะสม
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value) && value !== '') {
            this.helperText.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        } else {
            delete this.helperText.email;
        }
    }

    setPassword(value: string) {
        this.password = value;
    }

    setRegisterPassword(value:string) {
        this.password = value;
        if (value.length < 8 && value !== '') {
            this.helperText.password = 'รหัสผ่านต้องมากกว่า 8 ตัว';
        } else if (!validateInput(value)) {    
            this.helperText.password = 'รหัสผ่านควรประกอบด้วย A-z, 0-9 และ !@#$%^&*()';
        } else {
            delete this.helperText.password;
            if (this.confirmPassword !== this.password && value !== '' && this.confirmPassword !== '') {
                this.helperText.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
            } else {
                delete this.helperText.confirmPassword;
            }
        }
    }

    setConfirmPassword(value:string) {
        this.confirmPassword = value;
        if (this.confirmPassword !== this.password && value !== '') {
            this.helperText.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
        } else {
            delete this.helperText.confirmPassword;
        }
    }

    setShowPassword() {
        this.showPassword = !this.showPassword;
    }

    handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    async login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: this.email,
                password: this.password
            })

            if (result?.error) {
                this.setAlert({
                    open: true,
                    state: 'warning',
                    text: result.error,
                    link: null
                });
            } else {
                this.setAlert({
                    open: true,
                    state: 'success',
                    text: 'เข้าสู่ระบบสำเร็จ',
                    link: '/'
                });
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (Object.keys(this.helperText).length === 0) {
            const formData = {
                email: this.email,
                password: this.password,
            }
            try {
                await axios.post('http://localhost:3000/api/auth/sigup', formData);
                this.setAlert({
                    open: true,
                    state: 'success',
                    text: 'สมัครสมาชิกสำเร็จ',
                    link: '/login'
                });
            } catch (error) {
                this.setAlert({
                    open: true,
                    state: 'error',
                    text: 'มีอีเมลนี้ในระบบแล้ว',
                    link: null
                });
            }
                
        }
    }
}

export default new account();