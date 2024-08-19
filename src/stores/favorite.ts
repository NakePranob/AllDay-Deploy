import { makeAutoObservable } from "mobx";
import axios from "axios";
import { AlertType } from "@/Types/alert";
import type { Favorites } from "@/Types/dormitory";

class favorite {
    data: Favorites[] = [];
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

    setData(data: Favorites[]) {
        this.data = data;
    }

    async delete(id: number) {
        try {
            await axios.delete(`http://localhost/api/favorite/${id}`);
            this.data = this.data.filter(favorite => favorite.id !== id);
            this.setAlert({
                open: true,
                state: 'success',
                text: 'ลบข้อมูลสำเร็จ',
                link: null
            });
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

export default new favorite();
