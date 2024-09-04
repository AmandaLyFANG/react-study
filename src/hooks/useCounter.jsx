import {useCallback, useRef, useState} from "react";

function useCounter() {

    const[count, setCount] = useState(0);

    const increment = useCallback(()=>{
        setCount(count + 1);
    },[count]);

    const decrement = useCallback(()=>{
        setCount(count - 1);
    },[count]);

    const reset = useCallback(()=> setCount(0),[]);

    return {count, increment, decrement, reset};

}

export function Counter() {
    const{count, increment, decrement, reset} = useCounter();

    return (
        <div>
            <button onClick={reset}>Reset</button>
            <button onClick={increment}>Increment</button>
            <p>{count}</p>
            <button onClick={decrement}>Decrement</button>
        </div>)
}