import { Button, Col, Form, Input, Row, Select } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    businessAdminListCategory,
    getIdSubCategory,
    listCategory,
    listSubCategory,
    resetState,
    subCreateCategory,
    updateSubCategory,
} from '../../../services/category/categorySlice';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

let createSubCategorySchema = yup.object().shape({
    name: yup
        .string()
        .required('Category Name is Required')
        .min(3, 'must be at least 3 characters long'),
    description: yup
        .string()
        .required('description is Required')
        .min(3, 'must be at least 3 characters long'),
    category: yup.number().required('choice category is Required'),
});

export default function CreateSubCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const idSubCategory = location?.pathname?.split('/')[2];

    const user = useSelector((state) => state?.auth?.user);
    const getSubCategory = useSelector(
        (state) => state?.category?.getIdSubCategory
    );

    const SubCategory = useSelector((state) => state?.category);

    const allCategories = useSelector(
        (state) => state?.category?.businessAdminListCategory
    );

    useEffect(() => {
        dispatch(businessAdminListCategory(user.roles.broker_id));
    }, []);

    useEffect(() => {
        idSubCategory && idSubCategory !== undefined
            ? dispatch(getIdSubCategory(idSubCategory))
            : dispatch(resetState());
    }, [idSubCategory]);

    useEffect(() => {
        if (getSubCategory) {
            formik.setValues({
                ...formik.values,
                name: getSubCategory?.name || '',
                description: getSubCategory?.description || '',
                category: getSubCategory?.category || '',
            });
        } else {
            formik.resetForm();
        }
    }, [getSubCategory]);

    const { isSuccess, isError, isLoading } = SubCategory;

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image: '',
            category: '',
            created_user: '',
        },
        validationSchema: createSubCategorySchema,
        onSubmit: (values) => {
            values.image = 'create image';
            values.created_user = user.id;
            values.category = Number(values.category);
            console.log(values);
            if (idSubCategory !== undefined) {
                const data = { id: idSubCategory, values: values };
                dispatch(updateSubCategory(data));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(listSubCategory(user.roles.broker_id));
                }, 3000);
                if (isSuccess && SubCategory.updateSubCategory) {
                    toast.success('update Sub Category Successfullly!');
                }
                navigate('/listSubCategory');
            } else {
                dispatch(subCreateCategory(values));
                formik.resetForm();
                console.log(SubCategory.create_Sub_Category);
                if (isSuccess && SubCategory.create_Sub_Category) {
                    toast.success('create Sub Category Successfullly!');
                }
                navigate('/listSubCategory');
            }
        },
    });

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100%' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col flex={1}>
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: '#1F6C97',
                        }}
                    >
                        <div></div>
                    </div>
                    <div
                        style={{
                            backgroundColor: '#F5F5F5',
                            display: 'flex',
                            height: '100vh',
                        }}
                    >
                        <form
                            onSubmit={formik.handleSubmit}
                            name="create_account_form"
                            layout="vertical"
                            size="large"
                            style={{
                                width: 603,
                                margin: 'auto',
                                backgroundColor: '#FFFFFF',
                                padding: '24px 24px 24px 24px',
                                borderRadius: 15,
                            }}
                        >
                            <div name="name">
                                <input
                                    placeholder="Sub Category Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange('name')}
                                    onBlur={formik.handleBlur('name')}
                                    className="form-control"
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.name && formik.errors.name}
                            </div>
                            <div name="description">
                                <input
                                    placeholder="Sub Category description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange(
                                        'description'
                                    )}
                                    onBlur={formik.handleBlur('description')}
                                    className="form-control"
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.description &&
                                    formik.errors.description}
                            </div>
                            <div name="category">
                                <select
                                    name="category"
                                    placeholder="Category Name"
                                    onChange={formik.handleChange('category')}
                                    onBlur={formik.handleBlur('category')}
                                    value={formik.values.category}
                                    className="form-control"
                                >
                                    <option value="">Select Category</option>
                                    {allCategories &&
                                        allCategories.map((item, key) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="error mt-2">
                                {formik.touched.category &&
                                    formik.errors.category}
                            </div>
                            <button
                                style={{ width: 200 }}
                                type="submit"
                                size="large"
                                className="btn btn-success border-0 rounded-3 my-5"
                            >
                                {idSubCategory !== undefined
                                    ? `Update`
                                    : `Create`}
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
