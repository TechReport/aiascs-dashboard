import moment from 'moment'
import { useState } from 'react'
import UdsmLogo from '../../Assets/logo_ud.png'
import ReactApexChart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


export default function ReportProfile() {
    const [series1] = useState([14, 23])

    const [labels1] = useState(['Genuine', 'Counterfeit'])

    const [reports] = useState({
        loading: false, data: [
            { createdAt: '12/10/2020', company: 'SeedCo', percentage: '7', count: 200000 },
            { createdAt: '25/11/2020', company: 'Company 2', percentage: '17', count: 100000 },
            { createdAt: '21/12/2020', company: 'Company 3', percentage: '7', count: 50000 },
        ]
    })


    const state = {
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
        <div>
            <div className='container-fluid p-0'>
                <div className="card" >
                    <div className="card-body" id='reportContents' styl={{ width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="titlebar d-flex justify-content-between">
                            <img src={UdsmLogo} className='img' alt='company logo' width='100px' />
                            <div className="descriptions text-right" >
                                <span className='h6'>Tanzania Bureau of Standards (TBS) </span><br />
                                <span className='h'>P.O BOX 2956</span> <br />
                                <span className='h'>Telephone: +255 26 2520310.</span><br />
                                <span className='h'>Fax: +255 26 2520310.</span> <br />
                                <span className='h'>{moment(Date.now()).format('ddd DD, MMM YYYY')}</span>
                            </div>
                        </div>
                        <div className="title mt-4">
                            <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u> Lorem ipsum dolor sit amet consectetur, adipisicing elit.</u></h6>
                            <span><span className='font-weight-bold'>Start Date:</span>12/12/2020</span><br />
                            <span><span className='font-weight-bold'>End Date:</span>12/12/2020</span><br />
                        </div>
                        <div className="report-body pb-5">
                            <h6 className='mt-4'>Products Verification Summary</h6>

                            <div className="row">
                                <div className="col-7">
                                    <table class="table table-hover table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>1</th>
                                                <td>Total Products</td>
                                                <td>37 M</td>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <td>Scanned Products</td>
                                                <td>2M</td>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <td>Fake Products Identified</td>
                                                <td>1,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-5">
                                    {/* eslint-disable-next-line  */}
                                    <ReactApexChart options={state.options, { labels: labels1 }} series={series1} type="pie" />
                                </div>
                            </div>
                            <h6 className='mt-4'>Products Distribution Summary</h6>
                            <div className="row">
                                <div className="col-7">
                                    <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} striped hover >
                                        <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                                        <TableHeaderColumn dataField='company' >Company</TableHeaderColumn>
                                        <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                                        <TableHeaderColumn dataField='percentage' >Percentage Distribution</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                                <div className="col-5">
                                    {/* eslint-disable-next-line  */}
                                    <ReactApexChart options={state.options, { labels: reports.data.map(item => item.company) }} series={reports.data.map(item => item.count)} type="pie" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
