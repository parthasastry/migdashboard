import React, { Component } from 'react';
import Chart from 'react-apexcharts'; 
import Preloader from '../layout/Preloader';

export class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: {},
            series: [{
                data: []
            }],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

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
            series: series,
            loading: false
        })
    }

    render() {
        if(this.state.loading) {
            return <Preloader />
        }
        
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
