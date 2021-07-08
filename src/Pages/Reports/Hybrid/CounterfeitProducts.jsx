import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { ConfigurationContext } from './configurations.context'
import { reportsAPI } from '../reportsApi'

// import UdsmLogo from '../../../Assets/logo_ud.png'
import CoaTZ from '../../../Assets/logos/coatz.jpg'
// import { UserOutlined } from '@ant-design/icons'
import ReactApexChart from 'react-apexcharts'

import { Skeleton } from 'antd'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Level2 from './Counterfeit/Level2'
// import Level1 from './Products/Level1';
// import Level2 from './Products/Level2'
// import Level3 from './Products/Level3'



// import { reportsAPI } from '../reportsApi'

export default function CounterfeitProducts() {
    const [reports, setReports] = useState({ loading: false, data: [] })
    const { state } = useContext(ConfigurationContext)
    console.log(reports)
    const [levelSelect, setLevelSelect] = useState({ index: 0, data: {} })

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
        // console.log(filter)

        await reportsAPI.companiesWithRevokedProducts(filter)
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
        // eslint-disable-next-line
    }, [])


    const [series, setSeries] = useState([])
    const [labels, setLabels] = useState([])

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

    useEffect(() => {
        if (reports.data.length > 0) {
            setSeries(reports.data.map(item => item.total))
            setLabels(reports.data.map(item => item.companyName))
        }
    }, [reports])

    return (
        reports.loading ?
            <Skeleton active round avatar />
            :
            <div className='container-fluid p-0'>
                <div className="card">
                    <div className="card-body border" id='reportContents'>
                        <div className="titlebar text-center">
                            <img src={CoaTZ} className='img-fluid' alt='company logo' width='100px' />
                            <h6>The United Republic of Tanzania</h6>
                            <h5 className=''>Agro Input Assurance Supply Chain System</h5>
                        </div>
                        <div className="report-body">
                            {levelSelect.index === 0 &&
                                <>
                                    <div className="ignore"></div>
                                    <div className="title mt-4">
                                        <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>Counterfeit Products </u></h6>
                                        <p><span className='font-weight-bold'>Start Date:</span> {state.duration ? moment(state.duration[0]).format('ddd DD, MMM YYYY') : 2020}</p>
                                        <p><span className='font-weight-bold'>End Date:</span> {state.duration ? moment(state.duration[1]).format('ddd DD, MMM YYYY') : '-'}</p>
                                    </div>
                                    <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} options={{ onRowClick: (row) => setLevelSelect({ index: 1, data: row }) }} striped hover >
                                        <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                                        <TableHeaderColumn dataField='companyName' >Company Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='total' >Product Count</TableHeaderColumn>
                                        <TableHeaderColumn dataField='total' dataFormat={(cell, row, a, b) => {
                                            let sum = reports.data.reduce((a, b) => +a + +b.total, 0);
                                            return `${Math.round((cell / sum) * 100)} %`
                                        }}>Percentage Distribution</TableHeaderColumn>
                                    </BootstrapTable>
                                    {state.charts &&
                                        <div className='mt-4'>
                                            {/* eslint-disable-next-line */}
                                            <ReactApexChart options={states.options, { labels: labels }} series={series} type="pie" width='50%' />
                                        </div>
                                    }
                                </>
                                // <Level1 data={reports.data} setLevelSelect={setLevelSelect} />
                            }
                            {levelSelect.index === 1 &&
                                <Level2 data={levelSelect.data} setLevelSelect={setLevelSelect} />
                            }
                            {/* {levelSelect.index === 2 &&
                                <Level3 data={levelSelect.data} setLevelSelect={setLevelSelect} />
                            } */}
                        </div>
                    </div>
                </div>
            </div>
    )
}
