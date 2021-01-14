import useFetch from './usefetch';

export const useTopics = () => useFetch('http://localhost:3000/api/topics');

export const useSelectedTopicArticles = () => useFetch('http://localhost:3000/api/articles/following');

export const useArticles = (limit) => useFetch('http://localhost:3000/api/articles?limit=' + limit);

export const useSelectedArticle = (id) => useFetch('http://localhost:3000/api/articles/read/' + id);

export const useMyArticles = () => useFetch('http://localhost:3000/api/articles/myarticles');

export const useTopicArticles = (id) => useFetch('http://localhost:3000/api/topics/' + id);


export const createArticles = async (token, topicId, image, title, content, visible) => {

    const fd = new FormData()
    fd.append('topicId', topicId);
    fd.append('title', title);
    fd.append('content', content);
    fd.append('visible', visible);
    fd.append('image', image);

    const ret = await fetch('http://localhost:3000/api/articles/writearticle', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: fd
    })
    const data = await ret.json();
    return data;
}

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

export const userTopics = async (token, topicId) => {

    const fd = new FormData()
    fd.append('topic_id', topicId)

    const ret = await fetch('http://localhost:3000/api/users/topics', {
        method: 'POST',
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

export const deleteArticle = async (token, id) => {
    const ret = await fetch('http://localhost:3000/api/articles/detelearticle/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    const data = await ret.json();
    return data;
}


