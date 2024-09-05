'use client'
import { useState, useEffect } from 'react';

const resize = () => {
    const [width, setWidth] = useState<number>(0);

    const handleResize = () => {
        requestAnimationFrame(() => {
            setWidth(window.innerWidth);
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
};

export default resize;
