import React from 'react'
import UpdatedComponent from '../../../Components/ProfileView';

function TestHoc(props) {
    return (
        <div>
            Hellow there {props.name}
            <h3>{props.names}</h3>
        </div>
    )
}


export default UpdatedComponent(TestHoc)
