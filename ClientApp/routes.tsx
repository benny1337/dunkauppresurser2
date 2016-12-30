import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import Info from './components/Info';
import Dunka from './components/dunka';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Dunka }} />
    <Route path='/info' components={{ body: Info}} />
</Route>;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
