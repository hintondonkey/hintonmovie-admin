import { Button, Col, Form, Input, Row, Space, Table, Tag } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    deleteSubCategory,
    listSubCategory,
} from '../../../services/category/categorySlice';
import CustomModal from '../../../components/CustomModal';
import { getAcount } from '../../../services/auth/authSlice';

export default function ListBusinessAdmin() {
    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            width: 50,
        },
        {
            title: 'Business Name',
            dataIndex: 'businessName',
            key: 'businessName',
        },
        {
            title: 'Business Type',
            dataIndex: 'businessType',
            key: 'businessType',
            width: 150,
            render: (val) => (
                <Tag
                    color="#D9D9D9"
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                        paddingRight: 16,
                        width: 150,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                >
                    {val}
                </Tag>
            ),
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 150,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            // title: 'Action',
            // render: () => (
            //     <Space direction="horizontal">
            //         <Button type="primary">Upgrade</Button>
            //         <Button type="primary" danger>
            //             Delete
            //         </Button>
            //         <Button
            //             type="primary"
            //             style={{
            //                 backgroundColor: '#5200FF',
            //                 color: 'white',
            //             }}
            //             onClick={() => {
            //                 navigate('/listBusinessAdmin/123');
            //             }}
            //         >
            //             Services
            //         </Button>
            //     </Space>
            // ),
            title: 'Actions',
            dataIndex: 'Actions',
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAcount());
    }, []);
    const allUsers = useSelector((state) => state?.auth?.allUsers);
    const datas = [];

    allUsers &&
        allUsers.length > 0 &&
        allUsers.forEach((i, j) => {
            {
                i.account_type.name === 'Business_Admin' &&
                    datas.push({
                        index: j + 1,
                        businessName: i.account_type.name,
                        businessType: i.broker.business_type.name,
                        firstName: i.user.first_name,
                        lastName: i.user.last_name,
                        userName: i.user.username,
                        email: i.user.email,
                        role: i.account_type.name,
                        Actions: (
                            <Space direction="horizontal">
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: '#5200FF',
                                        color: 'white',
                                    }}
                                    onClick={() => {
                                        navigate(
                                            `/listBusinessAdmin/${i.broker.id}`
                                        );
                                    }}
                                >
                                    Services
                                </Button>
                            </Space>
                        ),
                    });
            }
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
                            paddingTop: 24,
                        }}
                    >
                        <div style={{ width: '100%', padding: 16 }}>
                            <Table
                                style={{
                                    boxShadow:
                                        'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                    borderRadius: 20,
                                }}
                                columns={columns}
                                dataSource={datas}
                            />
                        </div>
                    </div>
                </Col>
            </Row>

            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
