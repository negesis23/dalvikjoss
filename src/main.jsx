import { hydrate } from 'nano-jsx';
import { App } from './app';
import './index.css';

hydrate(<App />, document.getElementById('app'));
