import React from 'react'


const UpdatedComponent = (OriginalComponent) => {
    class NewComponent extends React.Component {
        render() {
            return (
                <>
                Hi there {this.props.names}
                    <OriginalComponent name='daniel david' {...this.props} />
                </>
            )
        }
    }
    return NewComponent
}

export default UpdatedComponent