export function validateInput(input:string) {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(input);
}