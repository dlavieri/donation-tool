import { useEffect } from 'react';

function useIntersection(ref, handler) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio === 1) {
                    handler();
                }
            },{
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect();
    })
}

export default useIntersection;