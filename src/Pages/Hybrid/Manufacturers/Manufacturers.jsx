import CompanyHome from '../../../Components/Company/Home'

import { useEffect, useState } from 'react'
import { manufacturerAPI } from './manufacturerAPI'
import eventEmitter from '../../../Services/EventEmitter'
import RegisterCompany from '../../../Components/Company/RegisterCompany'

export default function Manufacturers() {
    const updateEvent = 'updateManCompanies'
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
    ]
    const [manufacturers, setManufacturers] = useState({ loading: true, data: [] })


    function fetchManCompanies() {
        manufacturerAPI.getAll('manufacture/all')
            .then(res => {
                console.log(res)
                setManufacturers({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on(updateEvent, () => fetchManCompanies());

    useEffect(() => {
        fetchManCompanies()
        return () => {
            setManufacturers({ loading: false, data: [] })
        }
    }, [])

    return (
        <div>
            <CompanyHome
                RegisterCompany={() =>
                    RegisterCompany({
                        handlerAPI: manufacturerAPI,
                        resource: 'manufacture',
                        updateEvent: updateEvent
                    })}
                data={data}
                companies={manufacturers}
                resource='manufacture' />

        </div>
    )
}
