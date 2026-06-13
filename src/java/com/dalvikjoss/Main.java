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
                System.err.println("Invalid port number argument. Using default port: " + port);
            }
        }

        // Configure directories based on project workspace
        File workspaceDir = new File("/data/data/com.termux/files/home/dalvikjoss");
        File distDir = new File(workspaceDir, "dist");
        File distServerDir = new File(workspaceDir, "dist-server");

        if (!distDir.exists() || !distDir.isDirectory()) {
            System.err.println("Error: Client build directory 'dist' does not exist! Please build it first.");
            System.exit(1);
        }
        if (!distServerDir.exists() || !distServerDir.isDirectory()) {
            System.err.println("Error: SSR build directory 'dist-server' does not exist! Please build it first.");
            System.exit(1);
        }

        try {
            final Server server = new Server(port, distDir, distServerDir);
            
            // Start the server with a reasonable socket read timeout
            server.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            System.out.println("\n=============================================");
            System.out.println("  DalvikJoss SSR SPA server is running!");
            System.out.println("  Access: http://localhost:" + port);
            System.out.println("=============================================\n");

            // Gracefully stop the server on shutdown signal
            Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
                @Override
                public void run() {
                    System.out.println("Shutdown signal received. Stopping server...");
                    server.stop();
                    System.out.println("Server stopped successfully.");
                }
            }));

            // Keep the main thread alive to prevent JVM from exiting
            synchronized (Main.class) {
                try {
                    Main.class.wait();
                } catch (InterruptedException e) {
                    System.out.println("Main thread interrupted.");
                }
            }
        } catch (Exception e) {
            System.err.println("Critical failure starting the HTTP server:");
            e.printStackTrace();
            System.exit(1);
        }
    }
}
