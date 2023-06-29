import axios from '../axios';

// const handleLoginApi = (username, password) => {
//     return axios.post('/account/login/', { username, password });
// };

const getAllMovie = (config) => {
    console.log('apiGetAllMovie', config);
    return axios.get(`/movie/stream`, config);
};

const getMovieById = (config, id) => {
    return axios.get(`/movie/stream/${id}`, config);
};

const createMovie = (data, config) => {
    return axios.post(`/movie/stream/`, data, config);
};

const postcreateMovie = (data, config) => {
    return axios.post(`/movie/poststream/`, data, config);
};

const putMovie = (data, config, id) => {
    return axios.put(`/movie/stream/${id}`, data, config);
};

const deleteMovie = (config, id) => {
    return axios.delete(`/movie/stream/${id}`, config);
};

const editWatchlist = (data, config, id) => {
    return axios.put(`/movie/watch-list/${id}`, data, config);
};

const deleteWathlist = (config, id) => {
    return axios.delete(`/movie/watch-list/${id}`, config);
};

const addWatchlist = (data, config) => {
    return axios.post(`/movie/watch-list/`, data, config);
};

// const putMovie = (config, id) => {
//   return axios.get(`movie/stream/${id}`, config)
// }

export {
    // handleLoginApi,
    getAllMovie,
    putMovie,
    getMovieById,
    editWatchlist,
    deleteWathlist,
    createMovie,
    postcreateMovie,
    addWatchlist,
    deleteMovie,
};
