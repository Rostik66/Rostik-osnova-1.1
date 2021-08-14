let player = mp.players.local
var drugObjects = []
var colshapes = []

mp.events.add('startMission', () => {
    let coords = [
        [208.4447479248047, -1760.49365234375, 28.3],
    ]
    
    for (let i = 0; i < coords.length; i++) {
        drugObjects.push(mp.objects.new('ex_office_swag_drugbags', new mp.Vector3(coords[i][0],coords[i][1],coords[i][2]),
            {
                dimension: 0
            }))
        
        
        colshapes.push(colshape = mp.colshapes.newSphere(coords[i][0],coords[i][1],coords[i][2], 2, 0))
        colshape.drug = true
    }
})

mp.events.add('playerEnterColshape', (colshape) => {
    if (colshape.drug) {
        mp.events.call('showDrugsTextBrowser')
        mp.events.call('bindDrugsPackages')
    }
})

mp.events.add('playerExitColshape', (colshape) => {
    if (colshape.drug) {
        mp.events.call('hideDrugsTextBrowser')
        mp.events.call('unbindDrugs')
    }
})

mp.events.add('drugsEffect', () => {
    mp.gui.chat.push('Вы получили и закурили косяк.')
    mp.gui.chat.push('!{Green}ПрИяТнОгО пУтИ!')
    mp.events.callRemote('playerDruged')
    mp.game.graphics.startScreenEffect('DrugsDrivingIn', 0, true)
    setTimeout(() => {
        mp.game.graphics.stopScreenEffect('DrugsDrivingIn')
        mp.game.graphics.startScreenEffect('DrugsDrivingOut', 0, false)
    }, 15000)
})

mp.events.add('spawnPed', () => {
    let drugPed = mp.peds.new(
        mp.game.joaat('g_m_y_armgoon_02'), 
        new mp.Vector3(173.395, -1726.211, 29.380),
        -200.0,
        mp.players.local.dimension
    )
})