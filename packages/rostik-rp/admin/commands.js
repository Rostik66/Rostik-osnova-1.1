// Admin 
mp.events.addCommand('hp', (player, _, id, hp) => {
    if (id == undefined || hp == undefined) return player.outputChatBox('/hp [player] [hp]');
    var player = mp.players.at(id);
    if (player == null) return player.outputChatBox("Игрок с таким id не найден");
    player.health = parseInt(hp);
})

mp.events.addCommand('armour', (player, _, id, arm,) => {
    if (id == undefined || arm == undefined) return player.outputChatBox('/armour [player] [armour]');
    var player = mp.players.at(id);
    if (player == null) return player.outputChatBox("Игрок с таким id не найден");
    player.armour = parseInt(arm);
})

mp.events.addCommand('setweather', (player, _, weather) => {
    if (weather == undefined) return player.outputChatBox('/setweather [weather]');
    mp.world.weather = weather
})

mp.events.addCommand('metp', (player, _, id) => {
    if (id = undefined) return player.outputChatBox('/metp [id]');
    let player = mp.players.at(id);
    if (player == null) return player.outputChatBox('Игрок с таким id не найден');
    player.dimension = player.dimension;
    player.position = player.position
    player.notify('~g~Вы телепортировали к себе ~y~${player.id} ID')
}); 

// Cars

mp.events.addCommand('veh', (player, _, id, veh, color1, color2) => {
    if  (id == undefined || veh == undefined ) return player.outputChatBox('/veh [id] [veh] [color1] [color2]');
    let p = mp.players.at(id);
    if (p == null) return player.outputChatBox('Игрок с таким id не найден');
    let pos = p.position
    var adminVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(pos.x +2, pos.y, pos.z));
    adminVeh.setColor(parseInt (color1), parseInt(color2));
})

mp.events.addCommand('fixcar', (player, _, id) => {
    if (id == undefined) {
        if (!player.vehicle) return player.notify('~r~Вы не в транспорте!');
        player.vehicle.repair();
    } else {
        let p = mp.players.at(id);
        if (p == null) return player.notify('~r~ID игрока не найден!');
        p.vehicle.repair();
    }
})

 mp.events.addCommand('goveh', (player, _, id) => {
    var veh_id = mp.vehicles.at(id)
    if (id == undefined ) return player.outputChatBox('/goveh [id]');
    if (veh_id == undefined ) return player.outputChatBox(`Транспортного средства с id: ${id} нету`);
    player.position = new mp.Vector3(veh_id.position.x + 2, veh_id.position.y, veh_id.position.z)
    player.outputChatBox(`Вы телепортировались к транспортному средству с ${id} ID`)
})

// For Developers

const fs = require("fs");
const saveFile = "saved.txt";
mp.events.addCommand("save", (player, name = "") => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Координаты: {"x":${pos.x}, "y":${pos.y}, "z":${pos.z}} | ${(player.vehicle) ? `Поворот: {"x":${rot.x}, "y":${rot.y}, "z":${rot.z}}` : `Поворот: ${rot}`} | ${(player.vehicle) ? "В машине" : "Не в машине"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~Координаты не сохранены. ~w~${err.message}`);
        } else {
            player.notify(`~g~Координаты сохранены в файл. ~w~(${name})`);
        }
    });
});