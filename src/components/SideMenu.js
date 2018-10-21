import React, {Component} from 'react';
import {Layout, Menu, Icon, Button, Modal, message} from 'antd';
import {history} from "../index";
import NewIssueForm from './NewContributorForm'
import {connect} from 'react-redux'
import {getTheIssues} from "../actions/issueActions"

const {SubMenu} = Menu;
const {Sider} = Layout;


class SideMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

    goToPage = (obj) => {
        if (obj.key === '1') {
            history.push(`/all_issues`)
        }
        if (obj.key === '2') {
            history.push(`/unassigned_issues`)
        }
        if (obj.key === '3') {
            history.push(`/pending_issues`)
        }
        if (obj.key === '4') {
            history.push(`/followed_up_issues`)
        }
        if (obj.key === '5') {
            history.push(`/closed_issues`)
        }

    }
    showModal = () => {
        this.setState({showModal: true})
    }
    handleCancelModal = () => {
        this.setState({
            showModal: false,
        })
    }
    getSelectedKeys = () => {
        if (this.props.location.pathname === '/all_issues') return '1'
        if (this.props.location.pathname === '/unassigned_issues') return '2'
        if (this.props.location.pathname === '/pending_issues') return '3'
        if (this.props.location.pathname === '/followed_up_issues') return '4'
        if (this.props.location.pathname === '/closed_issues') return '5'
    }

    render = () => {
        return (
            <Sider width={200} style={{background: '#f7f9fa'}}>
                <section style={{
                    textAlign: 'center',
                    padding: "30px",
                }}>
                    <Button type="default" style={{
                        width: '100%',
                        fontFamily: '"Helvetica Neue","Segoe UI",sans-serif !important',
                        fontWeight: '300'
                    }}
                            onClick={this.showModal}
                    >Add Contributor</Button>
                </section>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{height: '100%', borderRight: 0}}
                    onSelect={this.goToPage}
                    selectedKeys={
                        [this.getSelectedKeys()]
                    }
                >
                    <Menu.Item key="1">
                        <Icon type="question-circle-o"/>
                        {/*<Icon type="pie-chart"/>*/}
                        <span>All Contributors</span>
                        <span className='menu__number'>{this.props.issues.records?this.props.issues.records.length: 0}</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="question-circle-o"/>
                        {/*<Icon type="pie-chart"/>*/}
                        <span>Unassigned</span>
                        <span className='menu__number'>{this.props.issues.records?this.props.issues.records.length: 0}</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        {/*<Icon type="loading" />*/}
                        <Icon type="loading-3-quarters"/>
                        {/*<Icon type="desktop"/>*/}
                        <span>Pending</span>
                        <span className='menu__number'>{this.props.issues.records?this.props.issues.records.length: 0}</span>
                    </Menu.Item>
                    {/*<Menu.Item key="4">*/}
                        {/*/!*<Icon type="inbox"/>*!/*/}
                        {/*<Icon type="notification"/>*/}
                        {/*<span>Follow Up</span>*/}
                        {/*<span className='menu__number'>8</span>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="5">
                        {/*<Icon type="inbox"/>*/}
                        <Icon type="check"/>
                        <span>Closed</span>
                        <span className='menu__number'>20</span>
                    </Menu.Item>
                </Menu>
                {this.state.showModal && (
                    <Modal
                        title={"Enter Contributors Details"}
                        visible={this.state.showModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelModal}
                        footer={null}
                    >
                        <NewIssueForm endCall={this.endCall}/>
                    </Modal>
                )}
            </Sider>
        )
    }
    endCall = () => {
        this.handleCancelModal();
        this.props.getIssues();
    }
}

const mapStateToProps = (state) => {
    return {
        issues: state.issues
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getIssues: () => dispatch(getTheIssues())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);