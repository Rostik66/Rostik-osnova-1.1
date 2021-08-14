mp.events.add("playerChat", (player, text) =>
{
	mp.players.broadcast(`${player.name}: ${text}`);
});

mp.events.add("console", (player, text) => {
	console.log(text);
});