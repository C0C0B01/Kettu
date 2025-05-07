# Pupu ![Discord](https://img.shields.io/discord/1368145952266911755?style=flat&logo=discord&label=Discord)

A mod for Discord on Android

## Installing

- **Root** with Xposed - [PupuXposed](https://github.com/C0C0B01/PupuXposed/releases/latest)
- **Non-root** - [PupuManager](https://github.com/C0C0B01/PupuManager/releases/latest)

## Building
1. Install a Pupu loader with loader config support (any mentioned in the [Installing](#installing) section).
1. Go to Settings > General and enable Developer Settings.
1. Clone the repo:
    ```
    git clone https://github.com/C0C0B01/Pupu
    ```
1. Install dependencies:
    ```
    pnpm i
    ```
1. Build Pupu's code:
    ```
    pnpm build
    ```
1. In the newly created `dist` directory, run a HTTP server. I recommend [http-server](https://www.npmjs.com/package/http-server).
1. Go to Settings > Developer enabled earlier. Enable `Load from custom url` and input the IP address and port of the server (e.g. `http://192.168.1.236:4040/pupu.js`) in the new input box labelled `Pupu URL`.
1. Restart Discord. Upon reload, you should notice that your device will download Pupu's bundled code from your server, rather than GitHub.
1. Make your changes, rebuild, reload, go wild!

Alternatively, you can directly *serve* the bundled code by running `pnpm serve`. `pupu.js` will be served on your local address under the port 4040. You will then insert `http://<local ip address>:4040/pupu.js` as a custom url and reload. Whenever you restart your mobile client, the script will rebuild the bundle as your client fetches it.
