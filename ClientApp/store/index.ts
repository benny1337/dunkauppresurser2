import * as Files from './Files';

export interface ApplicationState {
    files: Files.IFilesState;
}

export const reducers = {
    files: Files.reducer,
};
