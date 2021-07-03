import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { ConfigurationContext } from '../configurations.context';

export default function Level1({ data, setLevelSelect }) {
    const { state } = useContext(ConfigurationContext)
    const [title] = useState(
        state.duration ?
            `Product Registration Report from ${moment(state.duration[0]).format('MMMM DD, YYYY')} to ${moment(state.duration[1]).format('MMMM DD, YYYY')}` :
            'Product Registration Report'
    )

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
    const [series, setSeries] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        setSeries(data.map(item => item.count))
        setLabels(data.map(item => item.company))
    }, [data])

    return (
        <>
            <div className="ignore"></div>
            <div className="title mt-4">
                <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>{title} </u></h6>
                <p><span className='font-weight-bold'>Start Date:</span> {state.duration ? moment(state.duration[0]).format('ddd DD, MMM YYYY') : 2020}</p>
                <p><span className='font-weight-bold'>End Date:</span> {state.duration ? moment(state.duration[1]).format('ddd DD, MMM YYYY') : '-'}</p>
            </div>
            <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} options={{ onRowClick: (row) => setLevelSelect({ index: 1, data: row }) }} data={data} striped hover >
                <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                <TableHeaderColumn dataField='company' >Company Name</TableHeaderColumn>
                <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                <TableHeaderColumn dataField='count' dataFormat={(cell, row, a, b) => {
                    let sum = data.reduce((a, b) => +a + +b.count, 0);
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
    )
}
