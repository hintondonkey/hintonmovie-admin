import { Button, Col, Form, Input, Row, Space, Table } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    deleteSubCategory,
    listSubCategory,
} from '../../../services/category/categorySlice';
import CustomModal from '../../../components/CustomModal';

const columns = [
    {
        title: 'Other',
        dataIndex: 'id',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'SubCategory',
        dataIndex: 'subcategory',
        key: 'category',
    },
    {
        title: 'Total Event',
        dataIndex: 'totalEvent',
        key: 'totalEvent',
    },
    {
        title: 'Action',
        dataIndex: 'Action',
    },
];

export default function ListCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [subCategoryId, setSubCategoryId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setSubCategoryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(listSubCategory(currentUser.roles.broker_id));
    }, []);

    const allCategories = useSelector((state) => state?.category?.subcategory);
    const currentUser = useSelector((state) => state?.auth?.user);
    const Category = useSelector((state) => state?.category);

    const { isSuccess, isError, isLoading } = Category;

    const handleUpdates = (id) => {
        navigate(`/createSubCategory/${id}`);
    };

    const datas = [];

    allCategories &&
        allCategories.length > 0 &&
        allCategories.forEach((i, j) => {
            datas.push({
                id: j + 1,
                category: i.category_name,
                subcategory: i.name,
                totalEvent: i.total_event,
                Action: (
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
                        {/* <Button
                            type="primary"
                            style={{
                                backgroundColor: '#5200FF',
                                color: 'white',
                            }}
                        >
                            Inside
                        </Button> */}
                    </Space>
                ),
            });
        });

    const deleteCategory = (e) => {
        dispatch(deleteSubCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(listSubCategory(currentUser.roles.broker_id));
        }, 300);
        if (isSuccess && Category.deleteSubCategory === 'delete success') {
            toast.success('delete Sub Category Successfullly!');
        }
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
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(subCategoryId);
                }}
                title="Are you sure you want to delete this user subCategory?"
            />
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
