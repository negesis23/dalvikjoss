package com.dalvikjoss;

import fi.iki.elonen.NanoHTTPD;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Server extends NanoHTTPD {
    private final File distDir;
    private final JsEngine jsEngine;
    private final String indexHtmlTemplate;

    public Server(int port, File distDir, File distServerDir) throws IOException {
        super(port);
        this.distDir = distDir;
        
        // Load index.html template from the client build dist folder
        File indexFile = new File(distDir, "index.html");
        if (!indexFile.exists()) {
            throw new IOException("index.html template not found at: " + indexFile.getAbsolutePath());
        }
        this.indexHtmlTemplate = Utils.readFile(indexFile);
        
        // Load the server.cjs SSR bundle
        File serverJsFile = new File(distServerDir, "server.cjs");
        if (!serverJsFile.exists()) {
            throw new IOException("server.cjs bundle not found at: " + serverJsFile.getAbsolutePath());
        }
        String bundleCode = Utils.readFile(serverJsFile);
        this.jsEngine = new JsEngine(bundleCode);
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Method method = session.getMethod();
        
        // Log request info
        System.out.println("[" + method + "] " + uri);
        
        // Serve static assets (Vite places built assets under /assets/*)
        if (uri.startsWith("/assets/") || uri.equals("/favicon.svg") || uri.equals("/favicon.ico")) {
            File file = new File(distDir, uri.substring(1));
            if (file.exists() && file.isFile()) {
                String mimeType = resolveMimeType(uri);
                try {
                    InputStream input = new FileInputStream(file);
                    return newFixedLengthResponse(Response.Status.OK, mimeType, input, file.length());
                } catch (IOException e) {
                    System.err.println("Error serving static file: " + file.getAbsolutePath());
                    e.printStackTrace();
                    return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, "Internal Server Error");
                }
            } else {
                return newFixedLengthResponse(Response.Status.NOT_FOUND, NanoHTTPD.MIME_PLAINTEXT, "File Not Found");
            }
        }
        
        // Catch-all: Route SSR pages for GET requests
        if (Method.GET.equals(method)) {
            try {
                // Call QuickJS engine to render the requested path
                String renderedAppHtml = jsEngine.render(uri);
                
                // Inject the SSR'd HTML into the client HTML template's app div
                String target = "<div id=\"app\"></div>";
                String replacement = "<div id=\"app\">" + renderedAppHtml + "</div>";
                String html = indexHtmlTemplate.replace(target, replacement);
                
                return newFixedLengthResponse(Response.Status.OK, "text/html", html);
            } catch (Exception e) {
                System.err.println("SSR rendering failed for path: " + uri);
                e.printStackTrace();
                return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, 
                    "Server-Side Rendering Exception:\n" + e.toString());
            }
        }
        
        return newFixedLengthResponse(Response.Status.METHOD_NOT_ALLOWED, NanoHTTPD.MIME_PLAINTEXT, "Method Not Allowed");
    }

    private String resolveMimeType(String uri) {
        if (uri.endsWith(".js")) return "application/javascript";
        if (uri.endsWith(".css")) return "text/css";
        if (uri.endsWith(".svg")) return "image/svg+xml";
        if (uri.endsWith(".png")) return "image/png";
        if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) return "image/jpeg";
        if (uri.endsWith(".ico")) return "image/x-icon";
        return "application/octet-stream";
    }
}
