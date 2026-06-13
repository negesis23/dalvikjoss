package com.dalvikjoss.web;

import com.dalvikjoss.engine.JsEngine;
import com.dalvikjoss.core.Main;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.NanoHTTPD.IHTTPSession;
import fi.iki.elonen.NanoHTTPD.Method;
import fi.iki.elonen.NanoHTTPD.Response;

public class Router {
    private final StaticAssetHandler staticAssetHandler;
    private final TemplateInjector templateInjector;
    private final JsEngine jsEngine;

    public Router(StaticAssetHandler staticAssetHandler, TemplateInjector templateInjector, JsEngine jsEngine) {
        this.staticAssetHandler = staticAssetHandler;
        this.templateInjector = templateInjector;
        this.jsEngine = jsEngine;
    }

    public Response route(IHTTPSession session) {
        String uri = session.getUri();
        Method method = session.getMethod();
        if (staticAssetHandler.isStaticAsset(uri)) {
            return staticAssetHandler.handle(uri);
        }
        if (Method.GET.equals(method)) {
            return handleSsr(session);
        }
        return NanoHTTPD.newFixedLengthResponse(Response.Status.METHOD_NOT_ALLOWED, "text/plain", "405");
    }

    private Response handleSsr(IHTTPSession session) {
        try {
            String uri = session.getUri();
            String query = session.getQueryParameterString();
            if (query == null) query = "";
            
            StringBuilder json = new StringBuilder();
            json.append("{");
            json.append("\"path\":\"").append(uri).append("\",");
            json.append("\"query\":\"").append(query.replace("\"", "\\\"")).append("\",");
            json.append("\"uptime\":").append(System.currentTimeMillis() - Main.startTime).append(",");
            json.append("\"freeMemory\":").append(Runtime.getRuntime().freeMemory());
            json.append("}");

            String ssrResult = jsEngine.render(json.toString());
            String html = templateInjector.inject(ssrResult);
            return NanoHTTPD.newFixedLengthResponse(Response.Status.OK, "text/html", html);
        } catch (Exception e) {
            e.printStackTrace();
            return NanoHTTPD.newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "text/plain", "500");
        }
    }
}