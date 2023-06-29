import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';

import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpin from '../../common/LoadingSpin';
import '../../constants/colors';
import { SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { EditMovieRequest } from '../../models/edit_movie_request';
import { postcreateMovie, putMovie } from '../../services/UserService';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import { SHOW_SUCCESS_MESSAGE } from '../../utility/AlertUtility';
import dayjs from 'dayjs';
import { getImageUid, uploadImage } from '../../services/Firebase';

const token = localStorage.getItem('mytoken');

const config_json = {
    headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
    },
};

export default function AddMoviePage() {
    const [form] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [listTicket, setListTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        description: '',
        show_date: '',
        time_show_date: '',
        close_date: '',
        time_close_date: '',
        active: true,
        titleNoti: '',
        summaryNoti: '',
        imgae: null,
    });

    const location = useLocation();
    const { state } = location;

    console.log('state', state);

    const navigate = useNavigate();

    useEffect(() => {
        if (state !== null && state !== undefined) {
            let item = state.item;

            let show_date = dayjs(
                item.show_date + ' ' + item.time_show_date,
                'YYYY-MM-DD HH:mm'
            );
            let close_date = dayjs(
                item.close_date + ' ' + item.time_close_date,
                'YYYY-MM-DD HH:mm'
            );

            form.setFieldsValue({
                movie_title: item.title,
                summary: item.description,
                show_date: show_date,
                close_date,
                notification_title: item.titleNoti,
                notification_summary: item.summaryNoti,
            });

            setMovie({
                id: item.id,
                title: item.title,
                description: item.description,
                show_date: item.show_date,
                time_show_date: item.time_show_date,
                close_date: item.close_date,
                time_close_date: item.time_close_date,
                active: true,
                image: item.image,
                titleNoti: item.titleNoti,
                summaryNoti: item.summaryNoti,
            });

            setListTicket(
                item.watchlist.map((i) => {
                    return {
                        id: i.id,
                        datePicker: moment(i.date_picker, 'YYYY-MM-DD'),
                        datePickerStr: i.date_picker,
                        timeShowDate: moment(i.time_show_date, 'HH:mm'),
                        timeShowDateStr: i.time_show_date,
                        price: i.price,
                        website: i.website,
                    };
                })
            );
        } else {
            form.resetFields();
            formTicket.resetFields();
            setListTicket([]);
            setMovie({ ...movie, image: null });
        }
    }, [state]);

    const handleUpdateMovie = async (movie) => {
        console.log('handleUpdateMovie : ', movie);
        const data = {
            show_date: moment(movie.show_date).format('YYYY-MM-DD'),
            time_show_date: movie.time_show_date,
            close_date: moment(movie.close_date).format('YYYY-MM-DD'),
            time_close_date: movie.time_close_date,
            title: movie.title,
            stream_flatform_image: { uid: movie.image, uid2: movie.image },
            sub_icon: { uid: movie.sub_icon },
            description: movie.description,
            titleNoti: movie.titleNoti,
            summaryNoti: movie.summaryNoti,
            ischecked: movie.active,
        };
        console.log(data);

        // await putMovie(data, config_json, movie.id).then((res) => {
        //     console.log('res put movie', res);
        //     SHOW_SUCCESS_MESSAGE('Update Movie Success !!!');
        //     navigate('/listmovie');
        // });
    };

    const handleClickSaveMovie = () => {
        form.validateFields()
            .then((val) => {
                console.log('Submit form');
                console.log('listTicket', listTicket);
                if (listTicket === null || listTicket.length === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Please input ticket !!!',
                        showConfirmButton: true,
                    }).then((result) => {});
                } else {
                    form.submit();
                }
            })
            .catch((erorr) => {
                console.log('error', erorr);
            });
    };

    const mapTicketToRequest = (listTicket) => {
        return listTicket.map((item) => {
            return {
                date_picker: item.datePickerStr,
                time_show_date: item.timeShowDateStr,
                price: item.price,
                website: item.website,
            };
        });
    };

    const handleCreateMovie = async (movie, listObjectImage) => {
        console.log('movie: ', movie);

        let requestImageObject = {};

        // Bước upload hình
        try {
            listObjectImage.forEach((objectImage) => {
                console.log('t123  1', objectImage);

                uploadImage(objectImage, (url) => {
                    let keyName = getImageUid(url);
                    requestImageObject[keyName] = url;
                });
            });
        } catch (e) {}

        var editMovieRequest = new EditMovieRequest(
            mapTicketToRequest(listTicket),
            movie.title,
            movie.description,
            movie.show_date,
            movie.time_show_date,
            movie.close_date,
            movie.time_close_date,
            movie.active,
            movie.titleNoti,
            movie.summaryNoti,
            movie.image
        );
        setLoading(true);

        console.log('editMovieRequest', editMovieRequest);

        if (state !== null && state !== undefined) {
            // TODO: Call 2 api 1 lúc
            handleUpdateMovie(movie);
        } else {
            postcreateMovie(JSON.stringify(editMovieRequest), config_json)
                .then((res) => {
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Create Success !!!',
                            showConfirmButton: false,
                            timer: 1500,
                        }).then((result) => {
                            navigate('/listmovie');
                        });
                    }, 1000);
                })
                .catch((error) => console.log('Error:', error));
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    {state === null || state === undefined
                        ? ' ADD NEW MOVIE'
                        : 'EDIT MOVIE'}
                </h2>
            </Col>
            <Col offset={14}>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        width: 200,
                        backgroundColor: SUCCESS_COLOR,
                    }}
                    onClick={handleClickSaveMovie}
                >
                    <FiSave size={25} style={{ marginRight: 8 }} />
                    Save Movie
                </Button>
            </Col>
        </Row>
    );

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100%' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col flex={1}>
                    <div
                        style={{
                            padding: '24px ',
                            backgroundColor: '#E8E9EB',
                            marginBottom: 16,
                        }}
                    >
                        {_buildHeader()}
                    </div>

                    <MovieForm
                        form={form}
                        handleCreateMovie={handleCreateMovie}
                        movie={movie}
                        setMovie={setMovie}
                    />
                    <TicketForm
                        listTicket={listTicket}
                        setListTicket={setListTicket}
                        formTicket={formTicket}
                    />
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
