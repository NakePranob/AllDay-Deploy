import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import axios from "axios";
import type { Image, TypeRoom, Dormitory_state, Location_distance } from "@/Types/registerEntrepreneur";
import { AlertType } from "@/Types/alert";


function LastId(objects: any[]) {
    if (objects.length === 0) {
        return 0;
    } else {
        const maxId = Math.max(...objects.map(obj => obj.id));
        return maxId + 1;
    }
}

class RegisterEntrepreneur {
    progress: number = 0;
    buffer: number = 10;
    name: string = '';
    engname: string = '';
    price: string = '';
    address: string = '';
    location: string = '';
    facebook: string = '';
    line: string = '';
    doc: string = '';
    phone: string = '';
    imageSelect: File | null = null;
    typeRoomName: string = '';
    typeRoomPrice: string = '';
    typeRoomQuantity: string = '';
    typeRoomWidth: string = '';
    typeRoomLength: string = '';
    locationName: string = '';
    locationDistance: string = '';

    locationDistanceList: Location_distance[] = [];

    state: Dormitory_state = {
        home: false,
        park_car: false,
        park_motorcycle: false,
        lift: false,
        security_door: false,
        fingerprint: false,
        keycard: false,
        man: false,
        female: false,
        animal: false,
        fitness: false,
        wifi: false,
        cctv: false,
        security_guard: false,
        smoke: false,
        restaurant: false,
        store: false,
        washing: false,
    };

    imageList: Image[] = [];

    typeRoomList: TypeRoom[] = [];

    home: boolean = false;
    park_car: boolean = false;
    park_motorcycle: boolean = false;
    lift: boolean = false;
    fingerprint: boolean = false;
    keycard: boolean = false;
    man: boolean = false;
    female: boolean = false;
    animal: boolean = false;
    fitness: boolean = false;
    wifi: boolean = false;
    cctv: boolean = false;
    security_guard: boolean = false;
    smoke: boolean = false;
    restaurant: boolean = false;
    store: boolean = false;
    washing: boolean = false;
    security_door: boolean = false;

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

