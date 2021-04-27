import { Button, Result } from 'antd'
import React from 'react'

export default function InternalError({ status, title, action }) {
    return (
        <Result
            status={status}
            title={title || "There are some problems with your operation."}
            extra={
                <Button type="primary" key="console">
                    Refresh
                </Button>
            }
        />
    )
}
