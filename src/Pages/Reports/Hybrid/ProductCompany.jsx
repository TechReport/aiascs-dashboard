import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
// import UdsmLogo from '../../../Assets/logo_ud.png'
import CoaTZ from '../../../Assets/logos/coatz.jpg'
// import { UserOutlined } from '@ant-design/icons'

import { reportsAPI } from '../reportsApi'
import { ConfigurationContext } from './configurations.context'
import { Skeleton } from 'antd'
import Level1 from './Products/Level1';
import Level2 from './Products/Level2'
import Level3 from './Products/Level3'
// import Avatar from 'antd/lib/avatar/avatar'
// import { AuthContext } from '../../../Context/AuthContext'

export default function ProductCompany({ startAt }) {
    const [reports, setReports] = useState({ loading: false, data: [] })
    const { state } = useContext(ConfigurationContext)
    const [levelSelect, setLevelSelect] = useState({ index: 0, data: {} })
    const [companyDetails] = useState(JSON.parse(sessionStorage.getItem('user')).companyId)
    console.log(companyDetails)
    // const currentUser = useContext(AuthContext).state.currentUser
    // console.log(currentUser)
    // const titles = [
    //     'Product Registration Report as per COmpany for the year ending 31/12/2020.',
    //     'Product Registration Report from ',
    //     'Product Registration Report as per COmpany for the year ending 31/12/2020.'
    // ]
    async function getProductsVSCompany() {
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        setReports({ loading: true, data: [] })

        await reportsAPI.productsVSCompany(filter)
            .then(data => {
                console.log(data)
                setReports({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setReports({ loading: false, data: [] })
            }).finally(() => {
                filter = {}
            })
    }
    // eslint-disable-next-line
    useEffect(() => {
        getProductsVSCompany()
        if (startAt)
            setLevelSelect({ index: startAt, data: { company: companyDetails.name, companyId: companyDetails._id, count: 2 } })
        return () => {
            setReports()
        }
        // eslint-disable-next-line
    }, [])

    /**
     * qc
     * admin
     */
    return (
        reports.loading ?
            <Skeleton active round avatar />
            :
            <div className='container-fluid p-0'>
                <div className="card">
                    <div className="card-body border" id='reportContents'>
                        <div className="titlebar text-center">
                            {/* {companyDetails.logo ? */}
                            <img src={CoaTZ} className='img-fluid' alt='company logo' width='100px' />
                            <h6>The United Republic of Tanzania</h6>
                            <h5 className=''>Agro Input Assurance Supply Chain System</h5>
                            {/* // : */}
                            {/* // <Avatar shape="square" size={100} icon={<UserOutlined />} /> */}
                            {/* // } */}
                            {/* <div className="descriptions text-right">
                                <span className='h6'>{companyDetails.name} </span><br />
                                <span className='h'>{`P.O BOX ${companyDetails.postalBox.boxNumber}, ${companyDetails.postalBox.boxLocation.region}`}</span> <br />
                                <span className='h'>Telephone: {companyDetails.phonenumber}.</span><br />
                                <span className='h'>{moment(Date.now()).format('ddd DD, MMM YYYY')}</span>
                            </div> */}
                        </div>

                        <div className="report-body">
                            {levelSelect.index === 0 &&
                                <Level1 data={reports.data} setLevelSelect={setLevelSelect} />
                            }
                            {levelSelect.index === 1 &&
                                <Level2 data={levelSelect.data} setLevelSelect={setLevelSelect} />
                            }
                            {levelSelect.index === 2 &&
                                <Level3 data={levelSelect.data} setLevelSelect={setLevelSelect} />
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}
