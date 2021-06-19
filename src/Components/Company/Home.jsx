import { useState } from 'react'
// import { DashboardWidgetCard } from '../Reusable'
import {
    UserAddOutlined
} from '@ant-design/icons';
import { Button, Modal, Skeleton, Tag } from 'antd'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { useHistory } from 'react-router'

export default function CompanyHome({ companies, resource, RegisterCompany, title }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const hist = useHistory()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {/* <div className='row mt-3 w-100' >
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div> */}

            <div className="mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        {title}
                        <UserAddOutlined className='' />
                    </Button>
                    <Modal title={title}
                        // ""
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <RegisterCompany />
                    </Modal>
                </div>
            </div>
            <div className="mt-4">
                <div className="row w-100">
                    <div className="col-8">
                        <div className="card shadow">
                            <div className="card-header bg-white border-0">
                                <div className="title" style={{ fontSize: 'medium' }}>Registered Companies</div>
                            </div>
                            <div className="card-body mt-n5">
                                {companies.loading ?
                                    <Skeleton active />
                                    :
                                    <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/manage/${resource}/profile/${cell._id}`, cell) }} tableContainerClas='mt-n2' className='bg-inf mt-n3' data={companies.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' trStyle={{ cursor: 'pointer' }} >
                                        <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                                        <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                                        <TableHeaderColumn dataField='admin' dataFormat={formatAdmin}>Role</TableHeaderColumn>
                                    </BootstrapTable>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function formatAdmin(cell) {
        if (cell)
            return `${cell.firstName} ${cell.lastName}`
        else
            return <Tag color='geekblue'>Not Assigned</Tag>
    }
}
