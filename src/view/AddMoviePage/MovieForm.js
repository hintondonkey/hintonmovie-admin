import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Switch,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { uploadImage } from '../../services/Firebase';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { PRIMARY_COLOR } from '../../constants/colors';
import { MdOutlineDeleteOutline } from 'react-icons/md';

dayjs.extend(customParseFormat);
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function MovieForm(props) {
    let { form, handleCreateMovie, movie, setMovie } = props;
    const [ischecked, setIsChecked] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    var [listObjectImage, setListObjectImage] = useState([]);
    const [listImageUrl, setListImageUrl] = useState([]);
    const [listSubIcon, setListSubIcon] = useState([]);

    const [isFramePoster, setIsFramePoster] = useState(true);

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };
    // const disabledDateTime = () => ({
    //     disabledHours: () => range(0, 24).splice(4, 20),
    //     disabledMinutes: () => range(30, 60),
    //     disabledSeconds: () => [55, 56],
    // });

    const handleFileChange = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.onload = (e) => {
                const url = e.target.result;
                setListImageUrl((preList) => [...preList, url]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePreview = async (file) => {
        console.log('handlePreview', file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        );
    };
    const handleChangeUploadImage = (val) => {
        listObjectImage.push(val.file);

        handleFileChange(val.fileList[val.fileList.length - 1].originFileObj);
    };

    const handleChangeUploadSubIcon = ({ fileList }) => {
        setListSubIcon(fileList);
    };

    const handleActionUploadImage = async (file) => {
        await uploadImage(file, changeMovieURL);
    };
    const changeMovieURL = (url) => {
        setMovie({ ...movie, image: url });
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
    };

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    const handleDeleteImage = (linkUrl, index) => {
        listObjectImage.splice(index, 1);
        setListImageUrl((preList) => {
            var cloneArray = [...preList];
            return cloneArray.filter((obj) => obj !== linkUrl);
        });
    };

    console.log(movie);
    // useEffect(()=>{
    //     if(movie && movie.image !== null) {
    //         setFileList([movie?.image]);
    //     }
    // },[]);
    console.log('list image', listImageUrl);

    return (
        <div
            style={{
                width: '85%',
                padding: '24px 24px 24px 24px',
                borderRadius: '25px',
                backgroundColor: '#E8E9EB',
                margin: 'auto',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                marginBottom: 24,
            }}
        >
            <Form
                form={form}
                size={'large'}
                layout="horizontal"
                name="movieForm"
                onFinish={() => {
                    handleCreateMovie(movie, listObjectImage);
                }}
            >
                <Form.Item
                    name="subcategory"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Subcategory',
                        },
                    ]}
                    labelCol={{ span: 3 }}
                    label="Sub Category"
                >
                    <Select
                        placeholder="Sub Category"
                        // onChange={(val) => {
                        //     handleEnableButton();
                        // }}
                    >
                        <Select.Option value="editor">Editor</Select.Option>
                        <Select.Option value="supervisor">
                            Supervisor
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="movie_title"
                    label="Movie Title"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title',
                        },
                    ]}
                >
                    <Input
                        onChange={(val) =>
                            setMovie({ ...movie, title: val.target.value })
                        }
                        value={movie.title}
                    />
                </Form.Item>
                <Form.Item
                    name="summary"
                    label="Summary"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input summary',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Max length is 1000"
                        maxLength={1000}
                        onChange={(val) =>
                            setMovie({
                                ...movie,
                                description: val.target.value,
                            })
                        }
                        value={movie.description}
                    />
                </Form.Item>
                <Row>
                    <Col className="gutter-row" span={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'left',
                                marginLeft: 16,
                            }}
                        >
                            <Form.Item
                                name="show_date"
                                label="Event Date"
                                labelCol={{ span: 8 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose event date',
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{
                                        defaultValue: dayjs(
                                            '00:00:00',
                                            'HH:mm'
                                        ),
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    disabledDate={disabledDate}
                                    onChange={(val, valString) => {
                                        console.log('val show_date', val);
                                        setMovie({
                                            ...movie,
                                            show_date: valString.split(' ')[0],
                                            time_show_date:
                                                valString.split(' ')[1],
                                        });
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'left',
                                marginLeft: 16,
                            }}
                        >
                            <Form.Item
                                name="close_date"
                                label="End Event Date"
                                labelCol={{ span: 9 }}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please choose end event date date',
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{
                                        defaultValue: dayjs(
                                            '00:00:00',
                                            'HH:mm'
                                        ),
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    disabledDate={disabledDate}
                                    onChange={(val, valString) => {
                                        setMovie({
                                            ...movie,
                                            close_date: valString.split(' ')[0],
                                            time_close_date:
                                                valString.split(' ')[1],
                                        });
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'left',
                                marginLeft: 16,
                            }}
                        >
                            <Form.Item
                                name="post_date"
                                label="Post Date"
                                labelCol={{ span: 8 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose post date',
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{
                                        defaultValue: dayjs(
                                            '00:00:00',
                                            'HH:mm'
                                        ),
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    disabledDate={disabledDate}
                                    onChange={(val, valString) => {}}
                                />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'left',
                                marginLeft: 16,
                            }}
                        >
                            <Form.Item
                                name="end_post_date"
                                label="End Post Date"
                                labelCol={{ span: 9 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose end post date',
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{
                                        defaultValue: dayjs(
                                            '00:00:00',
                                            'HH:mm'
                                        ),
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    disabledDate={disabledDate}
                                    onChange={(val, valString) => {}}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Form.Item
                    label="Send Notification"
                    valuePropName="checked"
                    labelCol={{ span: 3 }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'left',
                            marginLeft: 16,
                        }}
                    >
                        <Switch
                            defaultChecked={ischecked}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            style={{ width: 70 }}
                            onChange={() => setIsChecked(!ischecked)}
                        />
                    </div>
                </Form.Item>
                {ischecked && (
                    <div>
                        <Form.Item
                            name="notification_title"
                            label="Notification Title"
                            labelCol={{ span: 4 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input notification title',
                                },
                            ]}
                        >
                            <Input
                                onChange={(val) =>
                                    setMovie({
                                        ...movie,
                                        titleNoti: val.target.value,
                                    })
                                }
                                value={movie.titleNoti}
                            />
                        </Form.Item>
                        <Form.Item
                            name="notification_summary"
                            label="Notification Summary"
                            labelCol={{ span: 4 }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input notification summary',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Max length is 1000"
                                maxLength={1000}
                                onChange={(val) =>
                                    setMovie({
                                        ...movie,
                                        summaryNoti: val.target.value,
                                    })
                                }
                                value={movie.summaryNoti}
                            />
                        </Form.Item>
                    </div>
                )}
                {/* <Form.Item
                    name="fileList"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChangeUploadImage}
                        maxCount={1}
                        action={handleActionUploadImage}
                    >
                        {movie.image ? (
                            fileList.length >= 1 ? null : (
                                <img
                                    src={movie.image}
                                    alt="avatar"
                                    style={{ width: '100%' }}
                                />
                            )
                        ) : fileList.length >= 1 ? null : (
                            uploadButton
                        )}
                    </Upload>
                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleClosePreview}
                    >
                        <img
                            alt="poster movie"
                            style={{ width: '100%' }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item> */}
                <Form.Item label="Images" labelCol={{ span: 3 }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'left',
                            marginLeft: 16,
                        }}
                    >
                        <Switch
                            defaultChecked={isFramePoster}
                            checkedChildren="Poster"
                            unCheckedChildren="Landscape"
                            style={{
                                width: 100,
                                backgroundColor: PRIMARY_COLOR,
                            }}
                            onChange={() => setIsFramePoster(!isFramePoster)}
                        />
                    </div>
                </Form.Item>
                <Row>
                    {listImageUrl.length === 0 ? <Col span={3}></Col> : null}
                    {listImageUrl.map((val, index) => (
                        <Col style={{ marginTop: 12 }}>
                            <PhotoProvider>
                                <PhotoView key={1} src={val}>
                                    <img
                                        width={isFramePoster ? 200 : 400}
                                        height={300}
                                        src={val ? val : ''}
                                        alt=""
                                        style={{
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 15,
                                        }}
                                    />
                                </PhotoView>
                            </PhotoProvider>
                            <div>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() =>
                                        handleDeleteImage(val, index)
                                    }
                                >
                                    <MdOutlineDeleteOutline size={20} />
                                </Button>
                            </div>
                        </Col>
                    ))}

                    <Col>
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            fileList={listImageUrl}
                            onChange={handleChangeUploadImage}
                        >
                            {listImageUrl.length >= 5
                                ? null
                                : uploadButton('Upload Image')}
                        </Upload>
                    </Col>
                </Row>
                <Form.Item
                    label="Sub Icon"
                    labelCol={{ span: 3 }}
                    style={{ marginBottom: 0 }}
                ></Form.Item>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'left',
                    }}
                >
                    <Col span={3}></Col>
                    <Col>
                        <Upload
                            listType="picture-card"
                            fileList={listSubIcon}
                            onChange={handleChangeUploadSubIcon}
                        >
                            {listSubIcon.length >= 1
                                ? null
                                : uploadButton('upload sub icon')}
                        </Upload>
                    </Col>
                </div>
            </Form>
        </div>
    );
}

const uploadButton = (name) => (
    <div>
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            {name}
        </div>
    </div>
);
