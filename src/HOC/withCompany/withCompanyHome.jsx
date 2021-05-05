import React from "react";

const withCompanyProfile = (WrapedComponent, { RegisteredCompanies }, prop) => {
    class WithCompanyProfile extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                isModalVisible: false
            }
        }

        componentDidMount() {
            this.setState({
                data: [
                    { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
                    { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
                ]
            })
        }

        showModal = () => {
            this.setState({ isModalVisible: true })
        };

        handleOk = () => {
            this.setState({ isModalVisible: false })
        };

        handleCancel = () => {
            this.setState({ isModalVisible: false })
        };

        render() {
            return (
                <>
                    <WrapedComponent
                        isModalVisible={this.state.isModalVisible}
                        showModal={this.showModal}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        data={this.state.data}
                    />
                    <div className="mt-4">
                        <div className="row w-100">
                            <div className="col-8">
                                <div className="card shadow">
                                    <div className="card-header bg-white border-0">
                                        <div className="title" style={{ fontSize: 'medium' }}>Registered Quality Controllers</div>
                                    </div>
                                    <div className="card-body mt-n5">
                                        {/* <RegisteredQualityControllers /> */}
                                        <RegisteredCompanies />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return WithCompanyProfile;
};

export default withCompanyProfile;
