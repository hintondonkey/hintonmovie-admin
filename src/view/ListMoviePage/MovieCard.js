import { Card, Col, Image, Row, Tooltip } from 'antd';
import React from 'react';
import { SUCCESS_COLOR, WARNING_COLOR } from '../../constants/colors';
import { useLocation } from 'react-router-dom';

export default function MovieCard(props) {
    let { item, handleOpenDetailMovie } = props;

    return (
        <Col
            span={6}
            lg={6}
            md={8}
            sm={12}
            xs={24}
            onClick={() => {
                handleOpenDetailMovie(item);
            }}
            style={{ cursor: 'pointer' }}
        >
            <div
                style={{
                    padding: 0,
                    borderRadius: 16,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    boxShadow:
                        'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                }}
            >
                <div
                    style={{
                        height: 300,
                    }}
                >
                    <img
                        style={{ height: '100%', width: '100%' }}
                        src={item.image}
                        alt="Poster of Movie"
                    />
                </div>
                <div style={{ textAlign: 'left', padding: 8 }}>
                    <Tooltip title={item.title}>
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold',
                                fontFamily: 'Trocchi',
                                fontSize: 30,
                                textAlign: 'center',

                                color: '#7c795d',
                            }}
                        >
                            {item.title}
                        </div>
                    </Tooltip>
                    <Row>
                        <Col style={{ textAlign: 'center' }} span={12}>
                            <p style={{ color: '#CCCDC6' }}>Start:</p>
                            <p style={{ fontSize: 18, color: SUCCESS_COLOR }}>
                                {item.show_date}
                            </p>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={12}>
                            <p style={{ color: '#CCCDC6' }}>End:</p>
                            <p style={{ fontSize: 18, color: WARNING_COLOR }}>
                                {item.close_date}
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    );
}
