package com.dalvikjoss;

import com.quickjs.JSContext;
import com.quickjs.JavaCallback;
import com.quickjs.JSArray;
import com.quickjs.JSObject;

public class JavaJsBridge {
    public static void attach(JSContext context) {
        context.registerJavaMethod(new JavaCallback() {
            @Override
            public Object invoke(JSObject receiver, JSArray args) {
                if (args.length() > 0) {
                    System.out.println("[JS LOG] " + args.get(0));
                }
                return null;
            }
        }, "javaLog");

        context.registerJavaMethod(new JavaCallback() {
            @Override
            public Object invoke(JSObject receiver, JSArray args) {
                if (args.length() > 0) {
                    String path = args.getString(0);
                    return "{\"fetched\":\"" + path + "\",\"serverTime\":" + System.currentTimeMillis() + "}";
                }
                return "{}";
            }
        }, "javaFetch");
    }
}