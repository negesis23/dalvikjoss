package com.dalvikjoss;

public class TemplateInjector {
    private final String template;

    public TemplateInjector(String template) {
        this.template = template;
    }

    public String inject(String ssrResult) {
        String head = extractToken(ssrResult, "<HEAD_START>", "<HEAD_END>");
        String state = extractToken(ssrResult, "<STATE_START>", "<STATE_END>");
        String html = extractToken(ssrResult, "<HTML_START>", "<HTML_END>");
        if (state == null || state.trim().isEmpty()) state = "{}";
        String result = template.replace("</head>", head + "\n</head>");
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