import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './Header';
import './AddMovieTicket.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-datepicker/dist/react-datepicker.css';
import TableTicket from './DataTicketMovie';
import { useNavigate, useParams } from 'react-router-dom';
import {
    addWatchlist,
    deleteWathlist,
    editWatchlist,
    getMovieById,
    putMovie,
} from '../services/UserService';
import { addMonths } from 'date-fns';

const EditMovieTicket = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieSelected, setMovieSelected] = useState(null);
    const [watchSelected, setWatchSelected] = useState(null);
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
        date: '',
        time: '',
        price: '',
        link: '',
    });
    const [ticketInfoList, setTicketInfoList] = useState([]);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Token ${token}`,
        },
    };

    const handleGetMovieById = async (id) => {
        let res = await getMovieById(config, id);
        setMovieSelected(res);
        setStartDate(new Date(`${res.show_date} ${res.time_show_date}`));
        setCloseDate(new Date(`${res.close_date} ${res.time_close_date}`));

        setMovieTitle(res.title);
        setMovieSummary(res.description);
        setFile(res.image);
        setTitleNoti(res.titleNoti);
        setSummaryNoti(res.summaryNoti);

        setTicketInfoList(res.watchlist);
    };

    useEffect(() => {
        handleGetMovieById(id);
    }, [id]);

    useEffect(() => {
        // if (!token) {
        //   window.location.href = '/'
        //   return
        // }
    }, [token]);

    function handleChange(e) {
        // setFile(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    const handleChangeInput = (setValue) => {
        return (e) => {
            setValue(e.target.value);
        };
    };

    const handleUpdateTicketInfo = async () => {
        if (watchSelected) {
            await editWatchlist(watchSelected, config, watchSelected.id);
        } else {
            await addWatchlist(
                {
                    date_picker: moment(ticketInfo.date).format('YYYY-MM-DD'),
                    price: Number(ticketInfo.price),
                    website: ticketInfo.link,
                    time_show_date: ticketInfo.time
                        .toLocaleTimeString()
                        .slice(0, -3),
                    platform: id,
                },
                config
            );
        }
        await handleGetMovieById(id);
        setWatchSelected(null);
        setTicketInfo({
            date: '',
            time: '',
            price: '',
            link: '',
        });
    };

    const onEditTicketInfo = (data) => {
        setWatchSelected(data);
    };

    const onDeleteTicketInfo = async (data) => {
        await deleteWathlist(config, data.id);
        handleGetMovieById(id);
    };

    const handleUpdateMovie = async () => {
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
                ...movieSelected,
                image: file,
                show_date: moment(startDate).format('YYYY-MM-DD'),
                time_show_date: startDate.toLocaleTimeString().slice(0, -3),
                close_date: moment(closeDate).format('YYYY-MM-DD'),
                time_close_date: closeDate.toLocaleTimeString().slice(0, -3),
                title: movieTitle,
                description: movieSummary,
                titleNoti: titleNoti,
                summaryNoti: summaryNoti,
                ischecked: ischecked,
            };

            if (typeof data.image === 'string') {
                delete data.image;
            }
            await putMovie(data, config, id);
            navigate('/listmovie');
        }
    };

    const handleClearAllTicketInfo = async () => {
        setTicketInfo({
            date: '',
            time: '',
            price: '',
            link: '',
        });
        setWatchSelected(null);
    };

    return (
        <div>
            <Header />
            <br />
            <br />
            <div className="container mt-5 movie-ticket">
                <div className="mb-3">
                    <h2>Edit Image</h2>
                    <img
                        src={
                            file
                                ? typeof file === 'string'
                                    ? file
                                    : URL.createObjectURL(file)
                                : ''
                        }
                        className="mx-2 rounded responsive"
                    />
                    <input type="file" onChange={handleChange} />
                    <button
                        onClick={handleUpdateMovie}
                        className="btn btn-success"
                    >
                        Save
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
                            onClick={handleUpdateTicketInfo}
                            className="btn btn-success mx-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleClearAllTicketInfo}
                            className="btn btn-danger"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <h2>Date picker</h2>
                    <DatePicker
                        selected={
                            watchSelected
                                ? new Date(watchSelected?.date_picker)
                                : ticketInfo.date
                        }
                        onChange={(date) => {
                            watchSelected
                                ? setWatchSelected({
                                      ...watchSelected,
                                      date_picker:
                                          moment(date).format('YYYY-MM-DD'),
                                  })
                                : setTicketInfo({
                                      ...ticketInfo,
                                      date,
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
                        selected={
                            watchSelected
                                ? new Date(
                                      `${watchSelected?.date_picker} ${watchSelected?.time_show_date}`
                                  )
                                : ticketInfo.time
                        }
                        onChange={(date) => {
                            watchSelected
                                ? setWatchSelected({
                                      ...watchSelected,
                                      time_show_date: date
                                          .toLocaleTimeString()
                                          .slice(0, -3),
                                  })
                                : setTicketInfo({
                                      ...ticketInfo,
                                      time: date,
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
                            watchSelected
                                ? setWatchSelected({
                                      ...watchSelected,
                                      price: Number(e.target.value),
                                  })
                                : setTicketInfo({
                                      ...ticketInfo,
                                      price: e.target.value,
                                  });
                        }}
                        name="price"
                        className="text-center"
                        autoComplete="off"
                        value={
                            watchSelected
                                ? watchSelected?.price
                                : ticketInfo.price
                        }
                    />
                </div>

                <div className="mb-3">
                    <h2>Link to ticket</h2>
                    <input
                        onChange={(e) => {
                            watchSelected
                                ? setWatchSelected({
                                      ...watchSelected,
                                      website: e.target.value,
                                  })
                                : setTicketInfo({
                                      ...ticketInfo,
                                      link: e.target.value,
                                  });
                        }}
                        name="link"
                        className="text-center"
                        autoComplete="off"
                        value={
                            watchSelected
                                ? watchSelected?.website
                                : ticketInfo.link
                        }
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

export default EditMovieTicket;
