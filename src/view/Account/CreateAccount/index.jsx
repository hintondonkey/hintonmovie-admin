import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import MenuNavigator from '../../../components/MenuNavigator';
import LoadingSpin from '../../../common/LoadingSpin';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
    PatchAccountId,
    acountType,
    businessType,
    create_Account,
    getAcount,
    getAcountId,
    resetState,
} from '../../../services/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let createAccountSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First Name is Required')
        .min(3, 'must be at least 3 characters long'),
    last_name: yup
        .string()
        .required('Last Name is Required')
        .min(3, 'must be at least 3 characters long'),
    username: yup
        .string()
        .required('User Name is Required')
        .min(3, 'must be at least 3 characters long'),
    email: yup
        .string()
        .required('email is Required')
        .min(3, 'must be at least 3 characters long')
        .email('must be a valid email'),
    password: yup
        .string()
        .required('password is Required')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    password2: yup
        .string()
        .required('password is Required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    account_type: yup.string().required('account_type is Required.'),
    business_type: yup.string().required('business_type is Required.'),
});

export default function CreateAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const getIdUser = location?.pathname?.split('/')[2];

    const accountType = useSelector((state) => state?.auth?.acountType);
    const current_user = useSelector((state) => state?.auth?.user?.id);
    const business_Type = useSelector((state) => state?.auth?.businessType);
    const userId = useSelector((state) => state?.auth?.userId);
    const current_account = useSelector((state) => state?.auth);

    const { isSuccess, isError, isLoading, createAccount, updateAccount } =
        current_account;

    useEffect(() => {
        getIdUser && getIdUser !== undefined
            ? dispatch(getAcountId(getIdUser))
            : dispatch(resetState());
    }, [getIdUser]);

    useEffect(() => {
        if (userId) {
            formik.setValues({
                ...formik.values,
                first_name: userId?.first_name || '',
                last_name: userId?.last_name || '',
                username: userId?.username || '',
                email: userId?.email || '',
                account_type: userId?.account_type || '',
                business_type: userId?.business_type || '',
            });
        } else {
            formik.resetForm();
            dispatch(acountType());
            dispatch(businessType());
        }
    }, [userId]);

    const _buildHeader = () => {
        <div></div>;
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            account_type: '',
            business_type: '',
            current_user_id: '',
        },
        validationSchema: createAccountSchema,
        onSubmit: (values, { setFieldValue }) => {
            values.current_user_id = current_user;
            if (values.business_type === 'Editor') {
                setFieldValue('business_type', undefined);
                values.business_type = '';
            }

            if (getIdUser !== undefined) {
                const newValues = { ...values };
                delete newValues.password;
                delete newValues.password2;
                const data = { id: getIdUser, values: newValues };
                dispatch(PatchAccountId(data));
                formik.resetForm();
                navigate('/listUsers');
                setTimeout(() => {
                    dispatch(getAcount());
                }, 300);
                if (isSuccess && updateAccount) {
                    toast.success('update Account Successfullly!');
                }
                dispatch(getAcount());
            } else {
                dispatch(create_Account(values));
                formik.resetForm();
                navigate('/listUsers');
                setTimeout(() => {
                    dispatch(getAcount());
                }, 300);
                if (isSuccess && create_Account) {
                    toast.success('createAccount Added Successfullly!');
                }
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
                        {_buildHeader()}
                    </div>
                    <div
                        style={{
                            backgroundColor: '#F5F5F5',
                            display: 'flex',
                            height: '100vh',
                        }}
                    >
                        <h3 className="mb-4 title">
                            {getIdUser !== undefined ? 'Edit' : 'Add'} User
                        </h3>
                        <form
                            onSubmit={formik.handleSubmit}
                            name="create_account_form"
                            layout="horizontal"
                            size="large"
                            style={{
                                width: 603,
                                margin: 'auto',
                                backgroundColor: '#FFFFFF',
                                padding: '48px 24px 24px 24px',
                                borderRadius: 15,
                            }}
                        >
                            <div name="first_name">
                                <input
                                    placeholder="First Name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange('first_name')}
                                    onBlur={formik.handleBlur('first_name')}
                                    className="form-control"
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.first_name &&
                                    formik.errors.first_name}
                            </div>
                            <div name="last_name">
                                <input
                                    placeholder="Last Name"
                                    name="last_name"
                                    className="form-control"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange('last_name')}
                                    onBlur={formik.handleBlur('last_name')}
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.last_name &&
                                    formik.errors.last_name}
                            </div>
                            <div name="username">
                                <input
                                    placeholder="User Name"
                                    name="username"
                                    className="form-control"
                                    value={formik.values.username}
                                    onChange={formik.handleChange('username')}
                                    onBlur={formik.handleBlur('username')}
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.username &&
                                    formik.errors.username}
                            </div>
                            <div name="email">
                                <input
                                    placeholder="ID(Email)"
                                    name="email"
                                    className="form-control"
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                />
                            </div>
                            <div className="error mt-2">
                                {formik.touched.email && formik.errors.email}
                            </div>
                            {getIdUser === undefined ? (
                                <div>
                                    <div name="password">
                                        <input
                                            type="text"
                                            name="password"
                                            className="form-control"
                                            onChange={formik.handleChange(
                                                'password'
                                            )}
                                            onBlur={formik.handleBlur(
                                                'password'
                                            )}
                                            value={formik.values.password}
                                            placeholder="password"
                                        />
                                    </div>
                                    <div className="error mt-2">
                                        {formik.touched.password &&
                                            formik.errors.password}
                                    </div>
                                    <div>
                                        <input
                                            // type="password"
                                            name="password2"
                                            className="form-control"
                                            onChange={formik.handleChange(
                                                'password2'
                                            )}
                                            onBlur={formik.handleBlur(
                                                'password2'
                                            )}
                                            value={formik.values.password2}
                                            placeholder="Re-password"
                                        />
                                    </div>
                                    <div className="error mt-2">
                                        {formik.touched.password2 &&
                                            formik.errors.password2}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div name="password">
                                        <input
                                            type="text"
                                            hidden={true}
                                            name="password"
                                            className="form-control"
                                            onChange={formik.handleChange(
                                                'password'
                                            )}
                                            onBlur={formik.handleBlur(
                                                'password'
                                            )}
                                            value={
                                                (formik.values.password =
                                                    'Hidden123@')
                                            }
                                            placeholder="password"
                                        />
                                    </div>
                                    <div className="error mt-2">
                                        {formik.touched.password &&
                                            formik.errors.password}
                                    </div>
                                    <div>
                                        <input
                                            hidden={true}
                                            name="password2"
                                            className="form-control"
                                            onChange={formik.handleChange(
                                                'password2'
                                            )}
                                            onBlur={formik.handleBlur(
                                                'password2'
                                            )}
                                            value={
                                                (formik.values.password2 =
                                                    'Hidden123@')
                                            }
                                            placeholder="Re-password"
                                        />
                                    </div>
                                    <div className="error mt-2">
                                        {formik.touched.password2 &&
                                            formik.errors.password2}
                                    </div>
                                </div>
                            )}

                            <div name="roles">
                                <select
                                    name="account_type"
                                    placeholder="Role"
                                    onChange={formik.handleChange(
                                        'account_type'
                                    )}
                                    onBlur={formik.handleBlur('account_type')}
                                    value={formik.values.account_type}
                                    className="form-control"
                                >
                                    <option value="">Select Role</option>
                                    {accountType &&
                                        accountType.map((item, key) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="error mt-2">
                                {formik.touched.account_type &&
                                    formik.errors.account_type}
                            </div>
                            {formik.values.account_type === 'Business_Admin' ? (
                                <div>
                                    <div name="businessType">
                                        <select
                                            name="business_type"
                                            placeholder="Role"
                                            onChange={formik.handleChange(
                                                'business_type'
                                            )}
                                            onBlur={formik.handleBlur(
                                                'business_type'
                                            )}
                                            value={formik.values.business_type}
                                            className="form-control"
                                        >
                                            <option value="">
                                                Select Business Type
                                            </option>
                                            {business_Type &&
                                                business_Type.map(
                                                    (item, key) => {
                                                        return (
                                                            <option
                                                                key={key}
                                                                value={
                                                                    item.name
                                                                }
                                                            >
                                                                {item.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                    <div className="error mt-2">
                                        {formik.touched.business_type &&
                                            formik.errors.business_type}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        placeholder="Last Name"
                                        name="business_type"
                                        className="form-control"
                                        value={
                                            (formik.values.business_type =
                                                'Editor')
                                        }
                                        onChange={formik.handleChange(
                                            'business_type'
                                        )}
                                        onBlur={formik.handleBlur(
                                            'business_type'
                                        )}
                                        hidden={true}
                                    />
                                    <div className="error mt-2">
                                        {formik.touched.business_type &&
                                            formik.errors.business_type}
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    size="large"
                                    type="submit"
                                    style={{ width: 200 }}
                                    className="btn btn-success border-0 rounded-3 my-5"
                                >
                                    {getIdUser !== undefined
                                        ? 'Update'
                                        : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
