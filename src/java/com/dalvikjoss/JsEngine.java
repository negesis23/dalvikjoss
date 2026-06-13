package com.dalvikjoss;

import com.quickjs.QuickJS;
import com.quickjs.JSContext;

public class JsEngine {
    private final String bundleCode;
    private final ThreadLocal<JSContext> contextThreadLocal = new ThreadLocal<JSContext>();
    private final ThreadLocal<QuickJS> runtimeThreadLocal = new ThreadLocal<QuickJS>();

    public JsEngine(String bundleCode) {
        this.bundleCode = bundleCode;
    }

    public String render(String path) {
        JSContext context = contextThreadLocal.get();
        if (context == null) {
            System.out.println("Initializing QuickJS context on thread: " + Thread.currentThread().getName());
            QuickJS runtime = QuickJS.createRuntime();
            context = runtime.createContext();
            
            // Set up SSR flag in _nano global object
            context.executeStringScript("globalThis._nano = { isSSR: true };", "init.js");
            
            // Load the server bundle (this exposes globalThis.renderApp)
            context.executeStringScript(bundleCode, "server.js");
            
            runtimeThreadLocal.set(runtime);
            contextThreadLocal.set(context);
        }
        
        // Execute renderApp and return the rendered HTML string
        String script = "globalThis.renderApp(" + quote(path) + ");";
        return context.executeStringScript(script, "render.js");
    }

    private String quote(String val) {
        if (val == null) {
            return "''";
        }
        return "'" + val.replace("'", "\\'") + "'";
    }
}
