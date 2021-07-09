import { Button, Tag, List, Avatar } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ErrorBoundary from '../../../Components/ErrorBoundary'
import { UserOutlined } from '@ant-design/icons'

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState({ loading: false, data: [] })
    const [farmerFeedbacks, setFarmerFeedbacks] = useState([])
    const [qcFeedbacks, setQcFeedbacks] = useState([])


    useEffect(() => {
        if (feedbacks.data.length > 0) {
            setFarmerFeedbacks(feedbacks.data.map(item => item.feedBackFrom === 'Farmer' && item))
            // setQcFeedbacks(
            let msg = feedbacks.data.map(item => {
                // console.log(item.feedBackFrom)
                // if (item.feedBackFrom === 'QualityController')
                //     return item
                // item.feedBackFrom === 'QualityController' ? item : ''
            })

            console.log(msg)
        }
    }, [feedbacks])

    async function getFeedbacks() {
        setFeedbacks({ loading: true, data: [] })
        await axios.get('/feedback/all').then(res => {
            console.log(res)
            setFeedbacks({ loading: false, data: res.data })
        }).catch(error => {
            console.log(error)
            setFeedbacks({ loading: false, data: [] })
        })
    }

    useEffect(() => {
        getFeedbacks()
    }, [])

    return (
        <div className="row w-100 mt-4">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        Feedback from farmers
                    </div>
                    <div className="card-body p-2" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        <List
                            loading={feedbacks.loading}
                            itemLayout="horizontal"
                            dataSource={farmerFeedbacks}
                            renderItem={item => (
                                <List.Item>
                                    <ErrorBoundary>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={<a href="https://ant.design">{item.fromID}</a>}
                                            description={item.message.slice(2)}
                                        />
                                    </ErrorBoundary>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        Feedback from Quality Controllers
                        {/* <Button onClick={getFeedbacks} >fetch</Button> */}
                    </div>
                    <div className="card-body p-2" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={qcFeedbacks}
                            renderItem={item => (
                                <List.Item>
                                    {console.log(item)}
                                    {/* <List.Item.Meta
                                        avatar={<Avatar />}
                                        title={<a href="https://ant.design">{item.fromID}</a>}
                                        description={item.message && item.message.slice(2)}
                                    /> */}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}



// import { List, Avatar } from 'antd';


// ReactDOM.render(

//     mountNode,
// );