import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { manufacturerAPI } from '../Hybrid/Manufacturers/manufacturerAPI';

export default function VerifiedVSUnverifiedGraph() {
    const [series, setSeries] = useState([])
    const [categories, setCategories] = useState([])

    async function getRequests() {
        await manufacturerAPI.verifiedVSUnverified()
            .then(response => {
                setCategories(Object.keys(response))
                setSeries([{ data: Object.values(response) }])
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
            <div className="card-header bg-whit" style={{ fontSize: '16px' }}>Verified VS Unverified Products</div>
            <div className="card-body">
                <ReactApexChart options={options} series={series} type="bar" height={305} />
            </div>
        </div>
    )
}

