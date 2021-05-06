import { agentsCompanyAPI } from "../agentsCompanyAPI";

import CompanyProfile from "../../../../Components/Company/Profile";
// import ProductList from "../Products/ProductList";

export default function AgentsCompanyProfile(props) {
    return (
        <div className="container-fluid mt-4">
            <CompanyProfile
                companyData={props.location.state}
                companyAPI={agentsCompanyAPI}
                companyType='productAgent'
                resource='agents'
                updateEvent='updateAgents' />
            {/* <div className="row mt-4">
                <div className="col-6 ">
                    <div className="card">
                        <div className="h5 card-header bg-white border-0">
                            Products
                        </div>
                        <div className="card-body mt-n5 py-2 px-0">
                            <ProductList companyId={props.location.state._id} />
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    )
}
