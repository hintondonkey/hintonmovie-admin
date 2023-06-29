import axios from '../../axios';
import { config } from '../../utility/axiosconfig';

const handleCreateCategory = async (category) => {
    const response = await axios.post('/lookup/category/', category, config);
    return response;
};

const handleListCategory = async () => {
    const response = await axios.get('/lookup/category/', config);
    return response;
};

const handleBusinessAdminListCategory = async (id) => {
    const response = await axios.get(
        `/services/get_category_list/${id}`,
        config
    );
    return response;
};

const handleGetIdCategory = async (id) => {
    const response = await axios.get(`/lookup/category/${id}/`, config);
    return response;
};

const handleUpdateCategory = async (data) => {
    const response = await axios.patch(
        `/lookup/category/${data.id}`,
        data.values,
        config
    );
    return response;
};

const handleDeleteCategory = async (id) => {
    console.log('delete category : ', id);
    const response = await axios.delete(`/lookup/category/${id}`, config);
    return response;
};

const handleCreateSubCategory = async (category) => {
    console.log(category);
    const response = await axios.post(
        '/services/sub_category/',
        category,
        config
    );
    console.log(response);
    return response;
};

const handleListSubCategory = async (id) => {
    const response = await axios.get(
        `/services/get_sub_category_broker_service/${id}/`,
        config
    );
    return response;
};

const handleBusinessAdminListSubCategory = async (id) => {
    const response = await axios.get(
        `/services/get_sub_category_broker_service/${id}/`,
        config
    );
    return response;
};

const handleGetIdSubCategory = async (id) => {
    const response = await axios.get(`/services/sub_category/${id}/`, config);
    return response;
};

const handleUpdateSubCategory = async (data) => {
    console.log('handleUpdateSubCategory : ', data);
    const response = await axios.patch(
        `/services/sub_category/${data.id}`,
        data.values,
        config
    );
    console.log('handleUpdateSubCategory : ', data);
    return response;
};

const handleDeleteSubCategory = async (id) => {
    const response = await axios.delete(
        `/services/sub_category/${id}/`,
        config
    );
    return response;
};

const handleGetCategoryFllowBroker = async (id) => {
    const response = await axios.get(
        `/services/get_broker_service/${id}/`,
        config
    );
    return response;
};

const handleUpdateCategoryActive = async (data) => {
    const response = await axios.patch(
        `/services/broker_service/${data.id}/`,
        data.active,
        config
    );
    return response;
};

const handleGetSubCategoryToCategoryToBrokerId = async (data) => {
    const response = await axios.patch(
        `/services/get_sub_category_broker_service/${data.category_id}/${data.broker_id}/`,
        config
    );
    return response;
};

const categoryService = {
    handleCreateCategory,
    handleListCategory,
    handleGetIdCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleCreateSubCategory,
    handleListSubCategory,
    handleGetIdSubCategory,
    handleUpdateSubCategory,
    handleDeleteSubCategory,
    handleGetCategoryFllowBroker,
    handleUpdateCategoryActive,
    handleBusinessAdminListCategory,
    handleBusinessAdminListSubCategory,
    handleGetSubCategoryToCategoryToBrokerId,
};

export default categoryService;
