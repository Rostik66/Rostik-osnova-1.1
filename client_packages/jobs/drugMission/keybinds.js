mp.events.add('bindDrugs', () => {
    mp.keys.bind(0x45, true, function() {
        mp.events.callRemote('getDrugs')
    })
})

mp.events.add('unbindDrugs', () => {
    mp.keys.unbind(0x45, true)
})

mp.events.add('bindDrugsPackages', () => {
    mp.keys.bind(0x45, true, function() {
        drugObjects[0].destroy()
        colshapes[0].destroy()
        mp.events.callRemote('finish')
        mp.gui.chat.push('!{Green}Звонок: Возвращайся ко мне, получишь то, зачем пришел.')
        mp.events.callRemote('takeDrugs')
    })
})