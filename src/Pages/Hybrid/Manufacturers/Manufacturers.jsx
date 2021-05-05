import RegisteredManufacturers from './RegisteredManufacturers'

import RegisterManCompany from './RegisterManCompany'
import CompanyHome from '../../../Components/Company/Home'

export default function Manufacturers() {
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
    ]

    return (
        <div>
            <CompanyHome RegisterCompany={RegisterManCompany} RegisteredCompanies={RegisteredManufacturers} data={data} />
        </div>
    )
}
