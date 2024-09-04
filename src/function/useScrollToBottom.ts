'use client'
import { useState, useEffect } from 'react';

const useScrollToBottom = () => {
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.offsetHeight-40;
            if (windowHeight + scrollTop >= docHeight) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isBottom;
};

export default useScrollToBottom;
