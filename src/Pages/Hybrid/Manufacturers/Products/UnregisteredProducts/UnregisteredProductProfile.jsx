import { Affix, Button, Image, PageHeader, Tag } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function UnregisteredProductProfile(props) {
    const hist = useHistory()
    const [top] = useState(0)
    const [product] = useState(props.location.state)
    console.log(product)


    return (
        <div>
            <div className="container-fluid mt-4">
                <Affix offsetTop={top}>
                    <PageHeader
                        className="site-page-header bg-light"
                        onBack={() => hist.goBack()}
                        title={product.name}
                        extra={<>
                            <Button type='ghost'>Deactivate</Button>
                            <Button type='danger'>Delete</Button>
                        </>}
                        subTitle={<Tag color='gold'>{product._id}</Tag>}
                    />
                </Affix>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 shadow-s">
                        <div className="jumbotron shadow-sm h-100 bg-white p-3">
                            <p><strong>Company Name: </strong>{product.companyName}</p>
                            <p><strong>Registered Date: </strong>{moment(product.createdAt).format('')}</p>
                            <p><strong>Descriptions: </strong>{product.descriptions}</p>
                            <p><strong>Location: </strong>{product.location}</p>
                            {/* <p><strong>Phone Number: </strong>{company.phonenumber}</p> */}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            {product.photo.map(image => {
                                return (
                                    <div className="col-4 border">
                                        <Image className='img-fluid' src={image.url} />
                                    </div>
                                )
                            })}
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
