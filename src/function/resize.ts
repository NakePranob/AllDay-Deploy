'use client';
import { useState, useEffect } from 'react';

// Rename to follow React hook naming convention
const useResize = () => {
    const [width, setWidth] = useState<number>(0);

    const handleResize = () => {
        requestAnimationFrame(() => {
            setWidth(window.innerWidth);
        });
    };

    useEffect(() => {
        // Set initial width
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
};

export default useResize;
