import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url)=>{
    const [item, setItem] = useState({});

    useEffect(() => {
      axios
        .get(url)
        .then((res) => {
            setItem(res.data)
        console.log("RES DATAAAA", res);});
    }, []);

    return { item }
}

export default useFetch;