import { agentsCompanyAPI } from "../agentsCompanyAPI";

import CompanyProfile from "../../../../Components/Company/Profile";
import ProductList from "../../Manufacturers/Products/ProductList";
import { Skeleton, Tag } from "antd";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import moment from "moment";
import { useHistory } from "react-router";
import { useState } from "react";

export default function AgentsCompanyProfile(props) {
    const hist = useHistory()
    console.log(props)
    const [agentCompany] = useState({ loading: false, data: props.location.state })
    console.log(agentCompany)


    return (
        <div className="container-fluid mt-4">
            <CompanyProfile
                companyData={props.location.state}
                companyAPI={agentsCompanyAPI}
                companyType='productAgent'
                resource='agents'
                updateEvent='updateAgents' />
        </div >
    )
}
