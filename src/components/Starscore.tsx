'use client'
// Icons
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

type Props = {
    score: number
}

function Starscore({score}: Props) {
    if (score >= 5) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </p>
        )
    } else if (score >= 4.5) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
            </p>
        )
    } else if (score >= 4) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </p>
        )
    } else if (score >= 3.5) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
            </p>
        )
    } else if (score >= 3) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStar />
            </p>
        )
    } else if (score >= 2.5) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
                <FaStarHalf />
            </p>
        )
    } else if (score >= 2) {
        return (
            <p className="flex">
                <FaStar />
                <FaStar />
            </p>
        )
    } else if (score >= 1.5) {
        return (
            <p className="flex">
                <FaStar />
                <FaStarHalf />
            </p>
        )
    } else if (score >= 1) {
        return (
            <p className="flex">
                <FaStar />
            </p>
        )
    } else if (score >= 0.5) {
        return (
            <p className="flex">
                <FaStarHalf />
            </p>
        )
    } else {
        return (
            <p className="flex">
            </p>
        )
    }
}

export default Starscore