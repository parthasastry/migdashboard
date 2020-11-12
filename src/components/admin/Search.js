import React, { Component } from 'react';
import axios from 'axios';
import EditInventory from './EditInventory';

export class Search extends Component {

    state = {
        loading: false,
        data: [],
        current: {}
    }

    getInventory = async () => {
        const url = 'https://lpywo58r43.execute-api.us-east-1.amazonaws.com/dev/inventory'
        let res = await axios.get(url);
        let data = res.data;
        this.setState({ data: data })
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getInventory();
        this.setState({ loading: false });
    }

    onDelete = (serverid, appid) => {
        console.log(serverid, appid);
        const url = `https://lpywo58r43.execute-api.us-east-1.amazonaws.com/dev/inventory?serverid=${serverid}&appid=${appid}`;
        
        axios.delete(url)
            .then(d => {
                console.log(d)
                this.setState({ loading: true });
                this.getInventory();
                this.setState({ loading: false });
            })
            .catch(err => console.log(err))
    }

    onEdit = (d) => {
        console.log("onEdit, data: ", d)
        this.setState({ current: d })
    }

    render() {

        const tableHeader = <thead>
            <tr>
                <th>Server</th>
                <th>Application</th>
                <th>Cutover Date</th>
                <th>Environment</th>
                <th>Migrated</th>
                <th>Group</th>
                <th>OS</th>
                <th>Server Type</th>
                <th>Action</th>
            </tr>
        </thead>

        const tableData = this.state.data.map((d, i) => {
            return (
                <tr key={i}>
                    <td>{ d.server_name }</td>
                    <td>{ d.app_name }</td>
                    <td>{ d.cutover_date }</td>
                    <td>{ d.environment }</td>
                    <td>{ d.migrated }</td>
                    <td>{ d.move_group }</td>
                    <td>{ d.server_os }</td>
                    <td>{ d.server_type }</td>
                    <td>
                        <a href="#add-inventory-modal" className="modal-trigger">
                            <i className="material-icons">add</i>
                        </a>
                        <a href='#' onClick={this.onDelete.bind(this, d.server_name, d.app_name)}>
                            <i className="material-icons">delete</i>
                        </a>
                        <a href="#edit-inventory-modal" onClick={this.onEdit.bind(this, d)} className="modal-trigger">
                            <i className="material-icons">edit</i>
                        </a>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <table className="striped centered">
                    { tableHeader }
                    <tbody>
                        { tableData }
                    </tbody>
                </table>
                    
                <EditInventory data={this.state.current} />
            </div>
        )
    }
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

export default Search
