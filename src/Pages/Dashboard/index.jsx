import { DashboardWidgetCard } from "../../Components/Reusable"
import ProductsVSCompanyGraph from "./ProductsVSCompanyGraph"
import ProductsVSTimeGraph from "./ProductsVSTimeGraph"
import RegisteredVSUnregisteredProductGraph from "./registeredVSUnregisteredProductGraph"
import VerifiedVSUnverifiedGraph from "./VerifiedVSUnverifiedGraph"

export default function Dashboard() {
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
        { title: 'Batches', body: '132 k', percent: '+20%', descriptions: 'coming soon' },
        { title: 'Agents', body: '38', percent: '-20%', descriptions: 'coming soon' },
    ]
    return (
        <>
            <div className='row mt-3 w-100' gutter={12} >
                {data.map(item => <DashboardWidgetCard item={item} />)}
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
                    <div className="col-4">
                        <VerifiedVSUnverifiedGraph />
                    </div>
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