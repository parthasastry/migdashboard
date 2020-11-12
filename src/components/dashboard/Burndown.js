import React, { Component } from 'react';
import Chart from 'react-apexcharts'; 
import Preloader from '../layout/Preloader';

export class Burndown extends Component {

    constructor(props){
        super(props);
        this.state = {
            options: {},
            series: [{
                data: []
            }],
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

        var options = {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
            },
                toolbar: {
                    show: false
                }
            },
            colors: ['#545454', '#77B6EA'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Servers Migration Burnup',
                align: 'center'
            },
            xaxis: {
                categories: this.props.cutover_dates,
                title: {
                    text: 'Cutover Dates'
                }
            },
            yaxis: {
                title: {
                    text: 'Servers'
                },
                min: 0,
                max: 100
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };

        var series = [
                {
                    name: "Plan",
                    data: this.props.plan
                },
                {
                    name: "Actual",
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
                    type="line"
                    // height="500"
                    // width="1000"
                />
            </div>
        )
    }
}

export default Burndown
