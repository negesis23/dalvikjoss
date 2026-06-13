import { renderSSR } from 'nano-jsx/lib/ssr';
import { App } from './app';

globalThis.renderApp = (path) => {
  return renderSSR(<App />, { pathname: path });
};
