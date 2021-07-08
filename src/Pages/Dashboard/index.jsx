import { Skeleton } from "antd"
import { useContext, useEffect, useState } from "react"
import { DashboardWidgetCard } from "../../Components/Reusable"
import { AuthContext } from "../../Context/AuthContext"
import { productAPI } from "../Hybrid/Manufacturers/Products/productAPI"
import ProductsVSCompanyGraph from "./ProductsVSCompanyGraph"
import ProductsVSTimeGraph from "./ProductsVSTimeGraph"
import RegisteredVSUnregisteredProductGraph from "./registeredVSUnregisteredProductGraph"
// import VerifiedVSUnverifiedGraph from "./VerifiedVSUnverifiedGraph"

export default function Dashboard() {
    const [stats, setStats] = useState({ loading: true, data: {} })
    const { state } = useContext(AuthContext)

    async function fetchStats() {
        setStats({ loading: true, data: {} })
        await productAPI.getAdminStats()
            .then(data => {
                setStats({ loading: false, data })
            }).catch((error => {
                console.log(error)
                setStats({ loading: false, data: {} })
            }))
    }

    useEffect(() => {
        fetchStats()
        return () => {
            setStats([])
        }
    }, [])

    let data = []

    switch (state.currentUser.role.genericName) {
        case 'ROLE_SUPER_ADMIN':
            data = [
                { title: 'Total Users', body: !stats.loading && stats.data.totalUsers, descriptions: 'Total Users' },
                { title: 'Manufacturing Companies', body: !stats.loading && stats.data.totalManufacturers, descriptions: 'The number of Manufacturing Companies registered' },
                { title: 'Products', body: !stats.loading && stats.data.totalProducts, descriptions: 'Total Products' },
                { title: 'Quality Controllers', body: !stats.loading && stats.data.totalQCCompanies, descriptions: 'Total Quality Controllers Companies' },
            ]
            break;
        case 'ROLE_QUALITY_CONTROLLER_ADMIN':
            data = [
                { title: 'Products', body: !stats.loading && stats.data.totalProducts, descriptions: 'Total Products' },
                { title: 'Manufacturing Companies', body: !stats.loading && stats.data.totalManufacturers, descriptions: 'The number of Manufacturing Companies registered' },
                { title: 'Quality Controllers', body: !stats.loading && stats.data.totalQCCompanies, descriptions: 'Total Quality Controllers Companies' },
                { title: 'Total Unregistered Products Reported', body: !stats.loading && stats.data.unregisteredProducts, descriptions: 'Total Reported Unregistered Products' },
            ]
            break;
        case 'ROLE_MANUFACTURING_COMPANY_ADMIN':
            data = [
                { title: 'Total Agent Companies', body: !stats.loading && stats.data.totalAgentCompanies, descriptions: 'The number of Manufacturing Companies registered' },
                { title: 'Quality Controllers', body: !stats.loading && stats.data.totalQCCompanies, descriptions: 'Total Quality Controllers Companies' },
            ]
            break;

        default:
            break;
    }

    return (
        <>
            <div className='row mt-3 w-100' gutter={12} >
                {stats.loading ?
                    Array.from({ length: 2 }, () => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                <div className="card shadow">
                                    <div className="card-body py-0">
                                        <Skeleton active ></Skeleton>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    data.map(item => <DashboardWidgetCard item={item} />)
                }
            </div >
            <div className="container-fluid mt-4 mx-0 px-0">
                <div className="row w-100">
                    <div className="col">
                        <div className="card bg-default shadow h-100">
                            <div className="card-header bg-" style={{ fontSize: '20px' }}>Product Registration Frequency</div>
                            <div className="card-body">
                                <ProductsVSTimeGraph />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 row w-100">
                    <div className="col-4">
                        <ProductsVSCompanyGraph />
                    </div>
                    <div className="col-4">
                        <RegisteredVSUnregisteredProductGraph />
                    </div>
                    {/* <div className="col-4">
                        <VerifiedVSUnverifiedGraph />
                    </div> */}
                    {/* <div className="col">
                        <div className="card shadow h-100">
                            <div className="card-header bg-white" style={{fontSize:'20px'}}>Registered Products</div>
                            <div className="card-body">
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

/**
 * notifications
 * location
 *
 */


/**
 * list of users
 * graphical user registration frequency
 * registered products
 * Unregistered Products vs date
 * Unregistered Products vs company
 *
 * Registered Products vs Company >
 * Registered Produdcts vs date   >
 * Verified vs unverified products
 */

/** MODULES
 * Users
 * Manufacturers
 * QualityControllers
 * Agents
 *
 */