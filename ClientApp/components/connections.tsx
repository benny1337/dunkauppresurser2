import { Connection } from '../domain/file';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FileStore from '../store/Files';
import * as Enumerable from 'linq';

type Props = FileStore.IFilesState & typeof FileStore.ActionCreators;

class Connections extends React.Component<Props, void> {

    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <div>
                    
            </div>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.files,
    FileStore.ActionCreators
)(Connections);
