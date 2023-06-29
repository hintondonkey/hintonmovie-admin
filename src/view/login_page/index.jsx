import React, { useEffect, useState } from 'react';
import './styles.css';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { handleLoginApi } from '../../services/UserService';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/auth/authSlice';

let schema = yup.object().shape({
    username: yup.string().required('username is Required'),
    password: yup.string().required('Password is Required'),
});

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const token = JSON.parse(localStorage.getItem('user'));

    // console.log(token.tokens.access);

    const authState = useSelector((state) => state.auth);
    const { user, isError, isSuccess, isLoading, message } = authState;
    useEffect(() => {
        if (isSuccess) {
            window.location.href = '/listmovie';
            return;
        } else {
            navigate('');
        }
    }, [user, isError, isSuccess, isLoading]);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // console.log(values);
            dispatch(login(values));
        },
    });

    // const login = async () => {
    //     let res = await handleLoginApi(username, password);

    //     if (res) {
    //         localStorage.setItem('user', JSON.stringify(res));

    //         navigate('/listmovie');
    //     } else {
    //         setError('Invalid username or password');
    //         return;
    //     }
    // };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action onSubmit={formik.handleSubmit}>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <HiOutlineMail className="inputbox_icon" />
                            <input
                                type="text"
                                id="username"
                                value={formik.values.username}
                                name="username"
                                onChange={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                            />
                            <label htmlFor>Username</label>
                        </div>
                        <div className="error mt-2">
                            {formik.touched.username && formik.errors.username}
                        </div>
                        <div className="inputbox">
                            <AiFillLock className="inputbox_icon" />
                            <input
                                type="password"
                                value={formik.values.password}
                                name="password"
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                            />
                            <label>Password</label>
                        </div>
                        <div className="error mt-2">
                            {formik.touched.password && formik.errors.password}
                        </div>
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember Me <a href="#">Forget Password</a>
                            </label>
                        </div>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
