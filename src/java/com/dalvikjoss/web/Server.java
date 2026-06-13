package com.dalvikjoss.web;

import com.dalvikjoss.core.Utils;
import com.dalvikjoss.engine.JsEngine;

import fi.iki.elonen.NanoHTTPD;
import java.io.File;
import java.io.IOException;

public class Server extends NanoHTTPD {
    private final Router router;

    public Server(int port, File distDir, File distServerDir) throws IOException {
        super(port);
        StaticAssetHandler staticAssetHandler = new StaticAssetHandler(distDir);
        File indexFile = new File(distDir, "index.html");
        if (!indexFile.exists()) throw new IOException("Missing index.html");
        TemplateInjector templateInjector = new TemplateInjector(Utils.readFile(indexFile));
        File serverJsFile = new File(distServerDir, "server.js");
        if (!serverJsFile.exists()) throw new IOException("Missing server.js");
        JsEngine jsEngine = new JsEngine(Utils.readFile(serverJsFile));
        this.router = new Router(staticAssetHandler, templateInjector, jsEngine);
    }

    @Override
    public Response serve(IHTTPSession session) {
        return router.route(session);
    }
}