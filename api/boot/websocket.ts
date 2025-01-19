import websocket from "@fastify/websocket";
import { Server, logger } from "gadget-server";

/**
 * Boot plugin to set up WebSocket support for the application
 * Registers the @fastify/websocket plugin and configures error handling
 */
export default async function plugin(server: Server) {
  try {
    // Register the WebSocket plugin with default options
    await server.register(websocket);

    // Add connection error handling
    server.addHook("onReady", () => {
      server.websocketServer.on("connection", (socket) => {
        socket.on("error", (error) => {
          logger.error({ error }, "WebSocket connection error occurred");
          socket.terminate();
        });

        socket.on("close", () => {
          logger.debug("WebSocket connection closed");
        });
      });
    });
  } catch (error) {
    logger.error({ error }, "Failed to initialize WebSocket support");
  }
}