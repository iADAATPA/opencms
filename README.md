# Open Cms Translator

A chrome extension that helps OpenCms editors to translate their contents

## User guide
1. Download the open-cms-translator.zip and extract it somewhere
2. Open Chrome
3. Copy and paste chrome://extensions into the navigation bar in Chrome or use the menu button (the three vertical dots) at the top right corner of Chrome to access the More tools > Extensions option.
4. Ensure that the "Developer mode" checkbox in the top right-hand corner is checked. 
5. Click on the "Load unpacked extension" button and chose tthe directory you have extracted in step 1
6. Click on the new icon that has appeared in the Chrome toolbar.
7. Enter your api key and log in
8. Enter the base URL of the OpenCms admin tool (for instance http://212.4.98.129:23456) and click the "save" button
9. Connect to the OpenCms admin tool and edit some content
10. Click on the blue "eye" button and select the translation engine you want to use
11. When a textfield  is focused, a "t" button appears at the right of the field. Click on it to translate

## For developers
```
git clone https://github.com/LaurentBie/open-cms-translator2
npm install 
```
For dev:
```
npm run dev
```
For Prod
```
npm run build
```

## More
This extension is based on https://www.npmjs.com/package/vue-webpack-chrome-extension-template






