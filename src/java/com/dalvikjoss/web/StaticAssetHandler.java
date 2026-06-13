package com.dalvikjoss.web;

import com.dalvikjoss.core.Utils;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.NanoHTTPD.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class StaticAssetHandler {
    private final File distDir;

    public StaticAssetHandler(File distDir) {
        this.distDir = distDir;
    }

    public Response handle(String uri) {
        File file = new File(distDir, uri.substring(1));
        if (file.exists() && file.isFile()) {
            String mimeType = resolveMimeType(uri);
            try {
                return NanoHTTPD.newFixedLengthResponse(Response.Status.OK, mimeType, new FileInputStream(file), file.length());
            } catch (IOException e) {
                return NanoHTTPD.newFixedLengthResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, "500");
            }
        }
        return NanoHTTPD.newFixedLengthResponse(Response.Status.NOT_FOUND, NanoHTTPD.MIME_PLAINTEXT, "404");
    }

    public boolean isStaticAsset(String uri) {
        return uri.startsWith("/assets/") || uri.equals("/favicon.svg") || uri.equals("/favicon.ico");
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