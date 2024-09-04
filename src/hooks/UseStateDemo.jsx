import {useState} from "react";

function UseStateDemo() {
    //useState 让函数组件具有维持状态的能力
    const [count, setCount] = useState(0);

    return(
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}

export default UseStateDemo;