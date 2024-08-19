import { makeAutoObservable } from "mobx";
import axios from "axios";
import { truncateDecimals } from "@/function/maths";
import type { Dormitory } from "@/Types/dormitory"

class dormitory {
    dormitoryList: Dormitory[] = [];
    dormitoryListUse: Dormitory[] = [];

    layoutList: boolean = false;
    filterDrawer: boolean = false;
    priceState: boolean = true;
    reviewState: boolean = true;
    typeState: boolean = true;
    handyState: boolean = true

    priceValue: number[] = [1000, 9000];
    value: number[] = [10, 90];
    reviewValue: number = 0;
    manValue: boolean = false;
    femaleValue: boolean = false;
    homeValue: boolean = false;
    fanValue: boolean = false;
    airValue: boolean = false;
    closetValue: boolean = false;
    waterHeaterValue: boolean = false;
    tableValue: boolean = false;
    dressingValue: boolean = false;
    fridgeValue: boolean = false;
    bedValue: boolean = false;
    tvValue: boolean = false;
    wifiValue: boolean = false;
    cctvValue: boolean = false;
    parkCarValue: boolean = false;
    motorcycleValue: boolean = false;
    securityValue: boolean = false;
    guardValue: boolean = false;
    fingerPrintValue: boolean = false;
    keycardValue: boolean = false;
    animalValue: boolean = false;
    fitnessValue: boolean = false;
    liftValue: boolean = false;
    smokeValue: boolean = false;
    restaurantValue: boolean = false;
    storeValue: boolean = false;
    washingValue: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.priceHandleChange = this.priceHandleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.addData = this.addData.bind(this);
        this.getDataFillter = this.getDataFillter.bind(this);
        this.resetValue = this.resetValue.bind(this);
    }

    resetValue() {
        this.priceValue = [1000, 9000];
        this.value = [10, 90];
        this.reviewValue = 0;
        this.manValue = false;
        this.femaleValue = false;
        this.homeValue = false;
        this.fanValue = false;
        this.airValue = false;
        this.closetValue = false;
        this.waterHeaterValue = false;
        this.tableValue = false;
        this.dressingValue = false;
        this.fridgeValue = false;
        this.bedValue = false;
        this.tvValue = false;
        this.wifiValue = false;
        this.cctvValue = false;
        this.parkCarValue = false;
        this.motorcycleValue = false;
        this.securityValue = false;
        this.guardValue = false;
        this.fingerPrintValue = false;
        this.keycardValue = false;
        this.animalValue = false;
        this.fitnessValue = false;
        this.liftValue = false;
        this.smokeValue = false;
        this.restaurantValue = false;
        this.storeValue = false;
        this.washingValue = false;

        this.getData();
    }

    async getData() {
        try {
            const result = await axios.get('http://localhost:3000/api/getDormitory', {
                headers: {
                    'getType': 'get',
                },
            });
            this.setDormitoryList(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async addData() {
        try {
            const ids = this.dormitoryList.map(dormitory => dormitory.id);
            const maxId = Math.max(...ids);
            const result = await axios.get('http://localhost:3000/api/getDormitory', {
                headers: {
                    'getType': 'add',
                    'lastFields': maxId.toString()
                },
            });
            this.setDormitoryList([...this.dormitoryList, ...result.data.data]);
        } catch (error) {
            console.log(error);
        }
    }

    async getDataFillter() {

        const formData = {
            price: this.priceValue,
            reviewScore: this.reviewValue,
            state: {
                man: this.manValue,
                female: this.femaleValue,
                park_car: this.parkCarValue,
                park_motorcycle: this.motorcycleValue,
                lift: this.liftValue,
                home: this.homeValue,
                security_door: this.securityValue,
                fingerprint: this.fingerPrintValue,
                keycard: this.keycardValue,
                animal: this.animalValue,
                fitness: this.fitnessValue,
                wifi: this.wifiValue,
                cctv: this.cctvValue,
                security_guard: this.guardValue,
                smoke: this.smokeValue,
                restaurant: this.restaurantValue,
                store: this.storeValue,
                washing: this.washingValue,
            },
            facilitate: {
                fan: this.fanValue,
                air: this.airValue,
                closet: this.closetValue,
                water_heater: this.waterHeaterValue,
                table: this.tableValue,
                dressing_table: this.dressingValue,
                fridge: this.fridgeValue,
                bed: this.bedValue,
                tv: this.tvValue
            }
        }
        try {
            const result = await axios.post('http://localhost:3000/api/getDormitory', formData)
            this.setDormitoryList(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    setDormitoryList(data: Dormitory[]) {
        this.dormitoryList = data;
    }

    setLayoutList(state:boolean) {
        this.layoutList = state;
    }

    setResponsive(width:number) {
        if (width < 768) {
            this.layoutList = true;
        }
    }

    setFilterDrawer() {
        this.filterDrawer = !this.filterDrawer;
    }


    setPriceState(state:boolean) {
        this.priceState = state;
    }

    setReviewState(state:boolean) {
        this.reviewState = state;
    }

    setTypeState(state:boolean) {
        this.typeState = state;
    }

    setHandyState(state:boolean) {
        this.handyState = state;
    }

    priceHandleChange(event: Event, newValue: number | number[]) {
        this.value = newValue as number[];
        let sumPrice : number[] = [];
        sumPrice.push((this.value[0] / 100) * 10000);
        sumPrice.push((this.value[1] / 100) * 10000);
        const truncatedData = sumPrice.map(truncateDecimals)
        this.priceValue = truncatedData as number[];
    }

    setReviewValue(value: number | null) {
        if (value) {
            this.reviewValue = value;
        } else {
            this.reviewValue = 0;
        }
    }

    setManValue(value: boolean) {
        this.manValue = value;
    }

    setFemaleValue(value: boolean) {
        this.femaleValue = value;
    }

    setHomeValue(value: boolean) {
        this.homeValue = value;
    }
    
    setFanValue(value: boolean) {
        this.fanValue = value;
    }

    setAirValue(value: boolean) {
        this.airValue = value;
    }

    setClosetValue(value: boolean) {
        this.closetValue = value;
    }

    setWaterHeaterValue(value: boolean) {
        this.waterHeaterValue = value;
    }

    setTableValue(value: boolean) {
        this.tableValue = value;
    }

    setDressingValue(value: boolean) {
        this.dressingValue = value;
    }

    setFridgeValue(value: boolean) {
        this.fridgeValue = value;
    }

    setBedValue(value: boolean) {
        this.bedValue = value;
    }

    setTvValue(value: boolean) {
        this.tvValue = value;
    }

    setWifiValue(value: boolean) {
        this.wifiValue = value;
    }

    setCctvValue(value: boolean) {
        this.cctvValue = value;
    }

    setParkCarValue(value: boolean) {
        this.parkCarValue = value;
    }

    setMotorcycleValue(value: boolean) {
        this.motorcycleValue = value;
    }

    setSecurityValue(value: boolean) {
        this.securityValue = value;
    }

    setGuardValue(value: boolean) {
        this.guardValue = value;
    }

    setFingerPrintValue(value: boolean) {
        this.fingerPrintValue = value;
    }

    setKeycardValue(value: boolean) {
        this.keycardValue = value;
    }

    setAnimalValue(value: boolean) {
        this.animalValue = value;
    }

    setFitnessValue(value: boolean) {
        this.fitnessValue = value;
    }

    setLiftValue(value: boolean) {
        this.liftValue = value;
    }

    setSmokeValue(value: boolean) {
        this.smokeValue = value;
    }

    setRestaurantValue(value: boolean) {
        this.restaurantValue = value;
    }

    setStoreValue(value: boolean) {
        this.storeValue = value;
    }
    setWashingValue(value: boolean) {
        this.washingValue = value;
    }

}

export default new dormitory();