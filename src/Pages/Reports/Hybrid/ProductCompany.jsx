import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import UdsmLogo from '../../../Assets/logo_ud.png'

import { reportsAPI } from '../reportsApi'
import { ConfigurationContext } from './configurations.context'
import { Skeleton } from 'antd'
import Level1 from './Products/Level1';
import Level2 from './Products/Level2'

export default function ProductCompany() {
    const [reports, setReports] = useState({ loading: false, data: [] })
    const { state } = useContext(ConfigurationContext)
    const [levelSelect, setLevelSelect] = useState({ index: 0, data: {} })

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
        return () => {
            setReports()
        }
        // eslint-disable-next-line
    }, [])

    return (
        reports.loading ?
            <Skeleton active round avatar />
            :
            <div className='container-fluid p-0'>
                <div className="card">
                    <div className="card-body border" id='reportContents'>
                        <div className="titlebar d-flex justify-content-between">
                            <img src={UdsmLogo} className='img' alt='company logo' width='100px' />
                            <div className="descriptions text-right">
                                <span className='h6'>Tanzania Bureau of Standards (TBS) </span><br />
                                <span className='h'>P.O BOX 2956</span> <br />
                                <span className='h'>Telephone: +255 26 2520310.</span><br />
                                <span className='h'>Fax: +255 26 2520310.</span> <br />
                                <span className='h'>{moment(Date.now()).format('ddd DD, MMM YYYY')}</span>
                            </div>
                        </div>

                        <div className="report-body">
                            {levelSelect.index === 0 &&
                                <Level1 data={reports.data} setLevelSelect={setLevelSelect} />
                            }
                            {levelSelect.index === 1 &&
                                <Level2 data={levelSelect.data} setLevelSelect={setLevelSelect} />
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}
