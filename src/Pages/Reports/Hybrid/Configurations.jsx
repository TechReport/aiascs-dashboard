import React, { useContext, useState } from 'react'
import { DatePicker, Form, Switch } from 'antd';
import LocationSelect from "../../Hybrid/Users/LocationSelect";
import { ConfigurationContext } from './configurations.context';

const { RangePicker } = DatePicker;

export default function Configurations({ location, duration, charts }) {
    const [locationError] = useState({ status: false, message: '' })

    const { state, dispatch } = useContext(ConfigurationContext)

    let setLocation = location => dispatch({ type: 'location', payload: location })
    let setDuration = duration => dispatch({ type: 'duration', payload: duration })
    let toggleCharts = () => dispatch({ type: 'toggleCharts' })

    return (
        <div>
            <Form layout='vertical'>
                {duration &&
                    <Form.Item initialValue={state.duration} name='duration' label="Choose Duration">
                        <RangePicker style={{ width: '100%' }} onChange={(e) => setDuration(e)} />
                    </Form.Item>
                }
                {charts &&
                    <Form.Item name="charts" label="Include Charts"  >
                        <Switch onChange={toggleCharts} checked={state.charts} />
                    </Form.Item>
                }
                {location &&
                    <Form.Item name='location' label="Select Desired Location">
                        <LocationSelect setLocation={setLocation} locationError={locationError} />
                    </Form.Item>
                }
            </Form>
        </div>
    )
}
