import { Form, Input, Button, Select } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Option } from 'antd/lib/mentions';
const { Option } = Select


export default function EditAddress({ companyId, companyAPI }) {
    const [regions] = useState(['arusha', 'daressalaam', 'dodoma', 'geita', 'iringa', 'kagera', 'katavi', 'kigoma', 'kilimanjaro', 'lindi', 'manyara', 'mara', 'mbeya', 'morogoro', 'mtwara', 'mwanza', 'njombe', 'pwani', 'rukwa', 'ruvuma', 'shinyanga', 'simiyu', 'singida', 'singida', 'songwe', 'tabora'])
    const hist = useHistory()
    const onFinish = (values) => {
        let postalDetails = {
            boxNumber: values.boxNumber, boxLocation: {
                country: 'Tanzania',
                region: values.region
            }
        }

        companyAPI.updatePostalAddress({ postalDetails }, companyId)
            .then(data => {
                hist.go(0)
                // setCompany((prevData) => {
                //     console.log(prevData)
                //     return { ...prevData, data: prevData.data.postalBox = data.postalBox }
                // })
            }).catch(error => {
                console.log(error)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Region"
                    name="region"
                    rules={[{ required: true, message: 'Please input your state' }]}
                >
                    {/* <Input placeholder='Kigoma' /> */}
                    <Select
                        showSearch
                        className='mb-2'
                        // loading={roles.loading}
                        placeholder="Search to Select Region"
                        optionFilterProp="children" >
                        {regions.map(region => <Option className='' style={{ fontSize: 'small' }} value={region}>{region}</Option>)}
                    </Select>
                </Form.Item>


                <Form.Item
                    label="Postal Box Numbers"
                    name="boxNumber"
                    rules={[{ required: true, message: 'Please input your postal box numbers!' }]}
                >
                    <Input type='number' placeholder='7261' min={0} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
