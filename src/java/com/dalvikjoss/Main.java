package com.dalvikjoss;

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

        File workspaceDir = new File("/data/data/com.termux/files/home/dalvikjoss");
        File distDir = new File(workspaceDir, "dist");
        File distServerDir = new File(workspaceDir, "dist-server");

        if (!distDir.exists() || !distDir.isDirectory()) {
            System.exit(1);
        }
        if (!distServerDir.exists() || !distServerDir.isDirectory()) {
            System.exit(1);
        }

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