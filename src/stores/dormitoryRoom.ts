import { makeAutoObservable, runInAction, action } from "mobx";
import alerts from "./alerts";
import axios from "axios";
import type { Dormitory_type } from "@/Types/dormitory";
import { AlertType } from "@/Types/alert";

class dormitoryRoom {
    data: Dormitory_type = {} as Dormitory_type;
    loadingState: (string | number)[] = [];
    loadingUpload: boolean = false;
    imageSubmitState: string = '';
    imageSelectEdit: File | null = null;
    imageSelectid: number | null = null;
    previewImg: number | null = null;

    name: string = '';
    quantity: string = '';
    price: string = '';
    width: string = '';
    length: string = '';
    selectedFiles: FileList | null = null;
    previews: string[] = [];
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

    setEditQuantity(value: string) {
        if (!isNaN(Number(value))) {
            this.data.quantity = Number(value);
        }
    }

    setEditOccupied(value: string) {
        if (!isNaN(Number(value))) {
            this.data.occupied = Number(value);
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
        this.loadingState?.push(where);  // Set loading state for the current facility
        let result: boolean | null = null;
    
        switch(where) {
            case "fan":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.fan);
                if (result) {
                    this.data.dormitory_facilitate.fan = !this.data.dormitory_facilitate.fan;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "air":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.air);
                if (result) {
                    this.data.dormitory_facilitate.air = !this.data.dormitory_facilitate.air;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "closet":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.closet);
                if (result) {
                    this.data.dormitory_facilitate.closet = !this.data.dormitory_facilitate.closet;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "water_heater":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.water_heater);
                if (result) {
                    this.data.dormitory_facilitate.water_heater = !this.data.dormitory_facilitate.water_heater;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "table":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.table);
                if (result) {
                    this.data.dormitory_facilitate.table = !this.data.dormitory_facilitate.table;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "dressing_table":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.dressing_table);
                if (result) {
                    this.data.dormitory_facilitate.dressing_table = !this.data.dormitory_facilitate.dressing_table;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "fridge":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.fridge);
                if (result) {
                    this.data.dormitory_facilitate.fridge = !this.data.dormitory_facilitate.fridge;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "bed":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.bed);
                if (result) {
                    this.data.dormitory_facilitate.bed = !this.data.dormitory_facilitate.bed;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            case "tv":
                result = await this.updateFacilities(this.data.dormitory_facilitate.id, where, !this.data.dormitory_facilitate.tv);
                if (result) {
                    this.data.dormitory_facilitate.tv = !this.data.dormitory_facilitate.tv;
                    this.loadingState = this.loadingState.filter(item => item !== where);
                }
                break;
            default:
                break;
        }
    }

    setPreviewImg(id: number | null) {
        this.previewImg = id;
        this.imageSelectid = null;
        this.imageSelectEdit = null;
        this.imageSubmitState = '';
    }

    async deleteRoom() {
        alerts.setAlert({
            open: true,
            state: 'success',
            text: 'ลบประเภทห้องเรียบร้อย',
            link: null
        })
        // try {
        //     await axios.delete(`/api/dormitory/room/${this.data.id}`);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // addroom
    setName = (value: string) => {
        this.name = value;
    }

    setQuantity = (value: string) => {
        if (!isNaN(Number(value))) {
            this.quantity = value;
        }
    }

    setPrice = (value: string) => {
        if (!isNaN(Number(value))) {
            this.price = value;
        }
    }

    setWidth = (value: string) => {
        if (!isNaN(Number(value))) {
            this.width = value;
        }
    }

    setLength = (value: string) => {
        if (!isNaN(Number(value))) {
            this.length = value;
        }
    }

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          this.selectedFiles = event.target.files;
          const filesArray = Array.from(event.target.files);
          const filePreviews = filesArray.map((file) => URL.createObjectURL(file));
          this.previews = filePreviews;
        }
    };

    handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFilesArray = Array.from(event.target.files);
    
            // แปลง selectedFiles ที่มีอยู่เดิมเป็น array
            const currentFilesArray = this.selectedFiles ? Array.from(this.selectedFiles) : [];
    
            // ฟังก์ชันตรวจสอบว่ามีไฟล์นี้อยู่ใน currentFilesArray หรือไม่
            const isDuplicate = (file: File) =>
                currentFilesArray.some(existingFile =>
                    existingFile.name === file.name && existingFile.size === file.size
                );
    
            // กรองไฟล์ใหม่เพื่อเอาเฉพาะไฟล์ที่ยังไม่เคยมีใน currentFilesArray
            const uniqueNewFilesArray = newFilesArray.filter(file => !isDuplicate(file));
    
            if (uniqueNewFilesArray.length > 0) {
                // รวมไฟล์ใหม่ที่ไม่ซ้ำกับไฟล์เดิม
                const updatedFilesArray = [...currentFilesArray, ...uniqueNewFilesArray];
    
                // อัปเดต selectedFiles
                this.selectedFiles = updatedFilesArray as unknown as FileList;
    
                // อัปเดต previews ตามไฟล์ทั้งหมด
                const filePreviews = updatedFilesArray.map(file => URL.createObjectURL(file));
                this.previews = filePreviews;
            } else {
                console.log("All selected files are duplicates.");
            }
        }
    };

    handleRemoveImage = (index: number) => {
        if (this.selectedFiles) {
            const filesArray = Array.from(this.selectedFiles); // แปลง FileList เป็น array
            if (filesArray.length && index >= 0 && index < filesArray.length) {
                filesArray.splice(index, 1); // ลบไฟล์จาก array
            }
            this.selectedFiles = filesArray as unknown as FileList; // เปลี่ยนกลับเป็น FileList (หรือจะใช้ File[] แทนก็ได้)
        }
        this.previews.splice(index, 1); // อัปเดตพรีวิวตามลำดับ
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        if (!this.selectedFiles) return;

        const formData = new FormData();
    
        // เพิ่มไฟล์ทั้งหมดลงใน FormData
        Array.from(this.selectedFiles).forEach((file, index) => {
          formData.append(`images${index}`, file); // 'images' คือ key ที่คุณจะใช้ใน backend
        });
        formData.append('name', this.name);
        formData.append('quantity', this.quantity);
        formData.append('price', this.price);
        formData.append('width', this.width);
        formData.append('length', this.length);
        formData.append('dmtId', id);
    
        try {
            const response = await axios.post('/api/dormitory/room', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
        console.error('Error uploading images:', error);
        }
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