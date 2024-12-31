# hofstee (hofstee)

An app for a construction builder company

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### How to setup your machine to build android
See [Android Requirements](./src/assets/Android-Requirements.PNG).



### How to run the apk in emulator
``` n 
cd src-cordova
cordova run android
```
This will build the debug-apk located at
`\src-cordova\platforms\android\app\build\outputs\apk\debug`

### How to build the APK
> only once per PC
keytool -genkey -v -keystore my-release-key.keystore -alias hofstee_app -keyalg RSA -keysize 2048 -validity 20000

CN=dan vincent tagailo, OU=freelance org, O=dhans, L=mandaluyong, ST=metro manila, C=63 correct?

pass = 123233

> zipalign
zipalign -v 4 ./src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Hofstee.apk

> apksigner
apksigner sign --ks my-release-key.keystore --ks-key-alias hofstee_app Hofstee.apk
<enter pass> = 123233

> Publishing to playstore
https://quasar.dev/quasar-cli-vite/developing-cordova-apps/publishing-to-store

>
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-device-motion
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-statusbar

> generate icon using icongenie
icongenie generate -m cordova -i /path/to/source/icon.png [-b /path/to/background.png]
example:
icongenie generate -m cordova -i src/assets/icon-foreground.png [-b src/assets/icon-background.PNG]


> https://stackoverflow.com/questions/49689385/cordova-how-to-move-file-to-the-download-folder
> https://cordova.apache.org/docs/en/12.x/reference/cordova-plugin-file/index.html#writeFile

plugin add
>cd src-cordova && cordova plugin add cordova-plugin-battery-status

## ESLINT RULES 
> https://eslint.org/docs/latest/rules/space-after-function-name#rule-details

## Animation
> https://animate.style/

## Firebase cli reference
firebase projects:list

## Twilio recovery code
5KSXMXWSB8QJ5782W3QZ2T3C

## quickl scaffold
Usage
    $ quasar new <p|page> [-f <option>] <page_file_name>
    $ quasar new <l|layout> [-f <option>] <layout_file_name>
    $ quasar new <c|component> [-f <option>] <component_file_name>
    $ quasar new <b|boot> [-f ts] <boot_name>
    $ quasar new <s|store> [-f ts] <store_module_name>
    $ quasar new ssrmiddleware [-f ts] <middleware_name>