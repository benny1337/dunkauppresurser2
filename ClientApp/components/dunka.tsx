import * as domain from "../domain/file";
import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FileStore from '../store/Files';
import Dropzone from 'react-dropzone';
import * as Enumerable from 'linq';
import Connections from './connections';
import Files from './files';

type Props = FileStore.IFilesState & typeof FileStore.ActionCreators;

class Dunka extends React.Component<Props, void> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Ladda upp resurser i CRM</h1>
                <Connections />
                <Files />
            </div>
        );
    }

    renderProgressBar() {
        return (
            <div className="test">
                <progress className="html5" max="100" value={this.props.percentage}></progress>
            </div>
        );

    }
}

export default connect(
    (state: ApplicationState) => state.files,
    FileStore.ActionCreators
)(Dunka);
