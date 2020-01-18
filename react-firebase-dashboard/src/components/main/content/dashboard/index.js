import React from 'react';
import './index.css';

import { Chart } from 'react-google-charts';

const Dashboard = (props) => {

    var options = {
        legend: 'false',
        displayMode: 'regions',
        colors: ['#b472eb', '#a337ff'],
        backgroundColor: '#f3f5f6',
        datalessRegionColor: '#dbc6eb'
    };

    var rows = [
        ['Germany',202],
        ['France', 300],
        ['Russia', 500],
        ['US', 900],
    ];

    var columns = [{
        'type': 'string',
        'label' : 'Country'
    },{
        'type' : 'number',
        'label' : 'Visitors'
    }];

    var visitors = [
        ['10:00',300],
        ['10:20', 290],
        ['10:40', 340],
        ['11:00', 305],
    ];

    var visitorsOptions = {
        height: 250,
        pointSize: 10,
        explorer: true,
        chartArea: {
            left: 4 + '%',
            width: 87 + '%',
        },
        colors: ['#b472eb', '#a337ff'],
        backgroundColor: '#f3f5f6'
    };

    return (
        <div className="dashboard container">

            <div className='row'>
                <div className='small-tab'>
                    <div className='small-tab__block'>
                        <div className='title'>Total users</div>
                        <div className='count'>239</div>
                    </div>
                    <div className='small-tab__icon'>
                        <img src={require('../../../../assets/images/icons/dashboard-users.svg')} alt=""/>
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
                <div className='small-tab'>
                    <div className='small-tab__block'>
                        <div className='title'>Events</div>
                        <div className='count'>15</div>
                    </div>
                    <div className='small-tab__icon'>
                        <img src={require('../../../../assets/images/icons/dashboard-calendar.svg')} alt=""/>
                    </div>
                </div>
                <div className='small-tab'>
                    <div className='small-tab__block'>
                        <div className='title'>Total earnings</div>
                        <div className='count'>$ 15.600</div>
                    </div>
                    <div className='small-tab__icon'>
                        <img src={require('../../../../assets/images/icons/dashboard-dollar.svg')} alt=""/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='double-tab'>
                    <div className='double-tab__info'>
                        <h2 className='H2'><strong>Users</strong> by Country</h2>
                        <div className='double-tab__countries'>
                            <div className='country'>US : <span>900</span></div>
                            <div className='country'>Russia : <span>500</span></div>
                            <div className='country'>France : <span>300</span></div>
                            <div className='country'>Germany : <span>202</span></div>
                        </div>
                        <div className='double-tab__visitors'>Total visitors <span>1902</span></div>
                    </div>
                    <div className='double-tab__chart'>
                        <Chart chartType="GeoChart"
                            width={"550px"}
                            height={"300px"}
                            rows={rows}
                            columns={columns}
                            options={options}
                            graph_id="GeoChart"
                            legend_toggle={true}/>
                    </div>
                </div>
                <div className='medium-tab'>
                    <h2 className='H2'><strong>Task</strong> Board</h2>
                    <div className='medium-tab__container'>
                        <div className='row'>
                            <div className='title'>How is the weather</div>
                            <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                            <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                        </div>
                        <div className='row'>
                            <div className='title'>How is the weather</div>
                            <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                            <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                        </div>
                        <div className='row'>
                            <div className='title'>How is the weather</div>
                            <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                            <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                        </div>
                        <div className='row'>
                            <div className='title'>How is the weather</div>
                            <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                            <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                        </div>
                    </div>
                    <button className="button">Clear list</button>
                </div>
                <div className='medium-tab'>
                    <h2 className='H2'><strong>Recent</strong> Activity</h2>
                    <div className='medium-tab__container medium-tab__activity'>
                        <div className="row">
                            <div className="photo">
                                <img src={require('../../../../assets/images/email-user.png')} alt=""/>
                            </div>
                            <div className="row__message">
                                <a href="" className="title">How is the weather</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                            </div>                           
                        </div>
                        <div className="row">
                            <div className="photo">
                                <img src={require('../../../../assets/images/email-user.png')} alt=""/>
                            </div>
                            <div className="row__message">
                                <a href="" className="title">How is the weather</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                            </div>                           
                        </div>
                        <div className="row">
                            <div className="photo">
                                <img src={require('../../../../assets/images/email-user.png')} alt=""/>
                            </div>
                            <div className="row__message">
                                <a href="" className="title">How is the weather</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis et enim luctus mamus.semcing elit.</div>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='full-tab'>
                    <Chart chartType="AreaChart"
                        width={"100%"}
                        height={"270px"}
                        rows={visitors}
                        columns={columns}
                        options={visitorsOptions}
                        graph_id="Visitors"
                        legend_toggle={true}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;