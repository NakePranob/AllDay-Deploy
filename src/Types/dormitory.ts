import { number } from "mobx-state-tree/dist/internal";

export type Dormitory = {
    id: number;
    name: string;
    engname: string | null;
    userId: number;
    address: string | null;
    location: string | null;
    price: number;
    doc: string | null;
    facebook: string | null;
    line: string | null;
    phone: number | null;
    occupied: Boolean;
    view: number;
    reviewScore: number;
    createdAt: string;
    location_distance: Location_distance[];
    dormitory_img: Dormitory_img[];
    dormitory_type: Dormitory_type[];
    review: Review[];
    live_at: Live_At[];
    dormitory_state: Dormitory_state;
};

export interface Favorites {
    id: number;
    userId: number;
    dmtId: number;
    dormitory: Dormitory;
};

export interface Live_At {
   userId: number,
   dmtId: number 
}

export interface Location_distance {
    id: number;
    dmtId: number;
    location: string;
    distance: number;
}

export interface Review {
    id: number;
    userId: number;
    user: User;
    dmtId: number;
    score: number;
    content: string;
    createdAt: string;
}

export interface User {
    id: number;
    roleId: number;
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    password: string;
    phone: string;
    sex: boolean;
    createdAt: string;
    profile: string;
}

export interface Dormitory_state {
    id: number;
    dmtId: number;
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

export interface Dormitory_img {
    id: number;
    dmtId: number;
    url: string;
};

export interface Dormitory_type {
    id: number;
    dmtId: number;
    name: string;
    price: number;
    quantity: number;
    occupied: number;
    width: number | null;
    length: number | null;
    dormitory_typeimg: Dormitory_typeimg[];
    dormitory_facilitate: Dormitory_facilitate;
};

export interface Dormitory_facilitate {
    id: number;
    dmt_typeId: number;
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

export type Dormitory_typeimg = {
    id: number;
    dmt_typeId: number;
    url: string;
}