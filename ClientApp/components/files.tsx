import * as domain from "../domain/file";
import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FileStore from '../store/Files';
import Dropzone from 'react-dropzone';
import * as Enumerable from 'linq';

type Props = FileStore.IFilesState & typeof FileStore.ActionCreators;

class Files extends React.Component<Props, void> {

    constructor(props: Props) {
        super(props);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach((f) => {
            var file = new domain.File();
            file.name = f.name;
            file.unmodifiedFile = f;
            this.props.addFile(file);
        });
    }

    upload() {
        Enumerable.from(this.props.selectedConnection.files).where(x => !x.isPaused).forEach((file) => {
            this.props.uploadFile(file);
        });
    }

    render() {
        if(!this.props.selectedConnection) return  null;

        return (
            <div>
                <Dropzone onDrop={(accepted, rejected) => { this.onDrop(accepted, rejected) } }>
                    <div>Drag and droppa filer här för att lägga till dem i listan</div>
                </Dropzone>

                <ul>
                    {this.props.selectedConnection.files.map((file, index) => {
                        return (
                            <li className={file.isPaused ? "filerow paused" : "filerow"} key={index}>{file.name} <button onClick={() => this.props.toggleFilePuase(file)}>Pausa</button> <button onClick={() => this.props.removeFile(file)}>Ta bort</button></li>
                        )
                    })}
                </ul>

                {this.props.isLoading ? this.renderProgressBar() : null}

                <button onClick={() => this.upload()}>Kör</button>
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
)(Files);
