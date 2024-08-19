import { makeAutoObservable } from "mobx";

class NavStore {
    head: boolean = true;
    scroll: number =0;
    lastScroll: number =0;
    acc: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setHead(head:boolean) {
        this.head = head;
    }

    setScroll(scroll:number) {
        this.scroll = scroll;
    }

    setLastScroll(lastScroll:number) {
        this.lastScroll = lastScroll;
    }

    setAcc(acc:boolean) {
        this.acc = acc;
    }

}

export default new NavStore();