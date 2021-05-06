import { manufacturerAPI } from "../manufacturerAPI";

import CompanyProfile from "../../../../Components/Company/Profile";
import ProductList from "../Products/ProductList";

export default function ManCompanyProfile(props) {
    return (
        <div className="container-fluid mt-4">
            <CompanyProfile
                companyData={props.location.state}
                companyAPI={manufacturerAPI}
                resource='manufacture'
                companyType='manufacture'
                updateEvent='updateManufacturer' />
            <div className="row mt-4">
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
            </div>
        </div >
    )
}
