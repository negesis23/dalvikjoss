import { h, Fragment, hydrate } from 'nano-jsx';
import { App } from '../../shared/app';
import '../../shared/index.css';

const initialState = window.__INITIAL_STATE__ || {};
hydrate(<App initialState={initialState} />, document.getElementById('app'));