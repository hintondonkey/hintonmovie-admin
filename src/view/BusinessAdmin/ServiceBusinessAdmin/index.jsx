import { Col, Row, Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import './ServiceAccount.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    UpdateCategoryActive,
    getCategoryFllowBroker,
} from '../../../services/category/categorySlice';

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        width: 50,
    },
    {
        title: 'Business Name',
        dataIndex: 'businessName',
        key: 'businessName',
    },
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Business Type',
        dataIndex: 'businessType',
        key: 'category',
        width: 150,
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        width: 200,
        // render: (value) => (
        //     <Switch
        //         className="switch_status"
        //         checkedChildren="Active"
        //         unCheckedChildren="Inactive"
        //         style={{ width: 100 }}
        //     />
        // ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price ',
        render: (val) => <>${val}</>,
    },
];

export default function ServiceBusinessAdmin() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getIdBroker = location?.pathname?.split('/')[2];
    const [checked, setChecked] = useState(false);
    // const { isSuccess, isError, isLoading, createAccount, updateAccount } =
    //     current_category;

    useEffect(() => {
        dispatch(getCategoryFllowBroker(getIdBroker));
    }, [getIdBroker]);

    const CategoryFllowBrokers = useSelector(
        (state) => state?.category?.CategoryFllowBroker
    );

    const datas = [];

    const handleChange = (id, is_active) => {
        const active = { is_active: is_active };
        const data = { id: id, active: active };
        dispatch(UpdateCategoryActive(data));
        setTimeout(() => {
            dispatch(getCategoryFllowBroker(getIdBroker));
        }, 3000);
    };
    if (CategoryFllowBrokers && CategoryFllowBrokers.length > 0) {
        for (let i = 0; i < CategoryFllowBrokers.length; i++) {
            datas.push({
                index: i + 1,
                businessName: CategoryFllowBrokers[i].broker.name,
                serviceName: CategoryFllowBrokers[i].name,
                businessType: CategoryFllowBrokers[i].broker.business_type.name,
                price: CategoryFllowBrokers[i].price,
                active: (
                    <Switch
                        className="switch_status"
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                        defaultChecked={
                            CategoryFllowBrokers[i].is_active === true
                                ? true
                                : false
                        }
                        style={{ width: 100 }}
                        onChange={() =>
                            handleChange(
                                CategoryFllowBrokers[i].id,
                                !CategoryFllowBrokers[i].is_active
                            )
                        }
                    />
                ),
            });
        }
    }

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
                    ></div>

                    <div
                        style={{
                            backgroundColor: '#F5F5F5',

                            height: '100vh',
                            paddingTop: 24,
                        }}
                    >
                        <Tag
                            color="#1F6C97"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                fontSize: 30,
                                padding: 16,
                                width: 300,
                                margin: 'auto',
                            }}
                        >
                            <div>Total:</div>
                            <div>$40.00</div>
                        </Tag>
                        <div
                            style={{ width: '100%', padding: 16, marginTop: 8 }}
                        >
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
