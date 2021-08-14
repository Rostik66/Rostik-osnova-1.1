mp.events.addCommand('sethealth', (player, health) => {
    if(!health || isNaN(health)) return player.outputChatBox('SYNTAX: /sethealth [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET health = ? WHERE username = ?', [health, player.name], function(err, res){
        if(!err){
            player.health = parseInt(health);
            player.outputChatBox("Обновлено Состояние Здоровья");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('setarmour', (player, armour) => {
    if(!armour || isNaN(armour)) return player.outputChatBox('SYNTAX: /setarmour [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET armour = ? WHERE username = ?', [armour, player.name], function(err, res){
        if(!err){
            player.armour = parseInt(armour);
            player.outputChatBox("Обновлена Броня");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('veh', (player, vehname) => {
    var pos = player.position;
    pos.x += 2.0;
    player.veh = mp.vehicles.new(vehname, pos);
    player.veh.dimension = player.dimension;
 });

 mp.events.addCommand('goveh', (player, _, id) => {
    var veh_id = mp.vehicles.at(id)
    if (id == undefined ) return player.outputChatBox('/goveh [id]');
    if (veh_id == undefined ) return player.outputChatBox(`Транспортного средства с id: ${id} нету`);
    player.position = new mp.Vector3(veh_id.position.x + 2, veh_id.position.y, veh_id.position.z)
    player.outputChatBox(`Вы телепортировались к транспортному средству с ${id} ID`)
})

mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Money: ${player.data.money} X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});

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