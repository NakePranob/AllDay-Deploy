import { makeAutoObservable, runInAction, action } from "mobx";
import { AlertType } from "@/Types/alert";

class alert {
    state: AlertType = {
        open: false,
        state: '',
        text: '',
        link: null
    };

    constructor() {
        makeAutoObservable(this);
    }

    resetAlert() {
        this.state.open = false;
        this.state.state = '';
        this.state.text = '';
        this.state.link = null;
    }

    setAlert(alert: AlertType) {
        this.state = alert;
    }
}

export default new alert