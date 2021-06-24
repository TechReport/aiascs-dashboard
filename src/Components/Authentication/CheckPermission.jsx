import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';


export default function ShowForPermission({ allowedPermissions, children }) {
    const { state } = useContext(AuthContext)
    let isPermitted = state.currentUser.role.permissions.some(e => e.genericName === allowedPermissions)

    if (isPermitted) {
        return children;
    }
    return <></>
};

function ShowForRole({ allowedRoles, children }) {
    const { state } = useContext(AuthContext)
    // let isPermitted = state.currentUser.role.genericName === allowedRoles
    let isPermitted = allowedRoles.some(e => e === state.currentUser.role.genericName)

    if (isPermitted) {
        return children;
    }
    return <></>
};

export { ShowForRole }


// import { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthContext';


// export default function ShowForPermissionComponent(props) {
//     const state = useContext(AuthContext)
//     console.log(state)
//     return true

//     // const couldShow = props.userPermissions.includes(props.permission);
//     // return couldShow ? props.children : null;
// };



// export default function checkPermission(WrappedComponent, permissions) {
//     return (
//         <>
//             <WrappedComponent />
//         </>
//     )
// }




// import React, { Component } from 'react';
// import { AuthContext } from '../../Context/AuthContext';
// // import eventEmititer from '../Services/EventEmitter'


// function LoadingMessage() {
//     return (
//         <div className="bg-danger">
//             <span>Please Wait ...</span>
//         </div>
//     );
// }


// export default function checkPermission(WrappedComponent, permissions) {
//     console.log('atlease')
//     return class extends Component {
//         static contextType = AuthContext
//         constructor(props) {
//             super(props);
//             this.state = {
//                 loading: true,
//                 canAccess: false
//             };
//         }

//         componentDidMount() {
//             console.log('mounting')
//             // try {
//             //     console.log('calling 1')

//             //     const { state } = this.context;
//             //     console.log(state)
//             //     return this.setState({
//             //         loading: false,
//             //         canAccess: true
//             //     });

//             // } catch (err) {

//             //     console.log('calling err')

//             //     this.setState({
//             //         loading: false,
//             //         authenticated: false
//             //     });
//             // }
//         }

//         render() {

//             console.log('calling here')

//             // while checking user session, show "loading" message
//             if (!this.state.canAccess) return LoadingMessage();

//             // otherwise, show the desired route
//             // return this.state.authenticated ? <WrappedComponent {...this.props} /> : <Login />;
//             return (
//                 <>
//                     {/* {this.state.canAccess ?  */}
//                     <WrappedComponent {...this.props} />
//                     {/* //  : <></>} */}
//                 </>
//             )
//         }
//     };
// }

// // export default checkPermission;