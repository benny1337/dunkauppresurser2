import { File, FileType, Connection } from "../domain/file";
import { IAction } from "../domain/iaction";
import { Action, Reducer, ThunkAction } from 'redux';
import * as Enumerable from 'linq';
import { fetch, addTask } from 'domain-task';

export interface IFilesState {
    connections: Connection[],
    selectedConnection: Connection,
    percentage: number,
    isLoading: boolean,
}

const FILE_WAS_ADDED = 'FILE_WAS_ADDED';
const FILE_PAUSE_WAS_TOGGLED = 'FILE_PAUSE_WAS_TOGGLED';
const FILE_WAS_REMOVED = 'FILE_WAS_REMOVED';
const FILE_WAS_ADDED_TO_UPLOAD_QUEUE = 'FILE_WAS_ADDED_TO_UPLOAD_QUEUE';
const FILE_UPLOAD_WAS_STARTED = 'FILE_UPLOAD_WAS_STARTED';
const FILE_UPLOAD_PERCENTAGE_CHANGED = 'FILE_UPLOAD_PERCENTAGE_CHANGED';
const CONNECTION_WAS_ADDED = 'CONNECTION_WAS_ADDED';
const CONNECTION_WAS_REMOVED = 'CONNECTION_WAS_REMOVED';
const CONNECTION_WAS_UPDATED = 'CONNECTION_WAS_UPDATED';
const CONNECTION_WAS_SELECTED = 'CONNECTION_WAS_SELECTED';

export const ActionCreators = {
    connectionWasAdded: (c: Connection) => { return { type: CONNECTION_WAS_ADDED, payload: c } as IAction },
    connectionWasRemoved: (c: Connection) => { return { type: CONNECTION_WAS_REMOVED, payload: c } as IAction },
    connectionWasUpdated: (c: Connection) => { return { type: CONNECTION_WAS_UPDATED, payload: c } as IAction },
    connectionWasSelected: (c: Connection) => { return { type: CONNECTION_WAS_SELECTED, payload: c } as IAction },
    fileUploadPercentageChanged: (percetage: number) => { return { type: FILE_UPLOAD_PERCENTAGE_CHANGED, payload: percetage } as IAction },
    fileUploadWasStarted: () => { return { type: FILE_UPLOAD_WAS_STARTED } as IAction; },
    addFile: (file: File) => { return { type: FILE_WAS_ADDED, payload: file } as IAction },
    toggleFilePuase: (file: File) => { return { type: FILE_PAUSE_WAS_TOGGLED, payload: file } as IAction },
    removeFile: (file: File) => { return { type: FILE_WAS_REMOVED, payload: file } as IAction },
    uploadFile: (file: File) => {
        return (dispatch: any, getState: () => IFilesState) => {
            dispatch(ActionCreators.fileUploadWasStarted());
            var data = new FormData();
            data.append(file.name, file.unmodifiedFile);

            fetch('/api/file', {
                method: 'POST',
                body: data
            });
        }
    }
}

export const reducer: Reducer<IFilesState> = (state = {
    connections: [],
    selectedConnection: null,
    percentage: 10,
    isLoading: false,
} as IFilesState, action: IAction) => {
    switch (action.type) {
        case CONNECTION_WAS_ADDED:
            var newconnectionid = 1;
            if (state.connections.length > 0) {
                newconnectionid = Enumerable.from(state.connections).max(x => x.id) + 1;
            }
            action.payload.id = newconnectionid;
            return Object.assign({}, state, {
                connections: [action.payload, ...state.connections]
            });
        case CONNECTION_WAS_REMOVED:
            return Object.assign({}, state, {
                connections: Enumerable.from(state.connections).where(x => x.id != action.payload.id).toArray()
            });
        case CONNECTION_WAS_SELECTED:
            return Object.assign({}, state, {
                selectedConnection: action.payload
            });
        case FILE_UPLOAD_WAS_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                percentage: 0
            });
        case FILE_UPLOAD_PERCENTAGE_CHANGED:
            return Object.assign({}, state, {
                percentage: action.payload,
                isLoading: action.payload > 0 && action.payload < 100 ? true : false
            });
        case FILE_WAS_ADDED:
            var newid = 1;
            if (state.selectedConnection.files.length > 0) {
                newid = Enumerable.from(state.selectedConnection.files).max(x => x.id) + 1;
            }
            action.payload.id = newid;
            state.selectedConnection.files = [action.payload, ...state.selectedConnection.files]
            return Object.assign({}, state, {

            });
        case FILE_WAS_REMOVED:
            state.selectedConnection.files = Enumerable.from(state.selectedConnection.files).where(x => x.id != action.payload.id).toArray()
            return Object.assign({}, state, {
                selectedConnection: Object.assign({}, state.selectedConnection)
            });
        case FILE_PAUSE_WAS_TOGGLED:
            var file = Enumerable.from(state.selectedConnection.files).where(x => x.id == action.payload.id).firstOrDefault();
            file.isPaused = !file.isPaused;
            return Object.assign({}, state);

        default: return state
    }
};