    setImageSelect (event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.size <= 1024 * 1024) {
            this.imageSelect = file;
        } else {
            this.setAlert({
                open: true,
                state: 'warning',
                text: 'ไฟล์รูปภาพต้องมีขนาดไม่เกิน 1MB',
                link: null
            });
            return false;
        }
    }

    setImageTypeRoom (event: ChangeEvent<HTMLInputElement>, id: number) {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.size <= 1024 * 1024) {
            this.typeRoomList[id].imageSelect = file;
        } else {
            this.setAlert({
                open: true,
                state: 'warning',
                text: 'ไฟล์รูปภาพต้องมีขนาดไม่เกิน 1MB',
                link: null
            });
            return false;
        }
    }

    addImageList () {
        if (this.imageSelect) {
            this.imageList.push({
                imgFile: this.imageSelect,
            });
            this.imageSelect = null;
        }
    }

    addImageTypeRoomList (id: number) {
        if (this.typeRoomList[id].imageSelect) {
            this.typeRoomList[id].room_img.push({
                imgFile: this.typeRoomList[id].imageSelect,
            });
            console.log(this.typeRoomList[id]);
            this.typeRoomList[id].imageSelect = null;
        }
    }

    removeImage (id: number) {
        this.imageList.splice(id, 1);
    }

    removeImageTypeRoom (id: number, index: number) {
        this.typeRoomList[id].room_img.splice(index, 1);
    }

    removeTypeRoom (id: number) {
        this.typeRoomList.splice(id, 1);
    }

    addTypeRoom () {

        if (this.typeRoomName && this.typeRoomPrice && this.typeRoomQuantity && this.typeRoomWidth && this.typeRoomLength) {
            this.typeRoomList.push({
                name: this.typeRoomName,
                price: this.typeRoomPrice,
                quantity: this.typeRoomQuantity,
                width: this.typeRoomWidth,
                length: this.typeRoomLength,
                imageSelect: null,
                room_img: [],
                facilitate: {
                    fan: false,
                    air: false,
                    closet: false,
                    water_heater: false,
                    table: false,
                    dressing_table: false,
                    fridge: false,
                    bed: false,
                    tv: false,
                },
            })
            console.log('addTypeRoom',this.typeRoomList);
        }
        this.typeRoomName = '';
        this.typeRoomPrice = '';
        this.typeRoomQuantity = '';
        this.typeRoomWidth = '';
        this.typeRoomLength = '';
    }

    setState (key: string, value: boolean) {
        if (key === 'home') {
            this.state.home = value;
        } else if (key === 'park_car') {
            this.state.park_car = value;
        } else if (key === 'park_motorcycle') {
            this.state.park_motorcycle = value;
        } else if (key === 'lift') {
            this.state.lift = value;
        } else if (key === 'security_door') {
            this.state.security_door = value;
        } else if (key === 'fingerprint') {
            this.state.fingerprint = value;
        } else if (key === 'keycard') {
            this.state.keycard = value;
        } else if (key === 'man') {
            this.state.man = value;
        } else if (key === 'female') {
            this.state.female = value;
        } else if (key === 'animal') {
            this.state.animal = value;
        } else if (key === 'fitness') {
            this.state.fitness = value;
        } else if (key === 'wifi') {
            this.state.wifi = value;
        } else if (key === 'cctv') {
            this.state.cctv = value;
        } else if (key === 'security_guard') {
            this.state.security_guard = value;
        } else if (key === 'smoke') {
            this.state.smoke = value;
        } else if (key === 'restaurant') {
            this.state.restaurant = value;
        } else if (key === 'store') {
            this.state.store = value;
        } else if (key === 'washing') {
            this.state.washing = value;
        }
    }

    setFacilitate (id: number, key: string, value: boolean) {
        if (key === 'fan') {
            this.typeRoomList[id].facilitate.fan = value;
        } else if (key === 'air') {
            this.typeRoomList[id].facilitate.air = value;
        } else if (key === 'closet') {
            this.typeRoomList[id].facilitate.closet = value;
        } else if (key === 'water_heater') {
            this.typeRoomList[id].facilitate.water_heater = value;
        } else if (key === 'table') {
            this.typeRoomList[id].facilitate.table = value;
        } else if (key === 'dressing_table') {
            this.typeRoomList[id].facilitate.dressing_table = value;
        } else if (key === 'fridge') {
            this.typeRoomList[id].facilitate.fridge = value;
        } else if (key === 'bed') {
            this.typeRoomList[id].facilitate.bed = value;
        } else if (key === 'tv') {
            this.typeRoomList[id].facilitate.tv = value;
        }
    }

    async submitForm (id: number | null | undefined) {
        if (id) {
            const formData = new FormData();
            formData.append("userId", id.toString());
            formData.append("name", this.name);
            formData.append("engname", this.engname);
            formData.append("price", this.price);
            formData.append("address", this.address);
            formData.append("location", this.location);
            formData.append("facebook", this.facebook);
            formData.append("line", this.line);
            formData.append("doc", this.doc);
            formData.append("phone", this.phone);
            formData.append("state", JSON.stringify(this.state));
            formData.append("locationDistanceList", JSON.stringify(this.locationDistanceList));
            formData.append("typeRoomList", JSON.stringify(this.typeRoomList));
            if (this.imageList.length > 0) {
                this.imageList.forEach((image, index) => {
                    formData.append(`images[${index}]`, image.imgFile);
                });
            }
            if (this.typeRoomList.length > 0) {
                console.log("test");
                this.typeRoomList.forEach((typeRoom, index) => {
                    // console.log(typeRoom.room_img);
                    typeRoom.room_img.forEach((img, index2) => {
                        console.log(`room_img[${index}].imgFile[${index2}]`);
                        formData.append(`room_img[${index}].imgFile[${index2}]`, img.imgFile);
                    })
                });
            }
            try {
                const self = this;
                const response = await axios.post('http://localhost:3000/api/entrepreneur/register', formData, {
                    onUploadProgress(progressEvent) {
                        if (progressEvent.progress) {
                            const percentCompleted = (progressEvent.progress)*100;
                            const diff = Math.random() * 10;
                            const diff2 = Math.random() * 10;
                            self.setProgress(percentCompleted + diff);
                            self.setBuffer(percentCompleted + diff + diff2);
                        }
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                this.setProgress(0)
                this.setBuffer(10);
                this.setAlert({
                    open: true,
                    state: 'success',
                    text: 'ลงทะเบียนสำเร็จทางทีมงานจะเดินทางไปที่หอพักของทาน เพื่อตรวจสอบที่พักภายใน 7 วัน',
                    link: '/'
                });
                this.name = '';
                this.price = '';
                this.location = '';
                this.facebook = '';
                this.line = '';
                this.doc = '';
                this.phone = '';
                this.state = {} as Dormitory_state;
                this.imageList = [];
                this.typeRoomList = [];
            } catch (error) {
                this.setAlert({
                    open: true,
                    state: 'error',
                    text: 'มีบางอย่างผิดพลาด',
                    link: null
                });
                // console.error('Error uploading files:', error);
            }
        } else {
            this.setAlert({
                open: true,
                state: 'warning',
                text: 'กรุณาเข้าสู่ระบบ',
                link: null
            });
        }
    }

    setBuffer (value: number) {
        this.buffer = value;
    }

    setProgress (value: number) {
        this.progress = value;
    }

    setName (value: string) {
        this.name = value;
    }

    setEngname (value: string) {
        this.engname = value;
    }

    setPrice (value: string) {
        if (!isNaN(Number(value))) {
            this.price = value;
        }
    }

    setAddress (value: string) {
        this.address = value;
    }

    setLocation (value: string) {
        this.location = value;
    }

    setFacebook (value: string) {
        this.facebook = value;
    }

    setLine (value: string) {
        this.line = value;
    }

    setDoc (value: string) {
        this.doc = value;
    }

    setPhone (value: string) {
        if (!isNaN(Number(value))) {
            this.phone = value;
        }
    }

    setTypeRoomName (value: string) {
        this.typeRoomName = value;
    }

    setTypeRoomPrice (value: string) {
        if (!isNaN(Number(value))) {
            this.typeRoomPrice = value;
        }
    }

    setTypeRoomQuantity (value: string) {
        if (!isNaN(Number(value))) {
            this.typeRoomQuantity = value;
        }
    }

    setTypeRoomWidth (value: string) {
        if (!isNaN(Number(value))) {
            this.typeRoomWidth = value;
        }
    }

    setTypeRoomLength (value: string) {
        if (!isNaN(Number(value))) {
            this.typeRoomLength = value;
        }
    }

    setLocationName (value: string) {
        this.locationName = value;
    }

    setLocationDistance (value: string) {
        if (!isNaN(Number(value))) {
            this.locationDistance = value;
        }
    }

    addLocationDistanceList () {
        this.locationDistanceList.push({
            location: this.locationName,
            distance: Number(this.locationDistance),
        });
        this.locationName = '';
        this.locationDistance = '';
    }

    removeLocationDistanceList (id: number) {
        this.locationDistanceList.splice(id, 1);
    }

}

export default new RegisterEntrepreneur();