import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import Header from './Header';
import Form from 'react-bootstrap/Form';
import './AddMovieTicket.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import TableTicket from './DataTicketMovie';
import { postcreateMovie, putMovie } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addMonths } from 'date-fns';

const AddMovieTicket = (props) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('mytoken');
    const [file, setFile] = useState();
    const [startDate, setStartDate] = useState(null);
    const [closeDate, setCloseDate] = useState(null);
    const [movieTitle, setMovieTitle] = useState('');
    const [movieSummary, setMovieSummary] = useState('');
    const [ischecked, setIsChecked] = useState(false);

    const [titleNoti, setTitleNoti] = useState('');
    const [summaryNoti, setSummaryNoti] = useState('');

    let handleColor = (time) => {
        return time.getHours() > 12 ? 'text-success' : 'text-error';
    };

    const [ticketInfo, setTicketInfo] = useState({
        id: '',
        date_picker: '',
        time_show_date: '',
        price: '',
        website: '',
    });
    const [ticketInfoList, setTicketInfoList] = useState([]);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Token ${token}`,
        },
    };

    const config_json = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`,
        },
    };

    useEffect(() => {
        // if (!token) {
        //   window.location.href = '/'
        //   return
        // }
    }, [token]);

    // useEffect(() => {
    //   window.location.reload();
    //   return
    // })

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    const handleChangeInput = (setValue) => {
        return (e) => {
            setValue(e.target.value);
        };
    };

    const handleAddTicketInfo = () => {
        setTicketInfoList([
            ...ticketInfoList,
            {
                ...ticketInfo,
                id: new Date().getTime(),
                date_picker: moment(ticketInfo.date_picker).format(
                    'YYYY-MM-DD'
                ),
                time_show_date: ticketInfo.time_show_date
                    .toLocaleTimeString()
                    .slice(0, -3),
            },
        ]);
        setTicketInfo({});
    };

    const onEditTicketInfo = (data) => {
        setTicketInfo({
            ...data,
            date_picker: new Date(data.date_picker),
            time_show_date: new Date(
                `${data.date_picker} ${data.time_show_date}`
            ),
        });
    };
    const onDeleteTicketInfo = (data) => {
        const ticketInfoListFilter = ticketInfoList.filter(
            (tk) => tk.id !== data.id
        );
        setTicketInfoList(ticketInfoListFilter);
    };

    const handleCreateMovie = async () => {
        ticketInfoList.forEach((tk) => delete tk.id);
        if (!file) {
            toast.error('Please input Image!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (startDate === null) {
            toast.error('Please input start Date!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (closeDate === null) {
            toast.error('Please input Close Date!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!movieTitle) {
            toast.error('Please input Movie Title!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!movieSummary) {
            toast.error('Please input Movie Summary!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (movieTitle.length === movieSummary.length) {
            toast.error('movie title and movie summary must be different !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (ticketInfoList?.length === 0) {
            toast.error('Please create a ticket before saving !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (ischecked) {
            if (!titleNoti) {
                toast.error('Please input Title Notification!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            }
            if (!summaryNoti) {
                toast.error('Please input Summary Notification!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            }
        }
        if (
            ticketInfoList?.length > 0 &&
            startDate &&
            closeDate &&
            movieTitle &&
            movieSummary
        ) {
            const data = {
                title: movieTitle,
                description: movieSummary,
                show_date: moment(startDate).format('YYYY-MM-DD'),
                time_show_date: startDate.toLocaleTimeString().slice(0, -3),
                close_date: moment(closeDate).format('YYYY-MM-DD'),
                time_close_date: closeDate.toLocaleTimeString().slice(0, -3),
                titleNoti: titleNoti,
                summaryNoti: summaryNoti,
                watchlist: ticketInfoList,
            };
            const res = await postcreateMovie(data, config_json);
            console.log(res);
            if (res) {
                const data_image = {
                    image: file,
                    ischecked: false,
                };
                const res_image = await putMovie(data_image, config, res.id);
                if (res_image) {
                    navigate('/listmovie');
                    toast.success('Create Movie Success !', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        }
    };

    return (
        <div>
            <Header />
            <br />
            <br />
            <div className="container mt-5 movie-ticket">
                <div className="mb-3">
                    <h2>Add Image</h2>
                    <img
                        alt="Hình"
                        src={file ? URL.createObjectURL(file) : ''}
                        className="responsive"
                    />
                    <input type="file" onChange={handleChange} />
                    <button
                        onClick={handleCreateMovie}
                        className="btn btn-success"
                    >
                        Create Movie
                    </button>
                </div>
                <div className="mb-3">
                    <h2>Show Date</h2>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeClassName={handleColor}
                        minDate={new Date()}
                        maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                    />
                </div>
                <div className="mb-3">
                    <h2>Close Date</h2>
                    <DatePicker
                        selected={closeDate}
                        onChange={(date) => setCloseDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeClassName={handleColor}
                        minDate={new Date()}
                        maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                    />
                </div>

                <div className="mb-3">
                    <h2>Movie Title</h2>
                    <input
                        value={movieTitle}
                        onChange={handleChangeInput(setMovieTitle)}
                    />
                </div>

                <div className="mb-3">
                    <h2>Summary</h2>
                    <textarea
                        value={movieSummary}
                        rows={3}
                        onChange={handleChangeInput(setMovieSummary)}
                    />
                </div>
                <div className="mb-3">
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={ischecked}
                            onChange={() => setIsChecked(!ischecked)}
                        />
                        Push Notification App
                    </label>
                </div>
                {ischecked && (
                    <div>
                        <div className="mb-3">
                            <h2>Title Notification</h2>
                            <input
                                value={titleNoti}
                                onChange={handleChangeInput(setTitleNoti)}
                            />
                        </div>

                        <div className="mb-3">
                            <h2>Message Notification</h2>
                            <textarea
                                value={summaryNoti}
                                rows={3}
                                onChange={handleChangeInput(setSummaryNoti)}
                            />
                        </div>
                    </div>
                )}
                <hr />
                <div className="d-flex justify-content-center">
                    <h3>Ticket Information</h3>
                    <div>
                        <button
                            onClick={handleAddTicketInfo}
                            className="btn btn-success mx-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={() =>
                                setTicketInfo({
                                    id: '',
                                    date_picker: '',
                                    time_show_date: '',
                                    price: '',
                                    website: '',
                                })
                            }
                            className="btn btn-danger"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <h2>Date picker</h2>
                    <DatePicker
                        selected={ticketInfo.date_picker}
                        onChange={(date) => {
                            setTicketInfo({
                                ...ticketInfo,
                                date_picker: date,
                            });
                        }}
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy"
                        className="text-center"
                        timeClassName={handleColor}
                        minDate={new Date()}
                        maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                    />
                </div>

                <div className="mb-3">
                    <h2>Time</h2>
                    <DatePicker
                        selected={ticketInfo.time_show_date}
                        onChange={(date) => {
                            setTicketInfo({
                                ...ticketInfo,
                                time_show_date: date,
                            });
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm aa"
                        className="text-center"
                        popperPlacement="bottom-end"
                    />
                </div>

                <div className="mb-3">
                    <h2>Price</h2>
                    <input
                        onChange={(e) => {
                            setTicketInfo({
                                ...ticketInfo,
                                price: Number(e.target.value),
                            });
                        }}
                        name="price"
                        className="text-center"
                        autoComplete="off"
                        value={ticketInfo?.price || ''}
                    />
                </div>

                <div className="mb-3">
                    <h2>Link to ticket</h2>
                    <input
                        onChange={(e) => {
                            setTicketInfo({
                                ...ticketInfo,
                                website: e.target.value,
                            });
                        }}
                        name="website"
                        className="text-center"
                        autoComplete="off"
                        value={ticketInfo?.website || ''}
                    />
                </div>
                <div className="mb-3"></div>
                <TableTicket
                    onEditTicketInfo={onEditTicketInfo}
                    onDeleteTicketInfo={onDeleteTicketInfo}
                    ticketInfoList={ticketInfoList}
                />
            </div>
        </div>
    );
};

export default AddMovieTicket;
