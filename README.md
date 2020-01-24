[![Image from Gyazo](https://i.gyazo.com/5cce498747dbb5f351f1ad64d2a0330e.gif)](https://gyazo.com/5cce498747dbb5f351f1ad64d2a0330e)
[![Image from Gyazo](https://i.gyazo.com/aee9d7ad4ca77e9e2a7081ed5a454bec.gif)](https://gyazo.com/aee9d7ad4ca77e9e2a7081ed5a454bec)

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
