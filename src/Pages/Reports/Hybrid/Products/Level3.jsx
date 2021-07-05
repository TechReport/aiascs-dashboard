import moment from 'moment';
import { useContext, useEffect, useState } from 'react'
import { reportsAPI } from '../../reportsApi';
import { ConfigurationContext } from '../configurations.context';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Skeleton } from 'antd'

export default function Level3({ data, setLevelSelect }) {
    // console.log(data)
    const { state } = useContext(ConfigurationContext)
    const [batchSummary, setBatchSummary] = useState({ loading: true, data: {} })
    const [title] = useState(
        state.duration ?
            `Product Batch Overview Report for "${data.company}" from ${moment(state.duration[0]).format('MMMM DD, YYYY')} to ${moment(state.duration[1]).format('MMMM DD, YYYY')}` :
            `Products Batch Overview Report  for "${data.company}" COMPANY`
    )

    // const states = {
    //     series: [14, 23,],
    //     options: {
    //         chart: {
    //             type: 'polarArea',
    //         },
    //         stroke: {
    //             colors: ['#fff']
    //         },
    //         fill: {
    //             opacity: 0.8
    //         },

    //         responsive: [{
    //             breakpoint: 480,
    //             options: {
    //                 chart: {
    //                     width: 200
    //                 },
    //                 legend: {
    //                     position: 'bottom'
    //                 }
    //             }
    //         }]
    //     },
    // };
    // const [series, setSeries] = useState([])
    // const [labels, setLabels] = useState([])

    async function getBatchSummary() {
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        setBatchSummary({ loading: true, data: [] })

        await reportsAPI.batchSummary(filter, data.companyId, data.batchId)
            .then(data => {
                console.log(data)
                setBatchSummary({ loading: false, data })
            }).catch(error => {
                // console.log(error)
                setBatchSummary({ loading: false, data: [] })
            }).finally(() => {
                filter = {}
            })
    }

    useEffect(() => {
        getBatchSummary()
        return () => {
            setBatchSummary()
        }
        // eslint-disable-next-line
    }, [data])

    // useEffect(() => {
    //     if (productBatches.data.length > 0) {
    //         setSeries(productBatches.data.map(item => item.count))
    //         setLabels(productBatches.data.map(item => item.batch))
    //     }
    // }, [productBatches])

    return (
        <>
            <div className="title mt-4">
                <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>{title} </u></h6>
                <p><span className='font-weight-bold'>Start Date:</span> {state.duration ? moment(state.duration[0]).format('ddd DD, MMM YYYY') : 2020}</p>
                <p><span className='font-weight-bold'>End Date:</span> {state.duration ? moment(state.duration[1]).format('ddd DD, MMM YYYY') : ' - n/a'}</p>
            </div>
            <p className='text-uppercase'><span className='font-weight-bold'>Company Name:</span> {data.company}</p>
            <p className='text-uppercase'><span className='font-weight-bold'>Batch Name:</span> {data.batch}</p>
            <Button className='mb-2 pb-3 ignore' onClick={() => { setLevelSelect({ index: 1, data: { company: data.company, count: data.count, companyId: data.companyId } }) }} ><ArrowLeftOutlined className='' /> Back</Button>
            {batchSummary.loading ?
                <div className="card">
                    <div className="card-body">
                        <Skeleton active avatar />
                    </div>
                </div>
                :

                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>PROPERTY</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Total Products</td>
                            <td>{batchSummary.data.total}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Scanned Products</td>
                            <td>{batchSummary.data.scannedProducts}/{batchSummary.data.total} &nbsp; ({Math.round(Number(batchSummary.data.scannedProducts / Number(batchSummary.data.total)) * 100)}%)</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Batch Name</td>
                            <td>{batchSummary.data.batchName}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Flagged as Counterfeit</td>
                            <td>{batchSummary.data.flaggedProducts} &nbsp; ({Math.round(Number(batchSummary.data.flaggedProducts / Number(batchSummary.data.total)) * 100)}%)</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Company Name</td>
                            <td>{batchSummary.data.companyName}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}
