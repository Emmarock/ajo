import React from 'react'
import {Layout, Input} from 'antd';
import "../assets/css/topbar.css"
import Logo from '../assets/images/logo.svg'
import {Table, message, Modal, List} from 'antd'
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import {getTheIssues} from "../actions/issueActions";
import {axiosClient} from "../tools/axiosClient";
import {getOneIssue} from "../config/url";

const {Header} = Layout;
const {Search} = Input


class TopBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showIssueModal: false,
            issueData: {},
        }
    }

    search = (value) => {
        this.props.showLoading()
        // message.loading('Getting Cards', 1);
        
        axiosClient.get(getOneIssue(value))
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
    render = () => {
        return (
            <Header className="header">
                <div><img src={Logo} width={70}/>
                </div>
                <Search
                    placeholder="Search for a contributor by Issue ID"
                    onSearch={value => this.search(value)}
                    style={{
                        width: 400,
                        float: "right",
                        marginTop: "15px",
                        height:'30px'
                    }}
                />
                {this.state.showIssueModal && (
                    <Modal
                        title={"Contributor Details"}
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
            </Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);