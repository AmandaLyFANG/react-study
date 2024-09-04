import {useCallback, useRef, useState} from "react";

function UseRefDemo() {

    const[time, setTime] = useState(0);

    const timer = useRef(null);

    const handleStart = useCallback(() => {
        timer.current = window.setInterval(() => {
            setTime((time) => time + 1);
        }, 100);
    },[]);

    const handlePause = useCallback(()=>{
        window.clearInterval(timer.current);
        timer.current = null;
    }, []);

    return (

        <div>
            {time/10} seconds.
            <br/>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>

        </div>
    );
}

export default UseRefDemo;