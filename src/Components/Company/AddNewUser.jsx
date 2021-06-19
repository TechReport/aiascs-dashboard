import { useEffect, useState } from 'react';
import { Button, Input, Select, Radio, Space, Form, Alert, notification } from 'antd';
// import eventemitter from '../../../Services/EventEmitter'
import { userAPI } from '../../Pages/Hybrid/Users/userAPI';
import eventEmitter from '../../Services/EventEmitter';
import LocationSelect from '../../Pages/Hybrid/Users/LocationSelect';
// import LocationSelect from './LocationSelect';

export default function AddNewUser({ handleOk, companyId, type }) {
    let role = []
    switch (type) {
        case 'manufacture':
            role = ['ROLE_OPERATION_PERSONNEL_MAN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']
            break;
        case 'qualityController':
            role = ['ROLE_OPERATION_PERSONNEL_QC', 'ROLE_QUALITY_CONTROLLER_ADMIN']
            break;
        case 'productAgent':
            role = ['ROLE_OP_AGENT', 'ROLE_AGENT_COMPANY_ADMIN']
            break;
        default:
            role = []
            break;
    }
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
        // Add companyId to user object
        userDetails.companyId = companyId
        userDetails.location = location
        userDetails.onModel = type
        // console.log(userDetails)
        setLoading(true)

        setError({ status: false, message: '', descriptions: '' })
        await userAPI.post('user/register', { newUser: userDetails })
            .then(res => {
                console.log(res)
                userDetails = ''
                openNotification({ message: res.message })
                eventEmitter.emit('updateUsers')
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
        let filter = { genericName: role }
        await userAPI.getAll('acc/roles', 'name _id genericName target', filter)
            .then(data => {
                console.log(data)
                // if (role) {
                //     const resp = data.filter(a => a.genericName === role)
                //     console.log(resp)
                //     return setRoles({ loading: false, data: resp })

                //     // const data = [{ name: 'daniel', age: 20 }, { name: 'nsobay', age: 30 }, { name: 'denis', age: 40 }]
                //     // data.filter((a, b) => a.name == 'daniel')
                //     // res.data
                // }
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
                <Input placeholder='Enter your usernames' />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        pattern: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email Format",
                    },
                ]}>
                <Input />
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
                ]}>
                <Input type='number' />
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
                name="location">
                <LocationSelect setLocation={setLocation} locationError={locationError} />
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
