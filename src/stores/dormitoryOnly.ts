import { makeAutoObservable, runInAction, action } from "mobx";
import axios from "axios";
import type { Dormitory, Favorites, Dormitory_img, Dormitory_state } from "@/Types/dormitory";
import { AlertType } from "@/Types/alert";
import { format } from "path";

type OpjDate = {
    date: string
}

class dormitoryOnly {
    loadingState: string | number | null = null;
    data: Dormitory = {} as Dormitory;
    lastImg: number = 0;
    previewImg: Dormitory_img | null = null;
    previewImgList: Dormitory_img[] = [];
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

    // Menage
    setLastImg(count: number) {
        this.lastImg = count;
    }

    setPreviewImg(data: Dormitory_img) {
        this.previewImg = data;
    }

    setPreviewImgList(data: Dormitory_img[]) {
        this.previewImgList = data;
    }

    setDmtId(id: string | null | undefined) {
        this.dmtId = Number(id);
    }

    setReserveState(state: boolean) {
        this.reserveState = state;
    }

    async updateFacilities(key: number, where: string, state: boolean) {
        try {
            const result = await axios.put('/api/dormitory/facilities', {key, where, state})
            return result.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async setFacilities(where: string) {
        this.loadingState = where;  // Set loading state for the current facility
        let result: boolean | null = null;
    
        switch(where) {
            case "wifi":
                result = await this.updateFacilities(this.data.dormitory_state.id, "wifi", !this.data.dormitory_state.wifi);
                if (result) {
                    this.data.dormitory_state.wifi = !this.data.dormitory_state.wifi;
                }
                break;
            case "park_car":
                result = await this.updateFacilities(this.data.dormitory_state.id, "park_car", !this.data.dormitory_state.park_car);
                if (result) {
                    this.data.dormitory_state.park_car = !this.data.dormitory_state.park_car;
                }
                break;
            case "park_motorcycle":
                result = await this.updateFacilities(this.data.dormitory_state.id, "park_motorcycle", !this.data.dormitory_state.park_motorcycle);
                if (result) {
                    this.data.dormitory_state.park_motorcycle = !this.data.dormitory_state.park_motorcycle;
                }
                break;
            case "washing":
                result = await this.updateFacilities(this.data.dormitory_state.id, "washing", !this.data.dormitory_state.washing);
                if (result) {
                    this.data.dormitory_state.washing = !this.data.dormitory_state.washing;
                }
                break;
            case "restaurant":
                result = await this.updateFacilities(this.data.dormitory_state.id, "restaurant", !this.data.dormitory_state.restaurant);
                if (result) {
                    this.data.dormitory_state.restaurant = !this.data.dormitory_state.restaurant;
                }
                break;
            case "store":
                result = await this.updateFacilities(this.data.dormitory_state.id, "store", !this.data.dormitory_state.store);
                if (result) {
                    this.data.dormitory_state.store = !this.data.dormitory_state.store;
                }
                break;
            case "lift":
                result = await this.updateFacilities(this.data.dormitory_state.id, "lift", !this.data.dormitory_state.lift);
                if (result) {
                    this.data.dormitory_state.lift = !this.data.dormitory_state.lift;
                }
                break;
            case "security_door":
                result = await this.updateFacilities(this.data.dormitory_state.id, "security_door", !this.data.dormitory_state.security_door);
                if (result) {
                    this.data.dormitory_state.security_door = !this.data.dormitory_state.security_door;
                }
                break;
            case "keycard":
                result = await this.updateFacilities(this.data.dormitory_state.id, "keycard", !this.data.dormitory_state.keycard);
                if (result) {
                    this.data.dormitory_state.keycard = !this.data.dormitory_state.keycard;
                }
                break;
            case "animal":
                result = await this.updateFacilities(this.data.dormitory_state.id, "animal", !this.data.dormitory_state.animal);
                if (result) {
                    this.data.dormitory_state.animal = !this.data.dormitory_state.animal;
                }
                break;
            case "fitness":
                result = await this.updateFacilities(this.data.dormitory_state.id, "fitness", !this.data.dormitory_state.fitness);
                if (result) {
                    this.data.dormitory_state.fitness = !this.data.dormitory_state.fitness;
                }
                break;
            case "fingerprint":
                result = await this.updateFacilities(this.data.dormitory_state.id, "fingerprint", !this.data.dormitory_state.fingerprint);
                if (result) {
                    this.data.dormitory_state.fingerprint = !this.data.dormitory_state.fingerprint;
                }
                break;
            case "cctv":
                result = await this.updateFacilities(this.data.dormitory_state.id, "cctv", !this.data.dormitory_state.cctv);
                if (result) {
                    this.data.dormitory_state.cctv = !this.data.dormitory_state.cctv;
                }
                break;
            case "security_guard":
                result = await this.updateFacilities(this.data.dormitory_state.id, "security_guard", !this.data.dormitory_state.security_guard);
                if (result) {
                    this.data.dormitory_state.security_guard = !this.data.dormitory_state.security_guard;
                }
                break;
            case "smoke":
                result = await this.updateFacilities(this.data.dormitory_state.id, "smoke", !this.data.dormitory_state.smoke);
                if (result) {
                    this.data.dormitory_state.smoke = !this.data.dormitory_state.smoke;
                }
                break;
            default:
                break;
        }
    
        this.loadingState = null;  // Reset loading state after the operation completes
    }

    setEditName(value: string) {
        if (value !== "" && value.length <= 70) {
            this.data.name = value;
        }
    }

    async updateName() {
        try {
            await axios.put('/api/dormitory', 
                {
                    id: this.data.id, 
                    where:'name', 
                    value: this.data.name
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    setEditEngName(value: string) {
        this.data.engname = value;
    }

    async updateEngName() {
        try {
            await axios.put('/api/dormitory', 
                {
                    id: this.data.id,
                    where:'engname', 
                    value: this.data.engname
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    setEditPrice(value: string) {
        const regex = /^[0-9]*\.?[0-9]+$/;
        if (value === "") {
            this.data.price = 0;
            return false;
        }
        if (regex.test(value)) {
            this.data.price = parseFloat(value);
        }
    }

    async updatePrice() {
        try {
            await axios.put('/api/dormitory', 
                {
                    id: this.data.id,
                    where:'price', 
                    value: this.data.price
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    setEditLocation(value: string, id: number) {
        this.data.location_distance[id].location = value;
    }

    async updateLocation(id: number, key: number) {
        try {
            await axios.put('/api/dormitory/location_distance', 
                {
                    key: id, 
                    where:'location', 
                    value: this.data.location_distance[key].location
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    setEditDistance(value: string, id: number) {
        const regex = /^[0-9]*\.?[0-9]+$/;
        if (value === "") {
            this.data.location_distance[id].distance = 0;
            return false;
        }
        
        if (regex.test(value)) {
            const newValue = parseFloat(value);
    
            // ใช้ toFixed(1) เพื่อให้มีทศนิยมไม่เกิน 1 ตำแหน่ง แล้วแปลงกลับเป็นตัวเลข
            this.data.location_distance[id].distance = parseFloat(newValue.toFixed(1));
        }
    }

    async updateDistance(id: number, key: number) {
        try {
            await axios.put('/api/dormitory/location_distance', 
                {
                    key: id, 
                    where:'distance', 
                    value: this.data.location_distance[key].distance
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async addLocation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const getForm = new FormData(e.currentTarget);
        const data = Object.fromEntries(getForm);
        const formData = {
            id: this.data.id,
            location: data.location,
            distance: Number(data.distance)
        }
        try {
            const result = await axios.post(`/api/dormitory/location_distance`, formData);
            this.data.location_distance.push(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteLocation(id: number) {
        try {
            this.loadingState = id;
            await axios.delete(`/api/dormitory/location_distance/${id}`);
            this.data.location_distance = this.data.location_distance.filter(item => item.id !== id);
            this.loadingState = null;
        } catch (error) {
            console.log(error);
        }
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
                const result = await axios.post(`/api/reserve`, formData);
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
                    const result = await axios.post(`/api/favorite`, formData);

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
                    const result = await axios.delete(`/api/favorite/${existingFavorite.id}`);

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
                const resultLiveat = await axios.get(`/api/liveat/${id}`);
                const resultFavorite = await axios.get(`/api/favorite/${id}`);
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
                    const result = await axios.post(`/api/dormitory/review`, formData);
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
