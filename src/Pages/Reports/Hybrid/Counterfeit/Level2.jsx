import moment from 'moment';
import { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { reportsAPI } from '../../reportsApi';
import { ConfigurationContext } from '../configurations.context';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function Level2({ data, setLevelSelect }) {
    console.log(data)
    const { state } = useContext(ConfigurationContext)
    const [productBatches, setProductBatches] = useState({ loading: true, data: [] })
    const [title] = useState(
        state.duration ?
            `Counterfeit Product Report Per Company  ${data.company || ''} from ${moment(state.duration[0]).format('MMMM DD, YYYY')} to ${moment(state.duration[1]).format('MMMM DD, YYYY')}` :
            `Counterfeit Product Report Per Company ${data.company || ''}`
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

    async function getProductsVSBatch() {
        // console.log(data)
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        setProductBatches({ loading: true, data: [] })

        await reportsAPI.batchesWithCounterfeitProducts(filter, data.companyId)
            .then(data => {
                console.log(data)
                setProductBatches({ loading: false, data })
            }).catch(error => {
                // console.log(error)
                setProductBatches({ loading: false, data: [] })
            }).finally(() => {
                filter = {}
            })
    }

    useEffect(() => {
        getProductsVSBatch()
        return () => {
            setProductBatches()
        }
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (productBatches.data.length > 0) {
            setSeries(productBatches.data.map(item => item.total))
            setLabels(productBatches.data.map(item => item.batchName))
        }
    }, [productBatches])

    return (
        <>
            <div className="title mt-4">
                <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>{title} </u></h6>
                <p><span className='font-weight-bold'>Start Date:</span> {state.duration ? moment(state.duration[0]).format('ddd DD, MMM YYYY') : 2020}</p>
                <p><span className='font-weight-bold'>End Date:</span> {state.duration ? moment(state.duration[1]).format('ddd DD, MMM YYYY') : '-'}</p>
            </div>
            <p className='text-uppercase'><span className='font-weight-bold'>Company Name:</span> {data.companyName}</p>
            <Button className='mb-2 pb-3 ignore' onClick={() => { setLevelSelect({ index: 0, data: {} }) }} ><ArrowLeftOutlined className='' /> Back</Button>
            <BootstrapTable trStyle={{ padding: '0px' }} data={productBatches.data} striped hover >
                <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                <TableHeaderColumn dataField='batchName' >Batch Name</TableHeaderColumn>
                <TableHeaderColumn dataField='total' >Product Count</TableHeaderColumn>
                <TableHeaderColumn dataField='total' dataFormat={(cell) => {
                    let sum = productBatches.data.reduce((a, b) => +a + +b.total, 0);
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
