export function truncateDecimals(number: number) {
    return Math.floor(number);
}

export function CountPercent(count:number, total:number) {
    return Math.floor((count / total) * 100);
}

export function StringDatetimeToDate(dateTime:string) {
    const date = new Date(dateTime);

    return (date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }));
}