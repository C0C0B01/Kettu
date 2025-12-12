# Kettu
A mod for Discord on Mobile

### [![Discord](https://img.shields.io/discord/1368145952266911755?logo=discord&logoColor=%23ffffffff&color=%231D88CF&link=https%3A%2F%2Fdiscord.gg%2F6cN7wKa8gp)](https://discord.gg/6cN7wKa8gp) [![Static Badge](https://img.shields.io/badge/kofi-cocobo1-%23FF6433?style=flat&logo=ko-fi&labelColor=%23ffffff)](https://www.ko-fi.com/cocobo1) ![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cocobo1/Kettu?gitea_url=https%3A%2F%2Fwww.codeberg.org&logo=codeberg&logoColor=%23ffffffff)

## Installing

### Android
- **Root** with Xposed - [KettuXposed](https://github.com/C0C0B01/KettuXposed/releases/latest)
- **Non-root** - [KettuManager](https://github.com/C0C0B01/KettuManager/releases/latest)

If you do not know what root is, go with the manager

### iOS

- **Jailbroken** - [KettuTweak](https://github.com/C0C0B01/KettuTweak)
- **Jailed** - [BTLoader](https://github.com/CloudySn0w/BTLoader)

if you dont know what jailbreak is, go with BTLoader

## Building
1. Install a Kettu loader with loader config support (any mentioned in the [Installing](#installing) section).
1. Go to Settings > General and enable Developer Settings.
1. Clone the repo:
    ```
    git clone https://codeberg.org/cocobo1/Kettu
    ```
1. Install dependencies:
    ```
    bun i
    ```
1. Build Kettu's code:
    ```
    bun run build
    ```
1. In the newly created `dist` directory, run a HTTP server. I recommend [http-server](https://www.npmjs.com/package/http-server).
1. Go to Settings > Developer enabled earlier. Enable `Load from custom url` and input the IP address and port of the server (e.g. `http://192.168.1.236:4040/kettu.js`) in the new input box labelled `Kettu URL`.
1. Restart Discord. Upon reload, you should notice that your device will download Kettu's bundled code from your server, rather than GitHub.
1. Make your changes, rebuild, reload, go wild!

Alternatively, you can directly *serve* the bundled code by running `bun run serve`. `kettu.js` will be served on your local address under the port 4040. You will then insert `http://<local ip address>:4040/kettu.js` as a custom url and reload. Whenever you restart your mobile client, the script will rebuild the bundle as your client fetches it.