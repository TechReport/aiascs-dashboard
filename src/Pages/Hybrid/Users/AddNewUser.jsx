import { useEffect, useState, useContext } from 'react';
import { Button, Input, Select, Radio, Space, Form, Alert, notification } from 'antd';
import { userAPI } from './userAPI'
import eventemitter from '../../../Services/EventEmitter'
import LocationSelect from './LocationSelect';
import { AuthContext } from '../../../Context/AuthContext';

export default function AddNewUser({ handleOk, role }) {
    const { state } = useContext(AuthContext)
    const [gender, setGender] = useState('male')
    const [roles, setRoles] = useState({ loading: false, data: [] })
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState({ region: '', district: '', ward: '' })
    const [locationError, setLocationError] = useState({ status: false, message: '' })

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            // span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 13,
            // span: 16,
        },
    };

    const onFinish = async (userDetails) => {
        if (!location.ward) {
            return setLocationError({ status: true, message: 'Please select location' })
        }
        userDetails.location = location
        userDetails.companyId = state.currentUser.companyId
        userDetails.onModel = state.currentUser.onModel

        // console.log(state)
        // console.log(userDetails)
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await userAPI.post('user/register', { newUser: userDetails })
            .then(res => {
                // console.log(res)
                userDetails = ''
                openNotification({ message: res.message })
                eventemitter.emit('updateUsers')
                handleOk()
            })
            .catch(err => {
                console.log(err)
                console.log(err.message)
                console.log(err.descriptions)
                // setError({ status: true, errObj: err.response })
                setError({ status: true, message: err.message, descriptions: err.descriptions })
                // console.log('eerr')
            })
            .finally(() => setLoading(false))
    };

    const fetchRoles = async () => {
        setRoles({ loading: true, data: [] })
        await userAPI.getAll('acc/rolesbyrole', 'name _id genericName target')
            .then(data => {
                if (role) {
                    const resp = data.filter(a => a.genericName === role)
                    return setRoles({ loading: false, data: resp })
                }
                setRoles({ loading: false, data })
            })
            .catch(err => console.log(err))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { Option } = Select;

    useEffect(() => {
        fetchRoles()
        return () => {
            setRoles([])
        }
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     tgd.
    // }, [])

    const openNotification = ({ message, description = '' }) => {
        notification.success({
            message,
            description,
            placement: 'bottomLeft'
        });
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please input User's First Name!" }]}>
                <Input placeholder='Enter Users First Name' />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder='Enter Users Last Name' />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    {
                        pattern: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email Format",
                    },
                ]}>
                <Input placeholder='Enter users Email' />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                    { required: true, message: 'Please input your Phone number!' },
                    {
                        pattern: /^[\d]{10,12}$/,
                        message: "Allowed format: 255626327561 or 0626327561",
                    },
                    // { len: 10, message: 'Only 10 digits allowed!' },
                    // { message: 'Only 10 digits allowed!', validator: `@"^\d{10}$"` }
                ]}>
                <Input type='number' placeholder='Enter users Phone Number' />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select users gender!' }]}>
                <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                    <Radio value='male'>Male</Radio>
                    <Radio value='female'>Female</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please input your role' }]}>
                <Select
                    showSearch
                    loading={roles.loading}
                    placeholder="Search to Select"
                    optionFilterProp="children" >
                    {roles.data.map(role => <Option className='' style={{ fontSize: 'small' }} value={role._id}>{`${role.name}(${role.target})`}</Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
            // rules={[{ required: true, message: 'Please input your location!' }]}
            >
                <LocationSelect setLocation={setLocation} locationError={locationError} />
                {/* <Input placeholder='Enter users Location' /> */}

            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Reset
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
            {error.status &&
                <Alert
                    message={error.message}
                    description={error.descriptions}
                    type="error"
                />
            }
        </Form>
    )
};
