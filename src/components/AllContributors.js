import React from 'react';
import {Table, message, Modal, List} from 'antd'
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import {getTheIssues} from "../actions/issueActions";
import {axiosClient} from "../tools/axiosClient";
import {getOneIssue} from "../config/url";

// const columns = [{
//     title: 'Id',
//     dataIndex: 'id',
//     render: text => <a href="javascript:;" onClick={this.getOneIssue}>{text}</a>,
// }, {
//     title: 'Offender',
//     dataIndex: 'offender',
// }, {
//     title: 'Time',
//     dataIndex: 'time',
// }];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class AllContributors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            showIssueModal: false,
            issueData: {},
            columns: [{
                title: 'Id',
                dataIndex: 'id',
                render: text => <a href="javascript:;" onClick={() => this.getIssue(text)}>{text}</a>,
            }, {
                title: 'First Name',
                dataIndex: 'firstName',
            }, {
                title: 'Last Name',
                dataIndex: 'lastName',
            },{
                title: 'Email',
                dataIndex: 'email',
            },{
                title: 'PhoneNumber',
                dataIndex: 'phoneNumber',
            }]
        }
    }

    componentDidMount() {
        this.props.getIssues()
    }

    componentWillReceiveProps(props) {
        console.log(props)
        if (props.issues) {
            let issues = props.issues.map((issue) => {
                return {
                    id: issue.id,
                    firstName: issue.firstName,
                    lastName: issue.lastName,
                    email: issue.email,
                    phoneNumber: issue.phoneNumber,
                    time: new Date(issue.timestamp * 1000).toDateString()
                }
            })
            this.setState({issues})

            console.log(props.issues)
        }
    }

    getIssue = (id) => {
        this.props.showLoading()
        // message.loading('Getting Cards', 1);         
        axiosClient.get(getOneIssue(id))
            .then((response) => {
                this.setState({
                    showIssueModal: true,
                    issueData: response.data
                })
                this.props.hideLoading()

            })
            .catch((error) => {
                message.error("Couldn't retrieve issue", 2);
                this.props.hideLoading()
            })

    }

    render() {
        return (
            <React.Fragment>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.issues}
                       pagination={false} loading={!this.props.issues.length}/>
                {this.state.showIssueModal && (
                    <Modal
                        title={"Contributors Details"}
                        visible={this.state.showIssueModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelModal}
                        footer={null}
                    >
                        <section>
                            <div className='issue_modal_detail'>
                                <h4>Description</h4>
                                <p>{this.state.issueData.id}</p>
                            </div>
                            <div className='issue_modal_detail'>
                                <h4>Location</h4>
                                <p>{this.state.issueData.firstName}</p>
                            </div>
                            <div className='issue_modal_detail'>
                                <h4>Issue Types</h4>
                                <p>{this.state.issueData.lastName}</p>
                            </div>
                            <div className='issue_modal_detail'>
                                <h4>Offender Name</h4>
                                <p>{this.state.issueData.email}</p>
                            </div>
                            <div className='issue_modal_detail'>
                                <h4>Offender Mobile Number</h4>
                                <p>{this.state.issueData.phoneNumber}</p>
                            </div>
                            {/* <div className='issue_modal_detail'>
                                <h4>Witness Type</h4>
                                <p>{this.state.issueData.data.witnesstpe}</p>
                            </div> */}
                        </section>
                    </Modal>
                )}
            </React.Fragment>
        )
    }
    handleCancelModal=()=>{
        this.setState({
            showIssueModal:false
        })
    }
    handleOk=()=>{
        this.setState({
            showIssueModal:false
        })
    }
}

const mapStateToProps = (state) => {
    return {
        issues: state.issues
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading: () => dispatch(showLoading()),
        hideLoading: () => dispatch(hideLoading()),
        getIssues: () => dispatch(getTheIssues())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllContributors);
