var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
module.exports =
{
    handle: null,

    connect: function(call){
        this.handle = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'rostik'
        });
        this.handle.getConnection(function (err){
            if(err){
                switch(err.code){
                    case "ECONNREFUSED": console.log("\x1b[93m[MySQL] \x1b[97mОшибка: Проверьте данные вашего подключения (packages/database/mysql.js) или убедитесь, что ваш сервер MySQL запущен. \x1b[39m"); break;
                    case "ER_BAD_DB_ERROR": console.log("\x1b[91m[MySQL] \x1b[97mОшибка: Введенное вами имя базы данных не существует. \x1b[39m"); break;
                    case "ER_ACCESS_DENIED_ERROR": console.log("\x1b[91m[MySQL] \x1b[97mОшибка:Проверьте свое имя пользователя и пароль MySQL и убедитесь, что они верны. \x1b[39m"); break;
                    case "ENOENT": console.log("\x1b[91m[MySQL] \x1b[97mОшибка: Нет подключения к Интернету. Проверьте подключение и повторите попытку. \x1b[39m"); break;
                    default: console.log("\x1b[91m[MySQL] \x1b[97mОшибка: " + err.code + " \x1b[39m"); break;
                }
            }else{ console.log("\x1b[92m[Database] \x1b[97mУспешно Подключено \x1b[39m")}
        });
    }
};

mp.events.add("sendDataToServer", (player, username, pass, state) => {
    let loggedAccount = mp.players.toArray().find(p => p.loggedInAs == username);
    switch(state){
        case 0:{ // auth
            if(loggedAccount){
                console.log("Уже вошел в систему.");
                player.call("loginHandler", ["logged"]);
            }else{
                gm.mysql.handle.query('SELECT `password`,`id` FROM `accounts` WHERE `username` = ?', [username], function(err, res){
                    if(res.length > 0){
                        let sqlPassword = res[0]["password"];
                        bcrypt.compare(pass, sqlPassword, function(err, res2) {
                            if(res2 === true){
                                player.name = username;
                                player.data.login = username;
                                player.data.id = res[0]["id"];
                                player.loggedInAs = res[0]["username"];
                                player.call("loginHandler", ["success"]);
                                gm.auth.loadAccount(player);
                            }else{player.call("loginHandler", ["incorrectinfo"]);}
                        });
                    }else{player.call("loginHandler", ["incorrectinfo"])}
                });
            }
            break;
        }
        case 1:{ // register
            if(username.length >= 3 && pass.length >= 5){
                gm.mysql.handle.query('SELECT * FROM `accounts` WHERE `username` = ?', [username], function(err, res){
                    if(res.length > 0){player.call("loginHandler", ["takeninfo"])}
                    else{
                        bcrypt.hash(pass, null, null, function(err, hash) {
                            if(!err){
                                gm.mysql.handle.query('INSERT INTO `accounts` SET username = ?, email = ?, password = ?, socialclub = ?, ip = ?', [username, 0, hash, player.rgscId, player.ip], function(err, res){
                                    if(!err){
                                        player.name = username;
                                        player.data.login = username;
                                        player.data.id = res.insertId;
                                        player.call("loginHandler", ["registered"]);
                                        gm.auth.registerAccount(player);
                                        console.log("\x1b[92m" + username + "\x1b[39m только что зарегистрировался.");
                                    }else{console.log("\x1b[31m[ERROR] " + err)}
                                });
                            }else{console.log("\x1b[31m[BCrypt]: " + err)}
                        });
                    }
                });
            }else{player.call("loginHandler", ["tooshort"])}            
            break;
        }
        default:{
            player.outputChatBox("Произошла ошибка, пожалуйста, свяжитесь с администратором вашего сервера.")
            console.log("\x1b[31m[Ошибка] Состояние входа/регистрации не определено. Государство: " + state)
            break;
        }
    }
});


mp.events.add("create:charselector", (player, firstName,lastName) => {
    gm.mysql.handle.query('SELECT * FROM characters WHERE firstname=? AND lastname=?', [firstName,lastName], function(err, chars){
        if(!chars.length > 0 && !err){
            var xyz = "{'x':15,'y':15,'z':71,'r':0.0}";
            gm.mysql.handle.query('INSERT INTO `characters` SET socialclub=?,adminlvl=?,xyz=?,firstname=?,lastname=?,health=?,licenses=?,bank_num=?,organization=?,accid=?', [player.rgscId,0,xyz,firstName,lastName,100,0,0,0,player.data.id], function(err, res){
                if(!err)
                {
                    player.data.charid = res.insertId;
                    player.call("create:charselector:save", []);
                    player.position = new mp.Vector3(402.8664, -996.4108, -99.00027); // создание характера
                    player.heading = -185.0; // создание характера
                    player.call("CreatorCamera", []); // создание характера
                }
                else console.log("\x1b[31m[Создать Символ]: " + err)
            });
        }else{
            console.log("\x1b[31m[кодировщик]: " + err)
        }
    });
});

mp.events.add("SaveCharacter", (player, currentGender, father, mother, similarity, skin, features, appearance_values, hair_or_colors) => {
    gm.auth.saveCharenterAccount(player, currentGender, father, mother, similarity, skin, features, appearance_values, hair_or_colors);
});
mp.events.add("player:enter:server", (player, id) =>{
    gm.auth.charenterAccount(player, id);
});
mp.events.add("set:spawn:pos:pl", (player, pos) =>{
    gm.auth.spawnAccount(player, pos);
});

mp.events.add("playerQuit", (player) => {
    if(player.loggedInAs != ""){
        gm.auth.saveAccount(player);
    }
});

mp.events.add("playerJoin", (player) => {
    console.log(`${player.name} has joined.`);
    player.loggedInAs = "";
    player.call("player:join", []);
});