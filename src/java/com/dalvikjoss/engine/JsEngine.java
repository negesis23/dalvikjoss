package com.dalvikjoss.engine;

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
            QuickJS runtime = QuickJS.createRuntime();
            context = runtime.createContext();
            JavaJsBridge.attach(context);
            context.executeVoidScript(bundleCode, "server.js");
            runtimeThreadLocal.set(runtime);
            contextThreadLocal.set(context);
        }
        String script = "globalThis.renderApp(" + quote(path) + ");";
        try {
            return (String) context.executeStringScript(script, "render.js");
        } catch (Exception e) {
            return "<div style='color:red;'>Java Runtime Error: " + e.getMessage() + "</div>";
        }
    }

    private String quote(String val) {
        if (val == null) return "''";
        return "'" + val.replace("'", "\\'") + "'";
    }
}