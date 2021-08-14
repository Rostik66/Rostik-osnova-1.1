// Admin
require("./admin/noclip.js");

// Player
require("./ui/auth/auth.js");
require("./ui/character/character.js");
require("./ui/charselection/charselection.js");
require("./player/modules.js");
require("./player/screeneffects.js");
require('./jobs/drugMission/keybinds.js');
global.playerheading = require("./player/rotatorplayer.js");

// Jobs
require("./jobs/drugMission/drug.js");
require('./jobs/drugMission/drugMission.js');

// Discrod
mp.discord.update('Rostik-Rp', 'Гражданин');