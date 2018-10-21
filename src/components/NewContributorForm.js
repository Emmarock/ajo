import React from 'react';
import {Form, Icon, Input, Button, Select, Radio, message} from 'antd';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'
import {axiosClient} from "../tools/axiosClient";
import {postIssue} from "../config/url";

const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class NewIssueForm extends React.Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {                
                values["id"] = uuidv4()
                values["regDatetime"] =new Date().toDateString()
                console.log(values);
                this.props.showLoading();
                axiosClient.post(postIssue, values)
                    .then(response => {
                        this.props.endCall()
                        message.success("Issue successfully submitted", 2)
                        message.info(`We are always here to help\n. 
                              The issue would be resolved soon. \nPlease save this id- ${response.data.id}\n. 
                                       and use it to track the resolution process `, 6);
                        this.props.hideLoading()
                    })
                    .catch((error) => {
                        message.error("Error, Issue not submitted", 1)
                        this.props.hideLoading()
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
               
                <FormItem label="Contributor First Name">
                    {getFieldDecorator('firstName', {
                        rules: [{required: true, message: 'Please enter first name for the contributor!'}],
                    })(
                        <Input placeholder="Contributor's First Name"/>
                    )}
                </FormItem>
                <FormItem label="Contributor Last Name">
                    {getFieldDecorator('lastName', {
                        rules: [{required: true, message: 'Please enter last name for the contributor!'}],
                    })(
                        <Input placeholder="Contributor's Last Name"/>
                    )}
                </FormItem>

                <FormItem label="Contributor Number">
                    {getFieldDecorator('phoneNumber', {
                         rules: [{required: true, message: 'Please enter phone number for the contributor!'}],
                    })(
                        <Input placeholder="Contributor's Number"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('gender', {
                        rules: [{required: true, message: 'Please select your gender!'}],
                    })(
                        <RadioGroup>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="Contributor Email">
                    {getFieldDecorator('email', {
                         rules: [{required: true, message: 'Please enter email for the contributor!'}],
                    })(
                        <Input placeholder="Contributor's Email"/>
                    )}
                </FormItem>
                <FormItem label="State of Residence">
                    {getFieldDecorator('stat', {
                        rules: [{required: true, message: 'Please enter state of residence!'}],
                    })(
                        <Input placeholder="State of Residence"/>
                    )}
                </FormItem>
                <FormItem label="Home Address">
                    {getFieldDecorator('city', {
                        rules: [{required: true, message: 'Please input the  description for contributors home address!'}],
                    })(
                        <TextArea prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="Home Address" rows={3}/>
                    )}
                </FormItem>

                <FormItem label="Other Details">
                    {getFieldDecorator('otherDetails', {
                        // rules: [{required: true, message: 'Please enter a location!'}],
                    })(
                        <Input placeholder="Other Details"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('notificationMode', {
                        rules: [{required: true, message: 'Please select one!'}],
                    })(
                        <RadioGroup>
                            <Radio value="Test">Eye Witness</Radio>
                            <Radio value="Me">Happened to me</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                
               
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NewIssueForm)

const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading: () => dispatch(showLoading()),
        hideLoading: () => dispatch(hideLoading()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
