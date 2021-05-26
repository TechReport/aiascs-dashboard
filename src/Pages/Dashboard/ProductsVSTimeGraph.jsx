import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { manufacturerAPI } from '../Hybrid/Manufacturers/manufacturerAPI'

export default function Graph1() {
    const [categories, setCategories] = useState([])
    const [series, setSeries] = useState([])


    async function getRequests() {
        await manufacturerAPI.getProductsVSTime()
            .then(response => {
                let ser = []
                let cat = []
                response.forEach(item => {
                    ser.push(item.count)
                    cat.push(item._id)
                })
                setSeries([{ data: ser }])
                setCategories(cat)
            }).catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getRequests()
    }, [])

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            categories: categories,
        },
        yaxis: {
            title: {
                text: 'products'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " product"
                }
            }
        }
    }

    return (
        <div className="row">
            <div className="col">
                {/* <Button onClick={getRequests}>reload</Button> */}
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
            {/* <div className="col-4"> */}
            {/* {series[0] &&
                    <ReactApexChart options={pirChartOptions} series={series[0].data} type="pie" width={350} />
                } */}
            {/* <ReactApexChart options={options} series={series} type="donut" height={350} /> */}


            {/* <BootstrapTable tableContainerClas='mt-n2' className='' data={data} scrollTop='Top' striped hover >
                    <TableHeaderColumn isKey dataField='_id'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='count'>Count</TableHeaderColumn>
                </BootstrapTable> */}
            {/* </div> */}
        </div>
    )
}
