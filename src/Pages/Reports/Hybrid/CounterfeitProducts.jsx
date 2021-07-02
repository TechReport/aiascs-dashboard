import React, { useContext, useState } from 'react'
import moment from 'moment'
import { ConfigurationContext } from './configurations.context'
import { reportsAPI } from '../reportsApi'

export default function CounterfeitProducts() {
    const [reports, setReports] = useState({ loading: false, data: [] })
    const { state } = useContext(ConfigurationContext)

    async function getProductsVSCompany() {
        let filter = {}

        if (state.duration) {
            filter = {
                ...filter,
                from: moment(state.duration[0]).format(),
                to: moment(state.duration[1]).format()
            }
        }
        // if (state.location) {
        //     console.log(moment(state.location[0]).format())
        //     filter = {
        //         ...filter,
        //         location: state.location
        //     }
        // }
        setReports({ loading: true, data: [] })
        console.log(filter)

        await reportsAPI.productsVSCompany(filter)
            .then(data => {
                console.log(data)
                setReports({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setReports({ loading: false, data: [] })
            }).finally(() => {
                filter = {}
            })
    }
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
