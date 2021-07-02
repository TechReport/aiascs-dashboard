import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import UdsmLogo from '../../Assets/logo_ud.png'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import ReactApexChart from 'react-apexcharts';

import { reportsAPI } from './reportsApi'
import { ConfigurationContext } from './configurations.context'
import { Skeleton } from 'antd'

export default function ProductCompany() {
    const [reports, setReports] = useState({ loading: false, data: [] })

    const { state } = useContext(ConfigurationContext)
    console.log(state)

    async function getProductsVSCompany() {
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        // if (state.location) {
        //     console.log(moment(state.location[0]).format())
        //     filter = {
        //         ...filter,
        //         location: state.location
        //     }
        // }
        setReports({ loading: true, data: [] })
        console.log(filter)

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

    useEffect(() => {
        getProductsVSCompany()
        return () => {
            setReports()
        }
    }, [])
    const [series, setSeries] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        setSeries(reports.data.map(item => item.count))
        setLabels(reports.data.map(item => item.company))
    }, [reports.data])

    const states = {
        series: [14, 23,],
        options: {
            chart: {
                type: 'polarArea',
            },
            stroke: {
                colors: ['#fff']
            },
            fill: {
                opacity: 0.8
            },

            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };
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
                        <div className="title mt-4">
                            <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>Product Registration Report as per COmpany for the year ending 31/12/2020.</u></h6>
                            <p><span className='font-weight-bold'>Start Date:</span> {state.duration ? moment(state.duration[0]).format('ddd DD, MMM YYYY') : 2020}</p>
                            <p><span className='font-weight-bold'>End Date:</span> {state.duration ? moment(state.duration[1]).format('ddd DD, MMM YYYY') : '-'}</p>
                        </div>
                        <div className="report-body">
                            <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} striped hover >
                                <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                                <TableHeaderColumn dataField='company' >Company Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                                <TableHeaderColumn dataField='count' dataFormat={(cell, row, a, b) => {
                                    let sum = reports.data.reduce((a, b) => +a + +b.count, 0);
                                    return `${Math.round((cell / sum) * 100)} %`
                                }}>Percentage Distribution</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        {state.charts &&
                            <div className='mt-4'>
                                <ReactApexChart options={states.options, { labels: labels }} series={series} type="pie" width='50%' />
                            </div>
                        }
                    </div>
                </div>
            </div>
    )
}
