import React, { Component } from 'react';
import axios from 'axios';
import Burndown from './Burndown';
import Schedule from './Schedule';
import Preloader from '../layout/Preloader';

export class Dashboard extends Component {
    state = {
        loading: false,
        cutover_dates: [],
        plan:  [],
        actual: [],
        cumulative_plan: [],
        cumulative_actual: []
    }
            
    getDashboardData = async () => {
        const url = 'https://lpywo58r43.execute-api.us-east-1.amazonaws.com/dev/burndown'
        let res = await axios.get(url);
        let data = res.data;
        
        const cutover_dates = Object.values(data["cutover_date"])
        const plan = Object.values(data["Plan"])
        const actual = Object.values(data["Actual"])
        const cumulative_plan = Object.values(data["Cumulative Plan"])
        const cumulative_actual = Object.values(data["Cumulative Actual"])

        this.setState({
            cutover_dates : cutover_dates,
            plan : plan,
            actual : actual,
            cumulative_plan : cumulative_plan,
            cumulative_actual : cumulative_actual
        })

    };


    componentDidMount() {
        this.setState({ loading: true });
        this.getDashboardData();
        this.setState({ loading: false });
    }

    render() {
        if(this.state.loading || this.state.cutover_date === null) {
            return <Preloader />
        }

        //last element in the cumulative plan array
        const servers_plan = this.state.cumulative_plan[this.state.cumulative_plan.length - 1];

        //last non-null element in the cumulative actual array
        const servers_actual = this.state.cumulative_actual.reverse().find( s => s != null )

        return (
            <div>
                <div className="row center">
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Servers</span>
                                Plan: {servers_plan}
                                <br />
                                Actual: {servers_actual}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="card grey lighten-1">
                            <div className="card-content">
                                <span className="card-title">Applications</span>
                                Plan: 10
                                <br />
                                Actual: 2
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Storage (TB)</span>
                                Plan: 24
                                <br />
                                Actual: 0
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row center">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Burnup</span>
                                {!this.state.loading && this.state.cutover_dates.length === 0 ? (<p>No data</p>) : (
                                    <Burndown 
                                        cutover_dates={this.state.cutover_dates}
                                        plan={this.state.cumulative_plan}
                                        actual={this.state.cumulative_actual}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Schedule</span>
                                {!this.state.loading && this.state.cutover_dates.length === 0 ? (<p>No data</p>) : (
                                    <Schedule 
                                    cutover_dates={this.state.cutover_dates}
                                    plan={this.state.plan}
                                    actual={this.state.actual}
                               />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
