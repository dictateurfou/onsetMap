[![Image from Gyazo](https://i.gyazo.com/53f7b5df77f18c226564af8c1b882ba8.jpg)](https://gyazo.com/53f7b5df77f18c226564af8c1b882ba8)
[![Image from Gyazo](https://i.gyazo.com/2afaac92fc1a0619fe0e98e8833389e9.jpg)](https://gyazo.com/2afaac92fc1a0619fe0e98e8833389e9)
## config
Edit config.js
```
blips = static point
type = type of blip
```
### create dynamic blip
we have 2 export function for create update or remove blip
```LUA
createBlip(uniqIdentifier :string,type :string,pos :tab) -- for create or update blip 
removeBlip(id : string) for remove spécific blip with identifier
```

### customisation of minimap
currently it is possible to modify the style of the mini map I would add a config to make the modification easier, and give an example of gta5 map style
