import { h, Fragment, hydrate } from 'nano-jsx';
import { App } from '../../shared/app';
import '../../shared/index.css';

const init = () => {
  const initialState = window.__INITIAL_STATE__ || {};
  const appContainer = document.getElementById('app');
  if (appContainer) {
    hydrate(<App initialState={initialState} />, appContainer);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}