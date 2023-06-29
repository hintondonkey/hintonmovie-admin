import { Button, Col, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccountId, getAcount } from '../../../services/auth/authSlice';
import Link from 'antd/es/typography/Link';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import CustomModal from '../../../components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'ID/Email',
        dataIndex: 'email',
        key: 'email',
        width: 400,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Actions',
        dataIndex: 'Actions',
    },
];

export default function OverviewAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [accountId, setAccountId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setAccountId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getAcount());
    }, []);

    const handleUpdates = (id) => {
        navigate(`/createAccount/${id}`);
    };
    const allUsers = useSelector((state) => state?.auth?.allUsers);

    const datas = [];
    allUsers &&
        allUsers.length > 0 &&
        allUsers.forEach((i, j) => {
            datas.push({
                key: j + 1,
                firstName: i.user.first_name,
                lastName: i.user.last_name,
                userName: i.user.username,
                email: i.user.email,
                role: i.account_type.name,
                Actions: (
                    <Space direction="horizontal">
                        <Button
                            type="primary"
                            onClick={() => handleUpdates(i.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => showModal(i.id)}
                        >
                            Delete
                        </Button>
                        {i.account_type.name === 'Business_Admin' && (
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: '#5200FF',
                                    color: 'white',
                                }}
                            >
                                Inside
                            </Button>
                        )}
                    </Space>
                ),
            });
        });

    const _buildHeader = () => {
        <div></div>;
    };

    const deleteAccount = (e) => {
        dispatch(deleteAccountId(e));

        setOpen(false);
        setTimeout(() => {
            dispatch(getAcount());
        }, 100);
    };

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
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteAccount(accountId);
                }}
                title="Are you sure you want to delete this user name?"
            />
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
