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
