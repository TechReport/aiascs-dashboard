import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { qualityControllerAPI } from './qualityControllerAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'

export default function RegisteredQualityControllers() {
    const [qualityControllers, setQualityControllers] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchQualityControllers() {
        qualityControllerAPI.getAll('qualitycontrollers/')
            .then(res => {
                console.log(res)
                setQualityControllers({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on('updateQualityControllers', fetchQualityControllers);

    useEffect(() => {
        fetchQualityControllers()
        return () => {
            setQualityControllers({ loading: false, data: [] })
        }
    }, [])

    return (
        qualityControllers.loading ?
            <Skeleton active />
            :
            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/manage/qcontroller/profile/${cell._id}`, cell) }} tableContainerClas='mt-n2' className='bg-inf mt-n3' data={qualityControllers.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' trStyle={{ cursor: 'pointer' }} >
                <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='admin' dataFormat={formatAdmin}>Admin</TableHeaderColumn>
                {/* <TableHeaderColumn dataFormat={ActionMenu}>Action</TableHeaderColumn> */}
            </BootstrapTable>
    )

    function formatAdmin(cell) {
        if (cell)
            return `${cell.firstName} ${cell.lastName}`
        return <Tag color='geekblue'>Not Assigned</Tag>
    }

    // function ActionMenu(cell, row) {
    //     return (
    //         <>
    //             <Popover content='Edit'>
    //                 <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
    //             </Popover>
    //             <Popover content='View'>
    //                 <Button size='small' shape='circle' type='text' onClick={() => hist.push(`/manage/qcontroller/profile/${row._id}`, row)}><EyeOutlined className='text-dark' /></Button>
    //             </Popover>
    //         </>
    //     )
    // }
}
