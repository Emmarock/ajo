import React, {Component} from 'react';
import './App.css';
import {Layout, DatePicker, Collapse} from 'antd';
import {Route, Switch, Redirect} from 'react-router-dom';
import TopBar from './components/TopBar.js'
import SideMenu from './components/SideMenu'
import AllContributors from './components/AllContributors.js'
import UnassignedIssues from './components/UnassignedIssues.js'
import PendingIssues from './components/PendingIssues.js'
import FollowedUpIssues from './components/FollowedUpIssues.js'
import ClosedIssues from './components/ClosedIssues.js'
import LoadingBar from 'react-redux-loading-bar';


const {Content} = Layout;
const {Panel} = Collapse;
 
class App extends Component {
    onDateChange = () => {

    }

    render() {
        return (
            <Layout>
                <LoadingBar progressIncrease={5} updateTime={100}
                            style={{backgroundColor: '#fff', height: '3px', position: 'fixed', zIndex: 99999}}/>
                <TopBar/>
                <Layout>
                    <SideMenu {...this.props}/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <section className="date__heading">
                            <div style={{
                                height:'32px'
                            }}>
                                <DatePicker onChange={this.onDateChange}/>
                            </div>
                            <h1> <span style={{
                                fontWeight:'400'
                            }}>Today: </span>
                                {new Date().toDateString()}
                            </h1>
                        </section>
                        <Content style={{
                            minHeight: 280,
                            display:'flex',

                        }}>
                            <section style={{
                                flexGrow:2,
                                // background: '#fff',
                                // padding: 24,
                                margin: 0,
                            }}>
                                <Switch>
                                    <Route path="/unassigned_issues" component={UnassignedIssues} exact/>
                                    <Redirect strict from={"/unassigned_issues/"} to={"/unassigned_issues"}/>
                                    <Route path="/all_issues" component={AllContributors} exact/>
                                    <Redirect strict from={"/all_issues/"} to={"/all_issues"}/>
                                    <Route path="/pending_issues" component={PendingIssues} exact/>
                                    <Redirect strict from={"/pending_issues/"} to={"/pending_issues"}/>
                                    <Route path="/followed_up_issues" component={FollowedUpIssues} exact/>
                                    <Redirect strict from={"/followed_up_issues/"} to={"/followed_up_issues"}/>
                                    <Route path="/closed_issues" component={ClosedIssues} exact/>
                                    <Redirect strict from={"/closed_issues/"} to={"/closed_issues"}/>

                                    <Redirect strict from={"/"} to={"/all_issues"}/>
                                </Switch>
                            </section>
                            <section style={{
                                width:'300px',
                                marginLeft: '20px',
                                padding: '0 20px'
                            }}>
                                <h2 style={{
                                    fontWeight:'300'
                                }}>Tips</h2>
                                <Collapse accordion>
                                    <Panel header="Are you a victim of sexual assault, harassment or human trafficking, past or present?" key="1">
                                        <p>Sexual harassment, assault or violence of any form
                                            should not be tolerated, You are not alone, thousands of others
                                            are also victims, but this needs to be stopped, and "YES" it
                                            can be "STOPPED" BY "YOU" and other victims. Little information
                                            exists about these assaults and as such these offenders
                                            continue to walk freely amongst us. Take a "BOLD STEP" today
                                            to "ANONYMOUSLY REPORT" any violence or abuse done to you. Help
                                            us gather enough reports and information required to put an end
                                            to these violence and abuses and prosecute these offenders.</p>
                                    </Panel>
                                    <Panel header="Have you been an eyewitness to a sexual assault?" key="2">
                                        <p>These abuses towards women and humans in general should
                                            not be condoned. These abuses could have health implications
                                            and as such they could exposed the victims to several other
                                            medical risks that could even be fatal.

                                            Report any case of violence or abuse, or
                                            trafficking of any sort that you witness. You can report will
                                            be anonymous if you like it to be and these offenders will
                                            never know who you are. Conversely if you'd like to be
                                            incentivised for reporting, we'll be giving out tokens to
                                            reporters.</p>
                                    </Panel>
                                    <Panel header="Are you afraid of reporting an assault?" key="3">
                                        <p>Don't be, Be rest assured that You'll remain ANONYMOUS
                                            if you like and do not have to continue to live with such
                                            traumas, Our systems completely ensure this. These offenders
                                            will continue to offend if actions are not taken against them.</p>
                                    </Panel>
                                    <Panel header="How do I get medical aid after a trauma?" key="4">
                                        <p>A lot of implications exist have an abuse, these could
                                            vary from Post traumatic depressions, Health and Psychological
                                            implications that could in some case expose victims to diseases
                                            and some could even be fatal.

                                            We have programs that you could easily and freely signup for,
                                            as we work closely with Medical centers, Psychological clinics
                                            and other Therapy facilities to help "YOU" get the proper
                                            aid and assistance you need, and continue to live and maintain
                                            a healthy and depressed free life. Feel free to Register for
                                            any of our programs and meet with other people going through
                                            similar distressed as you.</p>
                                    </Panel>
                                    <Panel header="How do I prevent sexual harassments and assaults?" key="5">
                                        <p>Take responsibility for your safety, be environmentally
                                            conscious. Primary prevention seeks to prevent sexual assault
                                            before it occurs by changing environments so that they are
                                            safer for women and girls. Report any unnecessary complements
                                            about your characteristics, as these are also harassments.
                                            Be conscious and report attempts before they lead t an abuse.</p>
                                    </Panel>
                                    <Panel header="How is a reported case handled?" key="6">
                                        <p>We work closely with Local Law enforcement agencies,
                                            Lawyers and private investigators to look closely into
                                            reports and in essence gather enough intelligence to eventually
                                            prosecute the reported offenders.</p>
                                    </Panel>
                                </Collapse>
                            </section>


                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
