import {useEffect, useState} from "react";

function BlogView({id}){
    const [blogContent, setBlogContent] = useState(null);

    useEffect(()=>{
        //useEffect的callback要避免直接的async函数，需要封装一下
        const doAsync = async () => {
            setBlogContent(null);
            const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
            setBlogContent(await res.data);
        };
        doAsync();
    },[id]); //使用id作为依赖项，变化时则执行副作用

    //如果没有 blogContent 则认为是在 loading 状态
    const isLoading = !blogContent;
    return <div>{isLoading ? "Loading...": blogContent}</div>

}