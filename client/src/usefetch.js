import { useState, useEffect } from 'react';
import { useUser } from './usercontext'

function useFetch(url) {
    const [data, setData] = useState();
    const me = useUser();
    const token = me && me.token;
    useEffect(() => {
        fetch(url, {
            headers: token && { 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(t => setData(t))
    }, [url, token])
    return data
}

export default useFetch;