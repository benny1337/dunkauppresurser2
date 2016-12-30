import { ActionCreators } from './store/Files';
import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './configureStore';
import { ApplicationState } from './store';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
declare var $: any;


// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.

signalRStart(store, () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history} children={routes} />
        </Provider>,
        document.getElementById('react-app')
    );

});


function signalRStart(store: any, callback: () => void) {
    var connection = $.hubConnection();
    var hubProxy = connection.createHubProxy("broadcaster") as any;
    hubProxy.on("percentageWasChanged", (percentage: number) => {
        console.log(percentage);
        store.dispatch(ActionCreators.fileUploadPercentageChanged(percentage));
    });

    connection.start().done(() => callback());
}