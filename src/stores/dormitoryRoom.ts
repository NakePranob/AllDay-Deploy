import { makeAutoObservable, runInAction, action } from "mobx";
import axios from "axios";
import type { Dormitory_type } from "@/Types/dormitory";
import { AlertType } from "@/Types/alert";

class dormitoryRoom {
    data: Dormitory_type = {} as Dormitory_type;
    loadingState: string | number | null = null;
    loadingUpload: boolean = false;
    imageSubmitState: string = '';
    imageSelectEdit: File | null = null;
    imageSelectid: number | null = null;
    previewImg: number | null = null;
    alert: AlertType = {
        open: false,
        state: '',
        text: '',
        link: null
    };

    constructor() {
        makeAutoObservable(this);
        this.addImage = this.addImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    setData(data: Dormitory_type) {
        this.data = data;
    }

    setEditName(value: string) {
        if (value !== "" && value.length <= 70) {
            this.data.name = value;
        }
    }

    setEditWidth(value: string) {
        if (!isNaN(Number(value))) {
            this.data.width = Number(value);
        }
    }

    setEditLength(value: string) {
        if (!isNaN(Number(value))) {
            this.data.length = Number(value);
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

    handleEditImage = (e: React.ChangeEvent<HTMLInputElement>, state: string) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size <= 5120 * 5120) {
                this.imageSelectEdit = file;
                this.imageSubmitState = state;
                if (this.previewImg !== null) {
                    this.imageSelectid = this.data.dormitory_typeimg[this.previewImg].id;
                    this.previewImg = null;
                }
                console.log('test');
            } else {
                this.setAlert({
                    open: true,
                    state: 'warning',
                    text: 'ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB',
                    link: null
                });
            }
        }
    };

    async addImage() {
        if (!this.imageSelectEdit) {
            console.warn("No image selected or image ID is missing.");
            return false;
        }
    
        const formData = new FormData();
        formData.append("id", this.data.id.toString());
        formData.append("file", this.imageSelectEdit);
        this.loadingUpload = true;
    
        try {
            const result = await axios.post('/api/dormitory/room/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            runInAction(() => {
                this.data.dormitory_typeimg.push(result.data);
                this.previewImg = this.data.dormitory_typeimg.length - 1;
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            return false;
        } finally {
            runInAction(() => {
                // รีเซ็ตสถานะการโหลดและค่าการเลือกภาพหลังจากทำงานเสร็จไม่ว่าจะสำเร็จหรือผิดพลาด
                this.loadingUpload = false;
                this.imageSelectEdit = null;
                this.imageSubmitState = '';
            });
        }
    }

    async updateImage() {
        if (!this.imageSelectEdit || !this.imageSelectid) {
            console.warn("No image selected or image ID is missing.");
            return false;
        }
    
        const formData = new FormData();
        formData.append("id", this.imageSelectid.toString());
        formData.append("file", this.imageSelectEdit);
        this.loadingUpload = true;
    
        try {
            const result = await axios.put('/api/dormitory/room/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            runInAction(() => {
                const index = this.data.dormitory_typeimg.findIndex(item => item.id === this.imageSelectid);
    
                if (index !== -1) {
                    // ถ้าเจอ ID ใน array ให้แทนที่ข้อมูลเดิม
                    this.data.dormitory_typeimg[index] = result.data;
                } else {
                    // ถ้าไม่เจอให้เพิ่มข้อมูลใหม่เข้าไปใน array
                    this.data.dormitory_typeimg.push(result.data);
                }
    
                // กำหนดภาพตัวอย่างตาม index ที่เจอหรือที่เพิ่มใหม่
                this.previewImg = index !== -1 ? index : this.data.dormitory_typeimg.length - 1;
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            return false;
        } finally {
            runInAction(() => {
                // รีเซ็ตสถานะการโหลดและค่าการเลือกภาพหลังจากทำงานเสร็จไม่ว่าจะสำเร็จหรือผิดพลาด
                this.loadingUpload = false;
                this.imageSelectEdit = null;
                this.imageSelectid = null;
                this.imageSubmitState = '';
            });
        }
    }

    async removeImage() {
        if (this.previewImg !== null && typeof this.previewImg === 'number') {
            this.loadingUpload = true;
            try {
                await axios.delete(`/api/dormitory/room/img/${this.data.dormitory_typeimg[this.previewImg].id}`);
                runInAction(() => {
                    if (typeof this.previewImg === 'number') {
                        this.data.dormitory_typeimg.splice(this.previewImg, 1);
                        this.previewImg = 0; // Reset previewImg
                    }
                });
            } catch (error) {
                console.error("Error uploading image:", error);
                return false;
            } finally {
                runInAction(() => {
                    this.loadingUpload = false;
                });
            }
        }
    }

    async updateRoom(id:number, where: string, value: string | number | null | undefined) {
        try {
            await axios.put('/api/dormitory/room', 
                {
                    id,
                    where, 
                    value
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async updateFacilities(key: number, where: string, state: boolean) {
        try {
            const result = await axios.put('/api/dormitory/room/facilities', {key, where, state})
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
            case "fan":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.fan);
                if (result) {
                    this.data.dormitory_facilitate.fan = !this.data.dormitory_facilitate.fan;
                }
                break;
            case "air":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.air);
                if (result) {
                    this.data.dormitory_facilitate.air = !this.data.dormitory_facilitate.air;
                }
                break;
            case "closet":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.closet);
                if (result) {
                    this.data.dormitory_facilitate.closet = !this.data.dormitory_facilitate.closet;
                }
                break;
            case "water_heater":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.water_heater);
                if (result) {
                    this.data.dormitory_facilitate.water_heater = !this.data.dormitory_facilitate.water_heater;
                }
                break;
            case "table":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.table);
                if (result) {
                    this.data.dormitory_facilitate.table = !this.data.dormitory_facilitate.table;
                }
                break;
            case "dressing_table":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.dressing_table);
                if (result) {
                    this.data.dormitory_facilitate.dressing_table = !this.data.dormitory_facilitate.dressing_table;
                }
                break;
            case "fridge":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.fridge);
                if (result) {
                    this.data.dormitory_facilitate.fridge = !this.data.dormitory_facilitate.fridge;
                }
                break;
            case "bed":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.bed);
                if (result) {
                    this.data.dormitory_facilitate.bed = !this.data.dormitory_facilitate.bed;
                }
                break;
            case "tv":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.tv);
                if (result) {
                    this.data.dormitory_facilitate.tv = !this.data.dormitory_facilitate.tv;
                }
                break;
            default:
                break;
        }
    
        this.loadingState = null;  // Reset loading state after the operation completes
    }

    setPreviewImg(id: number | null) {
        this.previewImg = id;
        this.imageSelectid = null;
        this.imageSelectEdit = null;
        this.imageSubmitState = '';
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
}

export default new dormitoryRoom();