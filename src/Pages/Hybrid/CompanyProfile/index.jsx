import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import ProfileTemplate from './Profile'
import { manufacturerAPI } from '../Manufacturers/manufacturerAPI'
import { qualityControllerAPI } from '../QualityControllers/qualityControllerAPI'
// import { agentsCompanyAPI } from '../Agents/agentsCompanyAPI'

export default function CompanyProfile(props) {
    console.log(props.location.pathname)
    const { state } = useContext(AuthContext)
    console.log(state)
    let companyAPI;

    // useEffect(() => {
    //     switch (props.location.pathname) {
    //         case '/qc/profile':
    //             companyAPI = qualityControllerAPI
    //             break;

    //         default:
    //             break;
    //     }
    //     // eslint-disable-next-line
    // }, [])

    switch (props.location.pathname) {
        case '/qc/profile':
            return (
                <ProfileTemplate companyAPI={qualityControllerAPI} companyId={state.currentUser.companyId} resource='qualitycontrollers' />
            )
        case '/man/profile':
            return (
                <ProfileTemplate companyAPI={manufacturerAPI} companyId={state.currentUser.companyId} resource='manufacture' />
            )
        default:
            break;
    }
}
