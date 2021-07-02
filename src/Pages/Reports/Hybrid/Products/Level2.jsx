import moment from 'moment';
import { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { reportsAPI } from '../../reportsApi';
import { ConfigurationContext } from '../configurations.context';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function Level2({ data, setLevelSelect }) {
    const { state } = useContext(ConfigurationContext)
    const [productBatches, setProductBatches] = useState({ loading: true, data: [] })

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
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        setProductBatches({ loading: true, data: [] })

        await reportsAPI.productsVSBatch(filter, data.companyId)
            .then(data => {
                console.log(data)
                setProductBatches({ loading: false, data })
            }).catch(error => {
                console.log(error)
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
    }, [data])

    useEffect(() => {
        if (productBatches.data.length > 0) {
            setSeries(productBatches.data.map(item => item.count))
            setLabels(productBatches.data.map(item => item.batch))
        }
    }, [productBatches])

    return (
        <>
            {/* <span className='h6'>Company Name: </span>{data.company} <br /><br /> */}
            <p className='text-uppercase'><span className='font-weight-bold'>Company Name:</span> {data.company}</p>
            <Button className='mb-2 pb-3 ignore' onClick={() => { setLevelSelect({ index: 0, data: {} }) }} ><ArrowLeftOutlined className='' /> Back</Button>
            <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={productBatches.data} striped hover >
                <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                <TableHeaderColumn dataField='batch' >Batch Name</TableHeaderColumn>
                <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                <TableHeaderColumn dataField='count' dataFormat={(cell) => {
                    let sum = productBatches.data.reduce((a, b) => +a + +b.count, 0);
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
