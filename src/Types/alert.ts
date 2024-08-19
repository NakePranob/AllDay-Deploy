
export type Close = () => void;


export interface AlertType {
    open: boolean
    state: string
    text: string
    link: string | null
}