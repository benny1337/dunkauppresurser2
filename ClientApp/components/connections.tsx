import { Connection } from '../domain/file';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FileStore from '../store/Files';
import * as Enumerable from 'linq';

type Props = FileStore.IFilesState & typeof FileStore.ActionCreators;
interface IState {
    isAddConnectionActive?: boolean;
    newConnectionName?: string;
    newConnectionString?: string;
}
class Connections extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isAddConnectionActive: false,
            newConnectionName: "",
            newConnectionString: "",
        }
    }

    toggleShowAddConnection() {
        this.setState({ isAddConnectionActive: !this.state.isAddConnectionActive })
    }

    addSkeletonConnectionString() {
        this.setState({
            newConnectionString: "Url=https://din-host.crm4.dynamics.com; Username=username@mail.se; Password=pw; authtype=Office365;"
        });
    }

    newConnectionNameWasChanged(value: string) {
        this.setState({
            newConnectionName: value
        });
    }

    newConnectionStringWasChanged(value: string) {
        this.setState({
            newConnectionString: value
        });
    }

    newConnectionWasSaved() {
        var c = new Connection();
        c.connectionstring = this.state.newConnectionString;
        c.files = [];
        c.name = this.state.newConnectionName;
        this.props.connectionWasAdded(c);
        this.setState({
            isAddConnectionActive: false,
        });
    }

    connectionWasSelected(c: Connection){
        this.props.connectionWasSelected(c);
    }

    render() {
        var self = this;
        return (
            <div>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {this.props.selectedConnection ? this.props.selectedConnection.name : "Välj CRM-instans"}
    <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {this.props.connections.map((connection, index) => {
                            return (<li key={index}><a onClick={() => self.connectionWasSelected(connection)}>{connection.name}</a></li>);
                        })}
                        <li role="separator" className="divider"></li>
                        <li><a onClick={() => this.toggleShowAddConnection()}>Ny instans</a></li>
                    </ul>
                </div>
                {this.renderAddConnection()}
            </div>
        );
    }

    renderAddConnection() {
        if (!this.state.isAddConnectionActive) return null;
        return (
            <div style={{
                padding: "20px",
                margin: "20px"
            }} className="alert alert-success">
                <h2>Ny CRM-instans</h2>

                <div className="input-group" style={{ margin: "10px" }}>
                    <input onBlur={(e) => this.newConnectionNameWasChanged((e.target as any).value)} style={{ width: "750px" }} defaultValue={this.state.newConnectionName} type="text" className="form-control" placeholder="Displayname" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group" style={{ margin: "10px" }}>
                    <input onBlur={(e) => this.newConnectionStringWasChanged((e.target as any).value)} style={{ width: "750px" }} defaultValue={this.state.newConnectionString} type="text" className="form-control" placeholder="Connectionstring" aria-describedby="basic-addon1" />
                </div>

                <button className="btn btn-warning" onClick={() => this.toggleShowAddConnection()}>Stäng</button>
                <button className="btn btn-primary" onClick={() => this.addSkeletonConnectionString()}>Skelett</button>
                <button className="btn btn-success" onClick={() => this.newConnectionWasSaved()}>Spara</button>
            </div>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.files,
    FileStore.ActionCreators
)(Connections);
