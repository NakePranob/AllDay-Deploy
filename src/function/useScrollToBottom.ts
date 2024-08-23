import { useState, useEffect } from 'react';

const useScrollToBottom = () => {
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.offsetHeight-5;
            console.log(scrollTop, windowHeight, docHeight);

            if (windowHeight + scrollTop >= docHeight) {
                console.log('Bottom reached');
                setIsBottom(true);
            } else {
                console.log('Bottom not reached');
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
