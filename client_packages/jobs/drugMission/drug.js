let player = mp.players.local
let drugsCraftBrowser = mp.browsers.new('package://ui/drugCraft/drugCraft.html')

drugsCraftBrowser.active = false

mp.events.add('showDrugCraftBrowser', () => {
    drugCraftBrowser.active = true
})

mp.events.add('hideDrugCraftBrowser', () => {
    drugCraftBrowser.active = false
})

mp.events.add('showDrugsCraftBrowser', () => {
    drugsCraftBrowser.active = true
})

mp.events.add('hideDrugsCraftBrowser', () => {
    mp.gui.cursor.show(true, true)
    drugsCraftBrowser.active = false
})