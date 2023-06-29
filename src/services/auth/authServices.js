import axios from '../../axios';
import { config } from '../../utility/axiosconfig';
// import { base_url } from '../../utils/baseUrl';

const handleLoginApi = async (user) => {
    const response = await axios.post('/account/login/', user);
    if (response) {
        localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
};

const handleAcountType = async () => {
    const response = await axios.get('/account/account_type/', config);
    return response;
};

const handleBusinessType = async () => {
    const response = await axios.get('/account/business_type/', config);
    return response;
};

const handleCreateAccount = async (userAccount) => {
    const response = await axios.post('/account/subuser/', userAccount, config);
    return response;
};

const handleGetAccount = async () => {
    const response = await axios.get('/account/subuser/', config);
    console.log('handleGetAccount : ', response);
    return response;
};

const handleGetAccountId = async (id) => {
    const response = await axios.get(`/account/subuser/${id}`, config);
    return response;
};

const handlePatchAccountId = async (data) => {
    const response = await axios.patch(
        `/account/subuser/${data.id}`,
        data.values,
        config
    );
    return response;
};

const handleDeleteAccountId = async (id) => {
    const response = await axios.delete(`/account/subuser/${id}`, config);
    return response;
};

const authService = {
    handleLoginApi,
    handleAcountType,
    handleBusinessType,
    handleCreateAccount,
    handleGetAccount,
    handleGetAccountId,
    handlePatchAccountId,
    handleDeleteAccountId,
};

export default authService;
