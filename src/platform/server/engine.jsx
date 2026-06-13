import { h, renderSSR } from 'nano-jsx';
import { App } from '../../shared/app';
import { StoreContext } from '../../shared/context/StoreContext';

export const render = (ctx) => {
  const path = ctx.path || '/';
  
  globalThis._nano = {
    isSSR: true,
    location: { pathname: path, search: ctx.query ? '?' + ctx.query : '' },
    ssrTricks: { isWebComponent: () => false, renderWebComponent: () => null }
  };
  globalThis.location.pathname = path;

  const initialState = { 
    route: path, 
    query: ctx.query || '',
    serverInfo: {
      uptime: Number(ctx.uptime) || 0,
      freeMemory: Number(ctx.freeMemory) || 0,
      platform: 'Dalvik/QuickJS'
    },
    data: { fetched: path, serverTime: Date.now() } 
  };

  const appHtml = renderSSR(<App initialState={initialState} />);
  const stateJson = JSON.stringify(initialState);

  return { 
    html: appHtml, 
    state: stateJson, 
    title: globalThis.document.title || 'dalvikjoss' 
  };
};

export const assemble = (data) => {
  const head = '<title>' + data.title + '</title>';
  return '<HEAD_START>' + head + '<HEAD_END><STATE_START>' + data.state + '<STATE_END><HTML_START>' + data.html + '<HTML_END>';
};