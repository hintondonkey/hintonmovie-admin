import { Image, Menu } from 'antd';
import React, { useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default function MenuNavigator() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getAcount());
    }, []);
    const user = useSelector((state) => state?.auth?.user);

    const items = [
        getItem('Account', 'accp', <IoAddCircleOutline size={20} />, [
            getItem('Create', '/createAccount', null),
            getItem('List User', '/listUsers', null),
        ]),
        getItem(
            'Business Admin',
            '/businessAdmin',
            <IoAddCircleOutline size={20} />,
            [
                getItem('Create', '/createBusinessAdmin', null),
                getItem('Overview', '/listBusinessAdmin', null),
            ]
        ),
        {
            type: 'divider',
        },
        getItem('Home', '/listmovie', <HiOutlineHome size={20} />),
        getItem('Add Movie', '/addmovie', <IoAddCircleOutline size={20} />),
        {
            label: 'Logout',
            // link: '', // Có thể để trống hoặc gán giá trị null nếu không có link
            icon: <AiOutlineLogout size={20} />,
            onClick: () => {
                handleLogout(); // Gọi hàm handleLogout khi nhấp vào mục 'Logout'
            },
        },
        getItem('Category', '/categories', <IoAddCircleOutline size={20} />, [
            getItem('Create', '/createCategory', null),
            getItem('List', '/listCategory', null),
        ]),
        getItem(
            'Sub Category',
            '/subCategory',
            <IoAddCircleOutline size={20} />,
            [
                getItem('Create', '/createSubCategory', null),
                getItem('List', '/listSubCategory', null),
            ]
        ),
    ];

    const Business_Admin = [
        // getItem('Account', 'accp', <IoAddCircleOutline size={20} />, [
        //     getItem('Create', '/createAccount', null),
        //     getItem('List User', '/listUsers', null),
        // ]),
        // getItem(
        //     'Business Admin',
        //     '/businessAdmin',
        //     <IoAddCircleOutline size={20} />,
        //     [
        //         getItem('Create', '/createBusinessAdmin', null),
        //         getItem('Overview', '/listBusinessAdmin', null),
        //     ]
        // ),
        {
            type: 'divider',
        },
        getItem('Home', '/listmovie', <HiOutlineHome size={20} />),
        // getItem('Add Movie', '/addmovie', <IoAddCircleOutline size={20} />),
        {
            label: 'Logout',
            // link: '', // Có thể để trống hoặc gán giá trị null nếu không có link
            icon: <AiOutlineLogout size={20} />,
            onClick: () => {
                handleLogout(); // Gọi hàm handleLogout khi nhấp vào mục 'Logout'
            },
        },
        getItem('Add Movie', '/categories', <IoAddCircleOutline size={20} />, [
            // getItem('Create', '/createCategory', null),
            getItem('Create Movie', '/listCategory', null),
        ]),
        getItem(
            'Sub Category',
            '/subCategory',
            <IoAddCircleOutline size={20} />,
            [
                getItem('Create', '/createSubCategory', null),
                getItem('List', '/listSubCategory', null),
            ]
        ),
    ];

    const handleLogout = () => {
        window.location.href = '/';
        localStorage.clear();
    };
    return (
        <div
            style={{
                height: '100%',
                backgroundColor: '#001529',
                padding: '24px 0',
                position: 'relative',
            }}
        >
            <div
                style={{
                    borderRadius: 25,
                    width: '50%',
                    overflow: 'hidden',
                    margin: 'auto',
                }}
            >
                <Image
                    height={100}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    preview={false}
                />
            </div>
            <div style={{ padding: '16px 0' }}>
                <h5 style={{ color: '#fff' }}> {user.username}</h5>
            </div>

            <div
                style={{
                    padding: '24px 0',
                }}
            >
                <Menu
                    defaultSelectedKeys={[window.location.pathname]}
                    defaultOpenKeys={['/listmovie']}
                    mode="inline"
                    theme="dark"
                    items={
                        user &&
                        user.roles &&
                        (user.roles.account_type === null ||
                            user.roles.account_type === 'Editor') &&
                        user.roles.broker_id === 1
                            ? items
                            : Business_Admin
                    }
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                ></Menu>
            </div>
        </div>
    );
}
