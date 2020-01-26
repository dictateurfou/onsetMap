local width, height = GetScreenSize()
local mapUi = CreateWebUI(0, 0, 0, 0, 0, 45)
SetWebAlignment(mapUi, 0, 0)
SetWebAnchors(mapUi, 0, 0, 1, 1)
SetWebURL(mapUi, "http://asset/onsetMap/web/index.html")
SetWebVisibility(mapUi, WEB_HITINVISIBLE)
local uniqId = 0;

function forceUIFocus(ui)
    local allUi = GetAllWebUI()
    for k,v in pairs(allUi) do
        if v ~= ui then
            if GetWebVisibility(v) ~= WEB_HIDDEN then
                SetWebVisibility(v, WEB_HITINVISIBLE)
            end
        end
    end
end

function createBlip(id,type,pos)
    if id == nil then
        id = uniqId
        uniqId = uniqId + 1;
    end

    local jsonPos = '{"x":'..pos.x..',"y":'..pos.y..'}'
    ExecuteWebJS(mapUi,"createBlip('"..id.."','"..type.."',"..jsonPos..")")
    return id
end
AddFunctionExport("createBlip", createBlip)

function removeBlip(id)
    ExecuteWebJS(mapUi,"removeBlip('"..id.."')")
end
AddFunctionExport("removeBlip", removeBlip)

AddEvent("onsetMap:unfocus",function()
    SetInputMode(INPUT_GAME)
    ShowMouseCursor(false)
    SetWebVisibility(mapUi, WEB_HITINVISIBLE)
end)

AddEvent("onsetMap:focus",function()
    SetInputMode(INPUT_GAMEANDUI)
    forceUIFocus(mapUi)
    SetWebVisibility(mapUi,WEB_VISIBLE)
    ShowMouseCursor(true)
end)

AddEvent("OnKeyPress", function(key)
    if key == 'M' then
        ExecuteWebJS(mapUi,"switchMap()")
    end
end)

AddEvent("OnRenderHUD",function()
    local x,y,z = GetPlayerLocation()
    local _,heading = GetCameraRotation()
    heading = heading + 90
    if (heading < 0) then
        heading = heading + 360
    end
    ExecuteWebJS(mapUi,"changePlayerPosition("..x..","..y..","..heading..");")
end)