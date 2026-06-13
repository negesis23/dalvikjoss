import { h } from 'nano-jsx';
import { setupEnv } from './shim';
import { render, assemble, renderToString } from './engine';
import { ErrorPage } from '../../shared/pages/Error';

setupEnv(h);

globalThis.renderApp = (path) => {
  try {
    const result = render(path);
    return assemble(result);
  } catch (err) {
    const errorNode = <ErrorPage message={err.message} stack={err.stack} />;
    const errorHtml = renderToString(errorNode);
    return assemble({ html: errorHtml, state: '{}' });
  }
};