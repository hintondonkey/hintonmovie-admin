import { Button, Col, Form, Input, Row } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    createCategory,
    getIdCategory,
    listCategory,
    resetState,
    updateCategory,
} from '../../../services/category/categorySlice';

let createCategorySchema = yup.object().shape({
    name: yup
        .string()
        .required('Category Name is Required')
        .min(3, 'must be at least 3 characters long'),
    description: yup
        .string()
        .required('description is Required')
        .min(3, 'must be at least 3 characters long'),
});

export default function CreateCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const IdCategory = location?.pathname?.split('/')[2];
    const getCategory = useSelector((state) => state?.category?.getIdcategory);

    useEffect(() => {
        IdCategory && IdCategory !== undefined
            ? dispatch(getIdCategory(IdCategory))
            : dispatch(resetState());
    }, [IdCategory]);

    useEffect(() => {
        if (getCategory) {
            formik.setValues({
                ...formik.values,
                name: getCategory?.name || '',
                description: getCategory?.description || '',
            });
        } else {
            formik.resetForm();
        }
    }, [getCategory]);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image: '',
        },
        validationSchema: createCategorySchema,
        onSubmit: (values) => {
            values.image = 'create image';
            if (IdCategory !== undefined) {
                const data = { id: IdCategory, values: values };
                dispatch(updateCategory(data));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(listCategory());
                }, 3000);
                navigate('/listCategory');
            } else {
                dispatch(createCategory(values));
                formik.resetForm();
                navigate('/listCategory');
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
                        <h3 className="mb-4 title">
                            {IdCategory !== undefined ? 'Edit' : 'Add'} Category
                        </h3>
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
                            <div name="Category">
                                <input
                                    placeholder="Category Name"
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
                                    placeholder="description category name"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange(
                                        'description'
                                    )}
                                    onBlur={formik.handleBlur('description')}
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.description &&
                                    formik.errors.description}
                            </div>
                            <button
                                style={{ width: 200 }}
                                type="submit"
                                size="large"
                                className="btn btn-success border-0 rounded-3 my-5"
                            >
                                {IdCategory !== undefined ? 'Update' : 'Create'}
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
