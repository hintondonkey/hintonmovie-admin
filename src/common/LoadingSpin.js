import { Spin } from 'antd';
import React from 'react';

export default function LoadingSpin() {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
        >
            <Spin tip="Loading" size="large"></Spin>
        </div>
    );
}
