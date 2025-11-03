<div align="center">

  <img src="src/assets/icons/kettu.png" alt="Saukko logo" width="200px" style="border-radius: 50%" />
  
  # 🦦 Saukko

  Easily install Saukko on Android

</div>

> [!CAUTION]
> Using Saukko might get you banned from discord.

## 📥 Installing

### Coming soon.

## For now:
1. Install [Kettu](https://codeberg.org/cocobo1/Kettu) with the [Kettu Manager](https://codeberg.org/cocobo1/KettuManager).
2. Go to the Kettu settings.
3. Activate "Developer settings"
4. Load Kettu from a custom URL
5. Enter the url: https://raw.githubusercontent.com/Vaiskiainen/Saukko/refs/heads/github/dist/kettu.js
6. Enjoy using Saukko.

## 👷🏽‍♂️ Building
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
# Images
<div style="display: flex; justify-content: center; gap: 20px;">
  <img src="https://github.com/Vaiskiainen/Saukko/blob/github/src/assets/icons/AddonBrowser.png?raw=true" height="750" style="border-radius: 10px;" />
  <img src="https://github.com/Vaiskiainen/Saukko/blob/github/src/assets/icons/ThemesPage.png?raw=true" height="750" style="border-radius: 10px;" />
</div>

## Forked from: [Kettu](https://codeberg.org/cocobo1/Kettu)
