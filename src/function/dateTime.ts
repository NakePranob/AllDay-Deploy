export function DayOption() {
    const array = Array.from({ length: 31 }, (_, i) => i + 1);
    return array;
}

export const months = [
    { value: 1, label: 'มกราคม' },
    { value: 2, label: 'กุมภาพันธ์' },
    { value: 3, label: 'มีนาคม' },
    { value: 4, label: 'เมษายน' },
    { value: 5, label: 'พฤษภาคม' },
    { value: 6, label: 'มิถุนายน' },
    { value: 7, label: 'กรกฎาคม' },
    { value: 8, label: 'สิงหาคม' },
    { value: 9, label: 'กันยายน' },
    { value: 10, label: 'ตุลาคม' },
    { value: 11, label: 'พฤศจิกายน' },
    { value: 12, label: 'ธันวาคม' }
];

export function YearPlus(plusYear:number) {
    const years = [];
    const currentYear = new Date().getFullYear(); // ปีปัจจุบัน

    for (let year = currentYear; year <= currentYear+plusYear; year++) {
        years.push(year);
    }

    return years;
}