import { Button, Col, Form, Input, Row, Select } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
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

export default function CreateBusinessAdmin() {
    const [loading, setLoading] = useState(false);

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
                    ></div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
