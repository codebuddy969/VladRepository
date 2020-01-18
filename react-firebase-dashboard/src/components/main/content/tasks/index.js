import React from 'react';
import './index.css';

import { Chart } from 'react-google-charts';

const Tasks = (props) => {

    var options = {
        width: 500,
        height: 400,
        pieHole :0.3,
        legend: { 
            position: "left",
            alignment: "center",
            textStyle: { 
                color: "#a337ff",
                fontSize: 18                         
            }
        },
        chartArea: {
            left: 30,
            width: 460,
            height: 450
        },
        colors: ['#e01453','#25b236', '#3860cb', '#8732ce'],
        backgroundColor: 'transparent'

};

    var customers = [
        ['Delta Service',202],
        ['Sales Corp', 300],
        ['Calipso', 500],
        ['Stone Wall', 900],
    ];

    var products = [
        ['IPhone X',50],
        ['Samsung UN24H4000', 10],
        ['HP EliteBook 840 G1', 26],
        ['VIZIO SmartCast', 18],
    ];

    var columns = [{
        'type': 'string',
        'label' : 'Company'
    },{
        'type' : 'number',
        'label' : 'Quantity'
    }];

    return (
        <div className="tasks container">

            <div className='tabtype-1'>
                <div className='head-row'>
                    <span className='number'>order nr</span>
                    <span className='customer'>customer</span>
                    <span className='status'>order status</span>
                    <span className='date'>ordering date</span>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status refund'>Refund</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>12984</div>
                        <div className='customer'>Delta Service co</div>
                        <div className='status'>Processing</div>
                        <div className='date'>05.01.2018</div>
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
            
            <div className='tabtype-1'>
                <div className='head-row'>
                    <span className='number'>product</span>
                    <span className='customer'>category</span>
                    <span className='status'>in stock</span>
                    <span className='date'>requested</span>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
                    </div>
                </div>

                <div className='display-row'>
                    <div className='row'>
                        <div className='number'>LG Xen TV</div>
                        <div className='customer'>Electronics</div>
                        <div className='stock'>50 items</div>
                        <div className='request'>3 items</div>
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

            <div className='tabtype-2'>
                <h2 className='H2'><strong>Best</strong> Customers</h2>
                <Chart chartType="PieChart"
                    width={"100%"}
                    height={"350px"}
                    rows={customers}
                    columns={columns}
                    options={options}
                    graph_id="Customers-Chart"
                    legend_toggle={true}/>
            </div>

            <div className='tabtype-3'>
                <h2 className='H2'>
                    <strong>Tasks</strong> Managment <span>Select task by clicking the left bar</span>
                </h2>
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
                <div className='button-group'>
                    <button className='button'>Clear</button>
                    <button className='button'>Add</button>
                    <button className='button'>Edit</button>
                </div>
            </div>
            
            <div className='tabtype-2'>
                <h2 className='H2'><strong>Best</strong> Selling Products</h2>
                <Chart chartType="PieChart"
                    width={"100%"}
                    height={"350px"}
                    rows={products}
                    columns={columns}
                    options={options}
                    graph_id="Products-Chart"
                    legend_toggle={true}/>
            </div>
        </div>
    )
}

export default Tasks;