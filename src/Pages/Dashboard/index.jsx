import { MainDashboardCard } from "../../Components/Reusable"

export default function Dashboard() {
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
        { title: 'Batches', body: '132 k', percent: '+20%', descriptions: 'coming soon' },
        { title: 'Agents', body: '37', percent: '-20%', descriptions: 'coming soon' },
    ]
    return (
        <div className='row mt-3 w-100' gutter={12} >
            {data.map(item => <MainDashboardCard item={item} />)}
        </div >
    )
}
