import { List, Avatar } from 'antd';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import React, { useContext, useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { NotificationContext } from '../../Context/NotificationContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
// import { AuthContext } from '../../Context/AuthContext';

// const baseURL = process.env.NODE_ENV === 'production' ? 'https://secret-ridge-42311.herokuapp.com/api/v1/' : 'http://localhost:5400/api/v1/'

export default function Notifications({ notifications }) {
    const hist = useHistory()
    // const { notifications } = useContext(NotificationContext)
    // console.log(notifications)

    // useEffect(() => {
    //     console.log('hi here')
    //     setNotificationCount(notifications.length)

    // }, [notifications])
    // console.log(state.currentUser)
    // const socket = io(baseURL, {
    //     reconnectionDelayMax: 10000,
    //     auth: {
    //         token: sessionStorage.getItem(('token'))
    //     },
    //     query: {
    //         // "role": state.currentUser.roleId.genericName
    //     }
    // });
    // socket()

    async function handleDeleteNotif(notificationId) {
        console.log('mark read')
        await axios.delete(`/notifications/${notificationId}`)
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='row' style={{ width: '310px', maxHeight: '45vh', overflowY: 'auto' }}>
            <div className="col">
                {/* No New Notifications */}
                <div className="p-2">Notifications</div>
                <List
                    // loading={feedbacks.loading}
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={item => (
                        <List.Item>
                            <ErrorBoundary>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={
                                        item.subject === 'Revoke Batch' ?
                                            <>
                                                {item.subject} (
                                                <span onClick={() => handleDeleteNotif(item._id)} className=''>
                                                    {/* onClick={() => hist.push(`/products/category/batch/`, item.body)} */}
                                                    {item.body.name}
                                                </span>
                                                )
                                            </>
                                            :
                                            <>
                                                {item.subject} (
                                                <span style={{ cursor: 'pointer' }} className='text-info'
                                                    onClick={() => {
                                                        handleDeleteNotif(item._id)
                                                        hist.push(`/products/${item.body._id}`, item.body)
                                                    }}
                                                >
                                                    {item.body.name}
                                                </span>
                                                )
                                            </>
                                    }
                                    description={
                                        <div>
                                            Issued By:
                                            {console.log(item)}
                                            <span style={{ cursor: 'pointer' }} className='text-info' onClick={() => hist.push(`/user/${item.createdBy._id}`, item.createdBy)}>
                                                {`${item.createdBy.firstName} ${item.createdBy.lastName}`}
                                            </span>
                                        </div>
                                    }
                                />
                            </ErrorBoundary>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
