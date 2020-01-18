import React from 'react';
import './index.css';

import { Chart } from 'react-google-charts';

const Users = (props) => {
    
    var columns = [{
        'type': 'string',
        'label' : 'Country'
    },{
        'type' : 'number',
        'label' : 'Activity'
    }];
    
    var users = [
        ['11.03.17', 10],
        ['13.05.17', 50],
        ['02.08.17', 20],
        ['10.01.18', 40],
    ];
    
    var usersOptions = {
        height: 240,
        pointSize: 10,
        explorer: true,
        chartArea: {
            left: 7 + '%',
            width: 82 + '%',
        },
        colors: ['#b472eb', '#a337ff'],
        backgroundColor: '#f3f5f6'
    };

    return (
        <div className="users container">
            <div className='users__content'>
                <div className='row'>
                    <div className='small-tab'>
                        <div className='small-tab__block'>
                            <div className='title'>Visits per Day</div>
                            <div className='count'>4082</div>
                        </div>
                        <div className='small-tab__icon'>
                            <img src={require('../../../../assets/images/icons/dashboard-users.svg')} alt=""/>
                        </div>
                    </div>
                    <div className='small-tab'>
                        <div className='small-tab__block'>
                            <div className='title'>Registred Users</div>
                            <div className='count'>239</div>
                        </div>
                        <div className='small-tab__icon'>
                            <img src={require('../../../../assets/images/icons/registred-users.svg')} alt=""/>
                        </div>
                    </div>
                    <div className='small-tab'>
                        <div className='small-tab__block'>
                            <div className='title'>Messages</div>
                            <div className='count'>1639</div>
                        </div>
                        <div className='small-tab__icon'>
                            <img src={require('../../../../assets/images/icons/dashboard-letter.svg')} alt=""/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='list-tab'>
                        <div className='head-row'>
                            <span className='name'>name</span>
                            <span className='login'>login</span>
                            <span className='email'>email</span>
                            <span className='registration'>registration</span>
                            <span className='status'>user status</span>
                            <span className='options'>options</span>
                        </div>
                        <div className='search-row'>
                            <input type="text" placeholder="Click on the column title to change search parameters"/>
                        </div>
                        <div className='display-row'>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status'>active</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status'>active</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status'>active</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status'>active</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status banned'>banned</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='name'>Jimmy</div>
                                <div className='login'>JGrate</div>
                                <div className='email'>JGrate@gmail.com</div>
                                <div className='registration'>14.02.2017</div>
                                <div className='status'>active</div>
                                <div className='options'>
                                    <div className='options__info'></div>
                                    <div className='options__edit'></div>
                                    <div className='options__trash'></div>
                                </div>
                            </div>
                        </div>
                        <div className='pagination-row'>
                            <div className='pagination-block'>
                                <div className='pagination-btn'>1</div>
                                <div className='pagination-btn'>2</div>
                                <div className='pagination-btn'>3</div>
                                <div className='pagination-btn-points'>...</div>
                                <div className='pagination-btn'>20</div>
                            </div>
                            <div className='newUser-button'>Add new user</div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='graphic-tab'>
                        <Chart chartType="AreaChart"
                            width={"100%"}
                            height={"200px"}
                            rows={users}
                            columns={columns}
                            options={usersOptions}
                            graph_id="Users"
                            legend_toggle={true}/>
                    </div>
                </div>             
            </div>
            <div className='users__sidebar'>
                <div className='photo'>
                    <img src={require('../../../../assets/images/sidebar-user.png')} alt=""/>
                </div>
                <div className='name'><span>Catherine</span> Doe</div>
                <div className='job'>webdesigner</div>
                <div className='area'>New York Area</div>
                <div className='short-line'></div>
                <div className='title'>Registration date</div>
                <div className='info'>14.02.2017</div>
                <div className='title'>Email address</div>
                <div className='info'>CatherineDoe@gmail.com</div>
                <div className='title'>Phone</div>
                <div className='info'>+1 917-535-1804</div>
                <div className='title'>Address</div>
                <div className='info'>714 Duncan Avenue New York</div>
                <div className='long-line'></div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button className='message-button'>Message user</button>
            </div>         
        </div>
    )
}

export default Users;