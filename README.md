```diff
- know iussue 
if you create an ui after that of the map, be sure to have set SetWebVisibility (WEB_HITINVISIBLE)
in your ui otherwise the click and zoom of the whole map will not work mini map does not have
this problem because not require click event
```

[![Image from Gyazo](https://i.gyazo.com/53f7b5df77f18c226564af8c1b882ba8.jpg)](https://gyazo.com/53f7b5df77f18c226564af8c1b882ba8)
[![Image from Gyazo](https://i.gyazo.com/2afaac92fc1a0619fe0e98e8833389e9.jpg)](https://gyazo.com/2afaac92fc1a0619fe0e98e8833389e9)
## config
Edit config.js
```
blips = static point
type = type of blip
```
if you add a new type with new image make sure you have added in packages.json and in web/img folder or map not load because wait all images load
### create dynamic blip
we have 2 export function for create update or remove blip
```LUA
createBlip(uniqIdentifier :string,type :string,pos :tab) -- for create or update blip 
removeBlip(id : string) for remove spécific blip with identifier
```

### customisation of minimap
exemple of config for gta5 style mini map

[![Image from Gyazo](https://i.gyazo.com/c2aaf0162bccf48f239a65017d3481c8.png)](https://gyazo.com/c2aaf0162bccf48f239a65017d3481c8)
###### in config.js
```JS
miniMapClass = "mini-gta-style"; //css style
minimapWidth = 300; //width
minimapHeight = 200; //height
playerScreenDividende = 1.3; //position camera of minimap (center is 2)
baseScale = 0.8; //zoom of minimap default = 1,
```
###### in style.css (never change width or height in css)
```CSS
.mini-gta-style{
    box-shadow:0 0 1em black;
    position:absolute;
    bottom:0.5em;
    left:0.5em;
    border-radius:10px;
}
```
