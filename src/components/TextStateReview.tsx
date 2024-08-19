'use client'

type Props = {
    score: number,
    countReview: number
}

const TextStateReview = ({score, countReview}: Props) => {
    if (countReview === 0) {
        return (
            <span>ยังไม่มีการรีวิว</span>
        )
    } else {
        if (score >= 4.5) {
            return (
                <span>ดีเยี่ยม</span>
            )
        } else if (score >= 3.5) {
            return (
                <span>ดีมาก</span>
            )
        } else if (score >= 3) {
            return (
                <span>ดี</span>
            )
        } else if (score >= 2) {
            return (
                <span>ปานกลาง</span>
            )
        } else {
            return (
                <span>ต้องปรับปรุง</span>
            )
        }
    }
}

export default TextStateReview