import dormitory from "@/stores/dormitory";

export type Image = {
    imgFile: File;
}

export type TypeRoomApi = {
    name: string;
    price: string;
    quantity: string;
    width: string;
    length: string;
    imageSelect: File | null;
    facilitate: Facilitate;
    room_img: RoomImageApi[];
}

export type TypeRoom = {
    name: string;
    price: string;
    quantity: string;
    width: string;
    length: string;
    imageSelect: File | null;
    facilitate: Facilitate;
    room_img: RoomImage[];
}

export interface Dormitory_state {
    home: boolean;
    park_car: boolean;
    park_motorcycle: boolean;
    lift: boolean;
    security_door: boolean;
    fingerprint: boolean;
    keycard: boolean;
    man: boolean;
    female: boolean;
    animal: boolean;
    fitness: boolean;
    wifi: boolean;
    cctv: boolean;
    security_guard: boolean;
    smoke: boolean;
    restaurant: boolean;
    store: boolean;
    washing: boolean;
}

export interface Location_distance {
    location: string;
    distance: number;
}

export interface RoomImage {
    imgFile: File;
}

export interface RoomImageApi {
    imgFile: any;
}

export interface Facilitate {
    fan: boolean;
    air: boolean;
    closet: boolean;
    water_heater: boolean;
    table: boolean;
    dressing_table: boolean;
    fridge: boolean;
    bed: boolean;
    tv: boolean;
}