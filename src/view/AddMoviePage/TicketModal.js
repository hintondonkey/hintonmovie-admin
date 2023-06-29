import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
    DANGER_COLOR,
    INFO_COLOR,
    SUCCESS_COLOR,
} from '../../constants/colors';
import { v4 as uuidv4 } from 'uuid';

const validateMessages = {
    required: '${label} is required',
};

export default function TicketModal(props) {
    const [loading, setLoading] = useState(false);
    const [datePicker, setDatePicker] = useState('');
    const [datePickerStr, setDatePickerStr] = useState('');
    const [timeShowDate, setTimeShowDate] = useState('');
    const [timeShowDateStr, setTimeShowDateStr] = useState('');
    const [price, setPrice] = useState('');
    const [website, setWebsite] = useState('');

    const [formTicket] = Form.useForm();

    let {
        isOpenModal,
        closeModal,
        onSave,
        ticketForEdit,
        handleChangeTicketForEdit,
        handleEditTicket,
    } = props;

    useEffect(() => {
        if (ticketForEdit != null) {
            formTicket.setFieldsValue({
                datePicker: ticketForEdit.datePicker,
                datePickerStr: ticketForEdit.datePickerStr,
                timeShowDate: ticketForEdit.timeShowDate,
                timeShowDateStr: ticketForEdit.timeShowDateStr,
                price: ticketForEdit.price,
                website: ticketForEdit.website,
            });
        }
    }, [ticketForEdit]);

    const handleCloseModal = () => {
        handleResetForm();
        closeModal();
    };

    const handleResetForm = () => {
        formTicket.resetFields();
        handleChangeTicketForEdit(null);
    };

    return (
        <Modal
            title="Create New Ticket"
            open={isOpenModal}
            onCancel={handleCloseModal}
            width="40%"
            footer={[
                <Row>
                    <Col span={6} offset={10}>
                        <Button
                            key="back"
                            onClick={handleCloseModal}
                            style={{
                                backgroundColor: DANGER_COLOR,
                                color: 'white',
                            }}
                        >
                            Close
                        </Button>
                    </Col>

                    <Col span={6} offset={2}>
                        {ticketForEdit === null || ticketForEdit === {} ? (
                            <Button
                                key="submit"
                                type="primary"
                                loading={loading}
                                style={{ backgroundColor: SUCCESS_COLOR }}
                                onClick={() => {
                                    formTicket
                                        .validateFields()
                                        .then((val) => {
                                            onSave({
                                                key: uuidv4(),
                                                datePicker,
                                                datePickerStr,
                                                timeShowDate,
                                                timeShowDateStr,
                                                price,
                                                website,
                                            });
                                            handleCloseModal();
                                        })
                                        .catch((error) => {
                                            console.log('error', error);
                                        });
                                }}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                key="submit"
                                type="primary"
                                loading={loading}
                                style={{ backgroundColor: INFO_COLOR }}
                                onClick={() => {
                                    formTicket
                                        .validateFields()
                                        .then((val) => {
                                            handleEditTicket({
                                                key: ticketForEdit.key,
                                                datePicker,
                                                datePickerStr,
                                                timeShowDate,
                                                timeShowDateStr,
                                                price,
                                                website,
                                            });
                                            handleCloseModal();
                                        })
                                        .catch((error) => {
                                            console.log('error', error);
                                        });
                                }}
                            >
                                Save Edit
                            </Button>
                        )}
                    </Col>
                </Row>,
            ]}
        >
            <Form
                name="modalTicket"
                form={formTicket}
                style={{ width: '100%' }}
                validateMessages={validateMessages}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="datePicker"
                    label="Date Picker"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title',
                        },
                    ]}
                >
                    <DatePicker
                        value={datePicker}
                        onChange={(val, valString) => {
                            setDatePicker(val);
                            setDatePickerStr(valString);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="timeShowDate"
                    label="Time"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input time',
                        },
                    ]}
                >
                    <TimePicker
                        value={timeShowDate}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        format="HH:mm"
                        onChange={(val, valString) => {
                            setTimeShowDate(val);
                            setTimeShowDateStr(valString);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input price',
                        },
                    ]}
                >
                    <Input
                        onChange={(val) => {
                            setPrice(val.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Link To Ticket"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input link to ticket',
                        },
                    ]}
                >
                    <Input
                        name="website"
                        value={website}
                        onChange={(val) => {
                            setWebsite(val.target.value);
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
