// Admin
require('./admin/commands.js')

// Jobs
require('./jobs/narkot/narkot.js')

// Modules
require('./modules/events.js')
require('./modules/airdrop/index.js')

// Database
global.gm = {};
gm.mysql = require('./database/mysql.js');
gm.auth = require('./database/auth.js');
gm.mysql.connect(function() { });