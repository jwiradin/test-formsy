// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.

var PlayerAPI = {
    players: [
        { number: 1, name: "Ben Blocker", position: "G", joinDate: "2015-01-23" },
        { number: 2, name: "Dave Defender", position: "D", joinDate: "2013-04-13" },
        { number: 3, name: "Sam Sweeper", position: "D", joinDate: "2014-11-04" },
        { number: 4, name: "Matt Midfielder", position: "M", joinDate: "2015-04-03" },
        { number: 5, name: "William Winger", position: "M", joinDate: "2015-09-24" },
        { number: 6, name: "Fillipe Forward", position: "F", joinDate: "2014-08-15" }
    ],
    all: function () { return this.players },
    get: function (id) {
        const isPlayer = p => p.number === id
        return this.players.find(isPlayer)
    },
    update: function (player) {

        let p = this.get(player.number);

        if (p) {
            p.name = player.name;
            p.position = player.position;
        }
    },
    add: function (player) {
        let p = this.get(player.number);

        if (!p) {
            p = {
                number: player.number,
                name: player.name,
                position: player.position,
                joinDate: player.joinDate
            };
            this.players.add(p);
        }
    }
}

export default PlayerAPI;