package com.dalvikjoss.web;

import com.dalvikjoss.core.Utils;

public class TemplateInjector {
    private final String template;

    public TemplateInjector(String template) {
        this.template = template;
    }

    public String inject(String ssrResult) {
        if (!ssrResult.contains("<HTML_START>")) {
            return template.replace("<div id=\"app\"></div>", "<div id=\"app\"><div style='padding:20px;background:#fee2e2;color:#991b1b;border:2px solid #ef4444;border-radius:8px;font-family:monospace;'><h3>SSR Execution Error</h3><pre>" + ssrResult + "</pre></div></div>");
        }

        String head = extractToken(ssrResult, "<HEAD_START>", "<HEAD_END>");
        String state = extractToken(ssrResult, "<STATE_START>", "<STATE_END>");
        String html = extractToken(ssrResult, "<HTML_START>", "<HTML_END>");
        if (state == null || state.trim().isEmpty()) state = "{}";

        String result = template;
        
        // Handle Title Injection
        if (head.contains("<title>")) {
            String newTitle = extractToken(head, "<title>", "</title>");
            if (result.contains("<title>")) {
                result = result.replaceFirst("<title>.*</title>", "<title>" + newTitle + "</title>");
            } else {
                result = result.replace("</head>", "<title>" + newTitle + "</title>\n</head>");
            }
            // Remove title from head to avoid double injection
            head = head.replaceFirst("<title>.*</title>", "");
        }

        result = result.replace("</head>", head + "\n</head>");
        String stateScript = "<script>window.__INITIAL_STATE__ = " + state + ";</script>";
        if (result.contains("<div id=\"app\"></div>")) {
            result = result.replace("<div id=\"app\"></div>", "<div id=\"app\">" + html + "</div>\n" + stateScript);
        } else {
            result = result.replace("<body>", "<body>\n<div id=\"app\">" + html + "</div>\n" + stateScript);
        }
        return result;
    }

    private String extractToken(String source, String startToken, String endToken) {
        int start = source.indexOf(startToken);
        int end = source.indexOf(endToken);
        if (start != -1 && end != -1) return source.substring(start + startToken.length(), end);
        return "";
    }
}