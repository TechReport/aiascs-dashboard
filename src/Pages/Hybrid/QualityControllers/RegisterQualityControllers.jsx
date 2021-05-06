import { qualityControllerAPI } from './qualityControllerAPI'
import WithRegisterCompany from '../../../HOC/withCompany/withRegisterCompany'

function RegisterQualityControllers({ handleOk, error, loading, onFinish, onFinishFailed }) {
    return (<></>)
};

export default WithRegisterCompany(
    RegisterQualityControllers,
    {
        handlerAPI: qualityControllerAPI,
        resource: 'qualitycontrollers'
    }
)