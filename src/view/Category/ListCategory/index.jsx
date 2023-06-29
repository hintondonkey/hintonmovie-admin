import { Button, Col, Form, Input, Row, Space, Table } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    businessAdminListCategory,
    deleteCategory,
    getSubCategoryToCategoryToBrokerId,
    listCategory,
    listSubCategory,
} from '../../../services/category/categorySlice';
import CustomModal from '../../../components/CustomModal';
// import { current_user } from '../../../utility/axiosconfig';

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
        title: 'Total Event',
        dataIndex: 'totalEvent',
        key: 'totalEvent',
    },
    {
        title: 'Action',
        dataIndex: 'Action',

        // render: (item) => (
        //     <Space direction="horizontal">
        //         <Button type="primary">Edit</Button>
        //         <Button type="primary" danger>
        //             Delete
        //         </Button>
        //         <Button
        //             type="primary"
        //             style={{
        //                 backgroundColor: '#5200FF',
        //                 color: 'white',
        //             }}
        //         >
        //             Create Event
        //         </Button>
        //     </Space>
        // ),
    },
];

export default function ListCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const currentUser = current_user.current_user.broker_id;

    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setCategoryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(listCategory());
        dispatch(businessAdminListCategory(user.broker_id));
        dispatch(listSubCategory(user.broker_id));
    }, []);

    const allCategories = useSelector((state) => state?.category?.category);
    const allSubCategories = useSelector(
        (state) => state?.category?.subcategory
    );
    const user = useSelector((state) => state?.auth?.user?.roles);
    const business_AdminListCategory = useSelector(
        (state) => state?.category?.businessAdminListCategory
    );
    const handleUpdates = (id) => {
        navigate(`/createCategory/${id}`);
    };

    console.log('Category category updated :', allSubCategories);

    const datas = [];

    if (
        user &&
        user.current_user_id === 1 &&
        user.broker_id === 1 &&
        user.account_type === null
    ) {
        allCategories &&
            allCategories.length > 0 &&
            allCategories.forEach((i, j) => {
                datas.push({
                    id: j + 1,
                    category: i.name,
                    totalEvent: i.total_event,
                    Action: (
                        <Space direction="horizontal">
                            {user &&
                                user.account_type === null &&
                                user.is_super_admin && (
                                    <>
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
                                    </>
                                )}

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
    } else {
        business_AdminListCategory &&
            business_AdminListCategory.length > 0 &&
            business_AdminListCategory.forEach((i, j) => {
                datas.push({
                    id: j + 1,
                    category: i.name,
                    totalEvent: i.total_event,
                    Action: (
                        <Space direction="horizontal">
                            <Button
                                type="primary"
                                ghost
                                style={{
                                    backgroundColor: '#1677ff',
                                    color: 'white',
                                }}
                                onClick={() => navigate(`/addmovie/${i.id}`)}
                            >
                                {`Add ${i.name}`}
                            </Button>
                        </Space>
                    ),
                });
            });
    }

    const deleteCategories = (e) => {
        console.log('deleteCategory : ', e);
        dispatch(deleteCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(listCategory());
        }, 300);
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
                    deleteCategories(categoryId);
                }}
                title="Are you sure you want to delete this Category?"
            />
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
