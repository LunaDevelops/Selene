const { Client, ActivityType } = require("discord.js");
const req = require("request");

class LunarTools
{
    /**
     * @param {Client} client 
     */
    constructor(client)
    {
        this.client = client;
        this.LastCommit = "";

        this.#RetrieveLastCommit();
    }

    // Private Void; Retrieve the last commit message via GIT API \\
    #RetrieveLastCommit() {
        req({
            url: 'https://api.github.com/repos/MioDevelops/Selene-DB/commits',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${process.env.GITAUTH}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'user-agent': 'node.js'
            }
        }, (err, res, body) => {
            if(!err && res.statusCode == 200)
                // TODO: Check last commit time
                switch(JSON.parse(body)[0].commit.message)
                {
                    case "test":
                        this.LastCommit = "Selene is currently in debugging mode, all logs will show below."; return;
                    case "NoAlert":
                        this.LastCommit = "NoAlert"; return;
                    default: this.LastCommit = JSON.parse(body)[0].commit.message; return;
                }
        });
    }

    /**
     * Sends a message to the Alerts channel of the Lunar Eclipse.
     * 
     * @param {string} message
     * 
     */
    SendDebugMessage(message)
    {
        if(!message) return;
        
        this.client.channels.cache.get("1236893338758811742").send(message)
    }

    /**
     * Activates Selene in debugging / testing mode.
     */
    EnableDebugMode()
    {
        this.client.user.setPresence({
            activities: [{
                name: "Selene is currently in debugging mode.",
                type: ActivityType.Custom,
                url: "https://github.com/LunaDevelops/Selene",
                state: "🌙"
            }],
            status: "dnd"
        })
    }
}

module.exports = { LunarTools };