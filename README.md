# Minecolonies Admin

A web UI that connects to a WebSocket to display relevant information about your MineColonies Colony.

## Getting Started

- Install dependencies using `yarn` or `npm`
- Make a copy of `.env.local.example` and rename it to `.env.local`
  - Change `WEBSOCKET_URL` and `NEXT_PUBLIC_WEBSOCKET_URL` to the address of your WebSocket (including the `wss://` or
    `ws://` prefix)
- Run `yarn dev` or `npm run dev`
