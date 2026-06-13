package com.dalvikjoss.core;

import com.dalvikjoss.web.Server;
import fi.iki.elonen.NanoHTTPD;
import java.io.File;

public class Main {
    public static void main(String[] args) {
        int port = 8080;
        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
            }
        }

        File distDir = new File("dist");
        File distServerDir = new File("dist-server");

        try {
            final Server server = new Server(port, distDir, distServerDir);
            server.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);

            Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
                @Override
                public void run() {
                    server.stop();
                }
            }));

            synchronized (Main.class) {
                try {
                    Main.class.wait();
                } catch (InterruptedException e) {
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}