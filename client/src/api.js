import useFetch from './usefetch';

export const useTopics = () => useFetch('http://localhost:3000/api/topics');

export const useArticles = () => useFetch('http://localhost:3000/api/articles');

export const useSelectedTopicArticles = () => useFetch('http://localhost:3000/api/articles/following');

export const userData = async (token, image, name, description) => {

    const fd = new FormData()
    fd.append('image', image)
    fd.append('name', name)
    fd.append('description', description)

    const ret = await fetch('http://localhost:3000/api/users/me', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token },
        body: fd
    })
    const data = await ret.json();
    return data;
}

export const register = async (username, password, mail) => {
    const ret = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, mail })
    })
    const data = await ret.json();
    return data;
}

export const login = async (username, password, mail) => {
    const ret = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    const data = await ret.json();
    return data;
}


