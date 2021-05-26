import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { manufacturerAPI } from '../Hybrid/Manufacturers/manufacturerAPI';

export default function VerifiedVSUnverifiedGraph() {
    const [series, setSeries] = useState([])
    const [categories, setCategories] = useState([])

    async function getRequests() {
        await manufacturerAPI.verifiedVSUnverified()
            .then(response => {
                console.log(response)

                setCategories(Object.keys(response))
                // setSeries(Object.values(response))
                setSeries([{ data: Object.values(response) }])

                // let ser = []
                // let cat = []
                // response.forEach(item => {
                //     ser.push(item.count)
                //     cat.push(item.company)
                // })
                // setSeries(ser)
                // setCategories(cat)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getRequests()
    }, [])

    useEffect(() => {
        console.log(series)
    }, [series])

    // const options = {
    //     series: [55, 10],
    //     options: {
    //         chart: {
    //             width: 380,
    //             type: 'pie',
    //         },
    //         // labels: categories,
    //         xaxis: {
    //             categories: categories,
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
        <div className="card shadow">
            <div className="card-header bg-whit" style={{ fontSize: '16px' }}>Registered VS Unregistered Products</div>
            <div className="card-body">
                <ReactApexChart options={options} series={series} type="bar" height={305} />
            </div>
        </div>
    )
}

