import React, { Component } from 'react';
import Chart from 'react-apexcharts'; 

export class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: {},
            series: [{
                data: []
            }]
        }
    }

    componentDidMount() {
        const options = {
            title: {
                text: 'Servers in Waves',
                align: 'center'
            },
            chart: {
                id: 'Waves'
            },
            xaxis: {
                categories: this.props.cutover_dates,
                title: {
                    text: 'Waves'
                }
            },
            yaxis: {
                title: {
                    text: 'Servers',
                },
            },
            colors: ['#4576b5', '#000000'],
        }

        const series = [{
            name: 'Plan',
            data: this.props.plan
        }, {
            name: 'Actual',
            data: this.props.actual
        }]

        this.setState({
            options: options,
            series: series
        })
    }

    render() {
        return (
            <div>
                <Chart 
                    options={this.state.options} 
                    series={this.state.series} 
                    type="bar" 
                    // height="500"
                    // width="1000"
                />
            </div>
        )
    }
}

export default Schedule
