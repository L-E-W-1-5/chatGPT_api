import { useState, useEffect } from "react";


const useClock = () => {

    const [date, setDate] = useState(new Date());


    useEffect(() => {

        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return () => {
            clearInterval(timer);
        }

    }, []);

    const day = date.toLocaleDateString('en', {weekday:'long'});

    const today = `${day}, ${date.getDate()} ${date.toLocaleDateString('en', {month: 'long'})}`;

    const time = date.toLocaleTimeString('en', {hour: 'numeric', hour12: true, minute: 'numeric'})

    return {
        today,
        time
    }
}

export default useClock;
