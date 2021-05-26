import { useEffect, useState } from 'react'

import eventEmitter from '../../../Services/EventEmitter'
import CompanyHome from '../../../Components/Company/Home';
import RegisterCompany from '../../../Components/Company/RegisterCompany';
import { agentsCompanyAPI } from './agentsCompanyAPI';


export default function Agents() {
    const updateEvent = 'updateAgents'
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
    ]
    const [agents, setAgents] = useState({ loading: true, data: [] })

    function fetchAgentCompanies() {
        agentsCompanyAPI.getAll('productAgent/all')
            .then(res => {
                console.log(res)
                setAgents({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on(updateEvent, () => fetchAgentCompanies());

    useEffect(() => {
        fetchAgentCompanies()
        return () => {
            setAgents({ loading: false, data: [] })
        }
    }, [])

    return (
        <div>
            <CompanyHome
                RegisterCompany={() =>
                    RegisterCompany({
                        handlerAPI: agentsCompanyAPI,
                        resource: 'productAgent',
                        updateEvent,
                    })}
                data={data}
                title='Register Agents Company'
                companies={agents}
                resource='agents' />
        </div>
    )
}