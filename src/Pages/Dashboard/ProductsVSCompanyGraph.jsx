import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { manufacturerAPI } from '../Hybrid/Manufacturers/manufacturerAPI';

export default function ProductsVSCompanyGraph() {
    const [series, setSeries] = useState([])
    const [categories, setCategories] = useState([])

    async function getRequests() {
        await manufacturerAPI.productsVSCompany()
            .then(response => {
                // console.log(response)
                let ser = []
                let cat = []
                response.forEach(item => {
                    ser.push(item.count)
                    cat.push(item.company)
                })
                setSeries(ser)
                setCategories(cat)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getRequests()
    }, [])

    const options = {
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: categories,
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
        <div className="card shadow">
            <div className="card-header bg-whit" style={{ fontSize: '16px' }}>Product Registration Distribution Per Company</div>
            <div className="card-body">
                <ReactApexChart options={options.options} series={series} type="donut" height={350} />
            </div>
        </div>
    )
}
