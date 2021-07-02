import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { ConfigurationContext } from '../configurations.context';

export default function Level1({ data, setLevelSelect }) {
    const { state } = useContext(ConfigurationContext)

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
                    <ReactApexChart options={states.options, { labels: labels }} series={series} type="pie" width='50%' />
                </div>
            }
        </>
    )
}
