import Chart from 'react-apexcharts'

export default function MainWidgetGraph({ x, y }) {
    const state = {
        options: {
            chart: {
                id: 'apexchart-example',
                toolbar: {
                    show: false
                },
                width: '100%',
                sparkline: {
                    enabled: true
                }
            },

            stroke: {
                curve: 'smooth',
                width: 2
            },

            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false
            },
            xaxis: {
                // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                categories: x,
                labels: {
                    show: false,
                },
            },
        },
        series: [{
            name: 'series-1',
            // data: [30, 40, 75, 70, 99, 120, 300, 401, 500]
            data: y
        }]
    }
    return (
        <Chart options={state.options} series={state.series} type="line" />
    )
}





/**
 *
 * import Chart from 'react-apexcharts'

export default function MainWidgetGraph() {
    const state = {
        options: {
            chart: {
                id: 'apexchart-example',
                toolbar: {
                    show: false
                },
                width: '100%',
                sparkline: {
                    enabled: true
                }
            },

            stroke: {
                curve: 'smooth',
                width: 2
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false
            },
            // legend: {
            //     show: false
            // },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                labels: {
                    show: false,
                },
            },
            // yaxis: {
            //     labels: {
            //         show: false,
            //     }
            // }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 75, 70, 99, 120, 300, 401, 500]
        }]
    }
    return (
        <Chart options={state.options} series={state.series} type="line" />
    )
}

 */