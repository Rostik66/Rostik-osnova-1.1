mp.events.addCommand('pos', (player) => {
    console.log(`${player.position.x}, ${player.position.y}, ${player.position.z}`)
})

let haveDrugs = false
let drugsCd = false
var drugsBlip

mp.events.add('playerReady', (player) => {
    player.call('spawnPed')
})

mp.blips.new(630, new mp.Vector3(173.002, -1729.994, 29.291),
    {
        name: 'Vagos Gang',
        scale: 1,
        color: 60,
        dimension: 0,
    })

let drugsNpcColshape = mp.colshapes.newSphere(173.395, -1726.211, 29.380, 2, 0)

function playerEnterDrugsColshape(player, shape) {
    if (shape == drugsNpcColshape) {
        player.call('bindDrugs')
        player.call('showDrugsTextBrowser')
    }
}

function playerExitDrugsColshape(player, shape) {
    if (shape == drugsNpcColshape) {
        player.call('unbindDrugs')
        player.call('hideDrugsTextBrowser')
    }
}

function playerTookedDrugsPackage(player) {
    drugsBlip.destroy()
    player.playAnimation('anim@move_m@trash', 'pickup', 1, 49)
    setTimeout(() => {
        player.stopAnimation()
        player.call('destroyDrugObjects')
    }, 2000)
}

mp.events.add('getDrugs', (player) => {
    if (haveDrugs) {
        player.outputChatBox('Отлично! Сейчас покажу, что можно сделать...')
        setTimeout(() => {
            player.call('showCursor')
            player.call('showDrugsCraftBrowser')
        }, 3000)
    } else {
        player.outputChatBox('Смотри!')
        player.outputChatBox('Тебе нужно собрать закладку, тогда я дам тебе то, что ты хочешь. Отправил тебе координаты.')
        drugsBlip = mp.blips.new(1, new mp.Vector3(208.4447479248047, -1760.49365234375, 28.3),
            {
                name: 'Наркотики',
                scale: 1,
                color: 73,
                dimension: 0,
            })
        player.call('startMission')
    }
})

function playerTookedDrugsPackage(player) {
    drugsBlip.destroy()
    player.playAnimation('anim@move_m@trash', 'pickup', 1, 49)
    setTimeout(() => {
        player.stopAnimation()
        player.call('destroyDrugObjects')
    }, 2000)
}

function finishTask(player) {
    haveDrugs = true
    player.notify('Успех!')
}

mp.events.add('finish', finishTask)
mp.events.add('takeDrugs', playerTookedDrugsPackage)

mp.events.add('playerDruged', (player) => {
    player.armour = Math.floor(Math.random() * 50) + 1;
})

mp.events.add('playerEnterColshape', playerEnterDrugsColshape)
mp.events.add('playerExitColshape', playerExitDrugsColshape)