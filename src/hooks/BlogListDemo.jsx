import {useCallback, useEffect, useMemo, useState} from "react";
import { Select, Table} from "antd";
import useAsync from "./UseAsync";

const endpoint = "http://localhost:5000/";

const useArticles = () =>{
    const{execute, data, loading, error} = useAsync(
        useCallback(async () => {
            const res = await fetch('http://localhost:5000/users');
            return await res.json();
        },[]),
    );
    useEffect(() => execute(), [execute()]);
    return {
        articles:data,
        articlesLoading: loading,
        articlesError: error
    };
};

const useCategories = () =>{
    const{ execute, data, loading, error } = useAsync(
        useCallback(async () => {
            const res = await fetch('http://localhost:5000/users');
            return await res.json();
        }, []),
    );
    useEffect(() => execute(), [execute]);

    return {
        categories: data,
        categoriesLoading: loading,
        categoriesError: error
    };
};

const useCombinedArticles = (articles, categories) =>{
    return useMemo(()=>{
        if(!articles || !categories){
            return null;
        }
        return articles.map((article)=>{
            return {
                ...article,
                category: categories.find(
                    (c) => String(c.id) === String(article.categoryId),
                ),
            };
        });
    }, [articles, categories]);
};

const useFilteredArticles = (articles, selectedCategory) =>{
    return useMemo(()=>{
        if(!articles) return [];
        if(!selectedCategory) return articles;
        return articles.filter((article)=>{
            console.log("filter: ", article.categoryId, selectedCategory);
            return String(article?.category?.name) === String(selectedCategory);
        });
    }, [articles, selectedCategory]);
};

const columns = [
    {dataIndex:"title", title:"Title"},
    {dataIndex:["category", "name"], title:"Category"},
];

export default function BlogListDemo() {
    const[selectedCategory, setSelectedCategory] = useState(null);

    const{articles, articlesError} = useArticles();

    const{categories, categoriesError} = useCategories();

    const combined = useCombinedArticles(articles, categories);

    const result = useFilteredArticles(combined, selectedCategory);

    const options = useMemo(()=>{
        const arr = _.uniqBy(categories, (c) => c.name).map((c) => ({
            value: c.name,
            label: c.name,
        }));
        return arr;
    }, [categories]);

    if(articlesError || categoriesError){
        return "Failed to fetch articles";
    }

    if(!result){
        return "Loading...";
    }

    return (
        <div>
            <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                options={options}
                style={{ width: "100%" }}
                placeholder="Select a category"
                />
            <Table dataSource={result} columns={columns}/>
        </div>
    )

}


