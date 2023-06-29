import { Button, Card, Col, Pagination, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSpin from '../../common/LoadingSpin';
import MenuNavigator from '../../components/MenuNavigator';
import { INFO_COLOR } from '../../constants/colors';
import { getAllMovie } from '../../services/UserService';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import MovieTable from './MovieTable';
import axios from '../../axios';
import { config } from '../../utility/axiosconfig';

export default function ListMoviePage() {
    const [loading, setLoading] = useState(false);
    const [listMovie, setListMovie] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [isCard, setIsCard] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        apiGetAllMovie();
    }, []);

    const handleOpenDetailMovie = (item) => {
        navigate(`/addmovie/${item.id}`, { state: { item } });
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    LIST MOVIE
                </h2>
            </Col>
        </Row>
    );

    const apiGetAllMovie = async () => {
        // setLoading(true);
        // let res = await getAllMovie(config);
        // console.log(res);
        // setLoading(false);
        // setTotalItem(res.length);
        // // Đảo ngược list để lấy phim có ngày tạo mới nhất
        // setListMovie(res.reverse());
    };

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100vh' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col span={20}>
                    <div
                        style={{
                            padding: '24px ',
                            backgroundColor: '#E8E9EB',
                            marginBottom: 16,
                        }}
                    >
                        {_buildHeader()}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'flex-start',
                            paddingLeft: 16,
                        }}
                    >
                        <Switch
                            style={{
                                width: 80,
                                textAlign: 'left',
                                alignItems: 'left',
                            }}
                            checkedChildren="Card"
                            unCheckedChildren="Table"
                            onChange={(val) => {
                                setIsCard(val);
                            }}
                        />
                    </div>
                    {isCard === false ? (
                        <MovieTable
                            data={
                                listMovie &&
                                listMovie.length > 0 &&
                                listMovie.map((item) => {
                                    let abc = { ...item };
                                    abc.key = item.id;
                                    return abc;
                                })
                            }
                            handleOpenDetailMovie={handleOpenDetailMovie}
                        />
                    ) : (
                        // <FilterTable />
                        <Col style={{ backgroundColor: 'white' }}>
                            <Row gutter={[24, 24]} style={{ padding: 16 }}>
                                {listMovie &&
                                    listMovie.length > 0 &&
                                    listMovie.map((item) => (
                                        <MovieCard
                                            key={item.id}
                                            item={item}
                                            handleOpenDetailMovie={
                                                handleOpenDetailMovie
                                            }
                                        />
                                    ))}
                            </Row>
                        </Col>
                    )}
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
