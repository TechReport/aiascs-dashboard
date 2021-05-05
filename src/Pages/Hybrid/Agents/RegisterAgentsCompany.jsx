import { agentsCompanyAPI } from './agentsCompanyAPI'
import WithRegisterCompany from '../../../HOC/withCompany/withRegisterCompany'

function RegisterQualityControllers({ handleOk, error, loading, onFinish, onFinishFailed }) {
    return (<></>)
};

export default WithRegisterCompany(
    RegisterQualityControllers,
    {
        handlerAPI: agentsCompanyAPI,
        resource: 'agents/register'
    }
)