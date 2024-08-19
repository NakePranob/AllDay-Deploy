import { makeAutoObservable, runInAction, action } from "mobx";
import axios from "axios";
import type { Dormitory, Favorites } from "@/Types/dormitory";
import { AlertType } from "@/Types/alert";

type OpjDate = {
    date: string
}

class dormitoryOnly {
    data: Dormitory = {} as Dormitory;
    open: boolean = false;
    dmtId: number = 0;
    FavoriteState: boolean = false;
    favoriteList: Favorites[] = [];
    formReserve = {
        id: 0 as number,
        dateList: [] as OpjDate[]
    }
    reserveState: boolean = false;
    targetOverview: React.RefObject<HTMLElement> | undefined;
    targetState: React.RefObject<HTMLElement> | undefined;
    targetRoom: React.RefObject<HTMLElement> | undefined;
    targetReview: React.RefObject<HTMLElement> | undefined;
    alert: AlertType = {
        open: false,
        state: '',
        text: '',
        link: null
    };

    constructor() {
        makeAutoObservable(this, {
            setFavoriteList: action.bound,  // Ensure favoriteList is updated through an action
        });
    }

    setDmtId(id: string | null | undefined) {
        this.dmtId = Number(id);
    }

    setReserveState(state: boolean) {
        this.reserveState = state;
    }

    async addReserve(e: React.FormEvent<HTMLFormElement>, userId: number | null | undefined, roomId: number | null | undefined) {
        e.preventDefault();
        if (userId && roomId) {
            const getForm = new FormData(e.currentTarget);
            const data = Object.fromEntries(getForm);
            const formData = {
                day: data.day,
                month: data.month,
                year: data.year,
                userId: Number(userId),
                dmt_typeId: roomId
            }
            try {
                console.log(formData);
                const result = await axios.post(`https://all-day-deploy.vercel.app/api/reserve`, formData);
                this.setAlert({
                    open: true,
                    state: 'success',
                    text: 'จองสำเร็จ',
                    link: null
                });
            } catch (error) {
                this.setAlert({
                    open: true,
                    state: 'error',
                    text: 'คุณได้ทำการจองหอพักไปแล้ว',
                    link: null
                })
            }
        } else {
            this.setAlert({
                open: true,
                state: 'warning',
                text: 'กรุณาเข้าสู่ระบบ',
                link: '/login'
            })
        }

    }

    async getReserve() {
        // Implement get reserve logic here
    }

    setFormReserve(id: number) {
        this.formReserve.id = id;
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

    setData(data: Dormitory) {
        this.data = data;
    }

    setOpen(state: boolean) {
        this.open = state;
    }

    scrollToOverview() {
        if (this.targetOverview?.current) {
            const element = this.targetOverview.current;
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    }

    scrollToState() {
        if (this.targetState?.current) {
            const element = this.targetState.current;
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    }

    scrollToRoom() {
        if (this.targetRoom?.current) {
            const element = this.targetRoom.current;
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    }

    scrollToReview() {
        if (this.targetReview?.current) {
            const element = this.targetReview.current;
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    }

    checkFavoriteList() {
        // ตรวจสอบว่า favoriteList เป็นอาร์เรย์และมี method some() หรือไม่
        if (Array.isArray(this.favoriteList)) {
            const isFavorite = this.favoriteList.some(item => item.dmtId === this.dmtId);
            this.setFavoriteState(isFavorite);
        } else {
            // console.error('favoriteList is not an array');
            console.log('Error', this.favoriteList);
        }
    }

    setFavoriteState(state: boolean) {
        this.FavoriteState = state;
    }

    setFavoriteList(data: Favorites[]) {
        runInAction(() => {
            this.favoriteList = data;
            console.log(this.favoriteList);
        });
    }

    async addFavorite(dmtId: number | null | undefined, userId: number | null | undefined) {
        try {
            if (dmtId && userId) {
                // ตรวจสอบว่า favorite ถูกเพิ่มไปแล้วหรือไม่
                const existingFavorite = this.favoriteList.find(item => item.dmtId === dmtId);
                console.log(existingFavorite, this.favoriteList);

                if (!existingFavorite) {
                    // เพิ่ม favorite
                    const formData = { dmtId, userId };
                    const result = await axios.post(`https://all-day-deploy.vercel.app/api/favorite`, formData);

                    runInAction(() => {
                        console.log(result.data);
                        this.favoriteList.push(result.data);  // อัพเดทรายการโปรดหลังจากเพิ่ม
                        this.setFavoriteState(true);  // ตั้งสถานะ FavoriteState เป็น true
                    });

                    this.setAlert({
                        open: true,
                        state: 'success',
                        text: 'ทำการเพิ่มรายการโปรด',
                        link: null
                    });
                } else {
                    // ลบ favorite
                    const result = await axios.delete(`https://all-day-deploy.vercel.app/api/favorite/${existingFavorite.id}`);

                    runInAction(() => {
                        console.log(result.data);
                        this.favoriteList = this.favoriteList.filter(item => item.dmtId !== 2); // อัพเดทรายการโปรดหลังจากลบ
                        this.setFavoriteState(false);  // ตั้งสถานะ FavoriteState เป็น false
                    });

                    this.setAlert({
                        open: true,
                        state: 'success',
                        text: 'ทำการยกเลิกรายการโปรด',
                        link: null
                    });
                }
            } else {
                // กรณีที่ยังไม่ได้เข้าสู่ระบบ
                this.setAlert({
                    open: true,
                    state: 'warning',
                    text: 'กรุณาเข้าสู่ระบบ',
                    link: '/login'
                });
            }
        } catch (error) {
            // จัดการข้อผิดพลาด
            this.setAlert({
                open: true,
                state: 'error',
                text: 'มีบางอย่างผิดพลาด',
                link: null
            });
            console.log(error);
        }
    }

    async getUserState(id: number | null | undefined) {
        try {
            if (id) {
                const resultLiveat = await axios.get(`https://all-day-deploy.vercel.app/api/liveat/${id}`);
                const resultFavorite = await axios.get(`https://all-day-deploy.vercel.app/api/favorite/${id}`);
                runInAction(() => {
                    this.setFavoriteList(resultFavorite.data);
                });
                return resultLiveat.data;
            }
        } catch (error) {
            return false;
        }
    }

    async review(e: React.FormEvent<HTMLFormElement>, id: number | null | undefined) {
        e.preventDefault();
        try {
            if (id) {
                const getForm = new FormData(e.currentTarget);
                const formData = Object.fromEntries(getForm);
                formData.dmtId = this.data.id.toString();
                formData.userId = id.toString();
                if (formData.rating !== '') {
                    const result = await axios.post(`https://all-day-deploy.vercel.app/api/dormitory/review`, formData);
                    runInAction(() => {
                        this.data.review.push(result.data.review);
                        this.data.reviewScore = result.data.totalScore;
                    });
                    this.setOpen(false);
                    this.setAlert({
                        open: true,
                        state: 'success',
                        text: 'รีวิวสำเร็จ',
                        link: null
                    });
                } else {
                    this.setAlert({
                        open: true,
                        state: 'warning',
                        text: 'กรุณากำหนดคะแนน',
                        link: null
                    });
                }
            }
        } catch (error) {
            this.setAlert({
                open: true,
                state: 'error',
                text: 'มีบางอย่างผิดพลาด',
                link: null
            });
            console.log(error);
        }
    }
}

export default new dormitoryOnly();
