import { h } from 'nano-jsx';
import { App } from '../../shared/app';
import { StoreContext } from '../../shared/context/StoreContext';

export const renderToString = (node) => {
  if (node === null || node === false || typeof node === 'undefined') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(renderToString).join('');

  if (node.tagName) return node.toString();

  if (node.component) {
    const { component, props } = node;
    if (component.prototype && component.prototype.render) {
      const inst = new component(props);
      return renderToString(inst.render());
    }
    if (typeof component === 'function') {
      return renderToString(component(props));
    }
  }

  return '';
};

export const render = (path) => {
  globalThis._nano = {
    isSSR: true,
    location: { pathname: path, search: '' },
    ssrTricks: { isWebComponent: () => false, renderWebComponent: () => null }
  };
  globalThis.location.pathname = path;

  let fetchedData = {};
  if (globalThis.javaFetch) {
    try {
      fetchedData = JSON.parse(globalThis.javaFetch(path));
    } catch (e) {}
  }

  const initialState = { route: path, data: fetchedData };
  StoreContext.set(initialState);

  const root = <App initialState={initialState} />;
  const appHtml = renderToString(root);
  const stateJson = JSON.stringify(initialState);

  return { html: appHtml, state: stateJson };
};

export const assemble = (data) => {
  return '<HEAD_START><HEAD_END><STATE_START>' + data.state + '<STATE_END><HTML_START>' + data.html + '<HTML_END>';
};