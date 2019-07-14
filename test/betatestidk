//Nothing to see here you all seeen before

class Client {
    constructor() {
        this.botServerIP = 'ws://127.0.0.1:8081';
        this.encSocketIo = 'ws://127.0.0.1:1337';
        this.botServerStatus = '';
        this.agarServer = '';
        this.gotKey = false;
        this.server = null;
        this.botNick = '';
        this.UUID = '';
        this.botAmount = 1;
        this.moveInterval = null;

        this.mOX = 0;
        this.mOY = 0;
        this.zoomValue = 0;
        this.cellX = 0;
        this.cellY = 0;

        this.ws = null;
        this.reconnect = true;
        this.connect();
        this.addListener();
    }

  connect() {
        this.socketws = new io(this.encSocketIo);
        this.ws = new WebSocket(this.botServerIP);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onerror = this.onerror.bind(this);
    }

    onopen() {
        console.log('Connection to bot server open');
        $('#serverStatus').text('Connected');
        this.sendUUID();
        this.startMoveInterval();
    }

    onmessage(msg) {
        let buf = new DataView(msg.data);
        let offset = 0;
        let opcode = buf.getUint8(offset++);
        if ($("#reconnectButton").prop('disabled', false)) {
            $("#reconnectButton").prop('disabled', true);
        }
        switch (opcode) {
            case 0:
                {
                    let addClasses = '';
                    let removeClasses = '';
                    switch (buf.getUint8(offset++)) {
                        case 0:
                            this.botServerStatus = 'Max сonnections';
                            this.reconnect = false;
                            break;
                        case 1:
                            this.botServerStatus = 'Invalid Data';
                            this.reconnect = false;
                            break;
                        case 2:
                            this.botServerStatus = 'IP limit';
                            this.reconnect = false;
                            break;
                        case 3:
                            this.botServerStatus = 'auth...';
                            break;
                        case 4:
                            this.botServerStatus = 'Ready';
                            $('#toggleButton').replaceWith(`<button id='toggleButton' onclick='window.client.startBots();' class='btn btn-success'>Start Bots</button>`);
                            $("#botCounter").html("0/0");
                            window.bots = [];
                            break;
                        case 5:
                            this.botServerStatus = 'UUID not auth';
                            this.reconnect = false;
                            break;
                        case 6:
                            this.botServerStatus = 'Getting proxies';
                            break;
                        case 7:
                            this.botServerStatus = 'Bots started!';
                            break;
                        case 8:
                            this.botServerStatus = 'Auth error!';
                            this.reconnect = false;
                            break;
                        case 9:
                            this.botServerStatus = 'Invalid server';
                            break;
                        case 10:
                            this.botServerStatus = 'Not party server.';
                            $('#toggleButton').replaceWith(`<button id='toggleButton' onclick='window.client.startBots();' class='btn btn-success'>Start Bots</button>`);
                            break;
                        case 11:
                            this.botServerStatus = 'Coins are over!';
                            this.reconnect = false;
                            break;
                        case 12:
                            this.botServerStatus = 'Server in maintenance...';
                            this.reconnect = false;
                            break;
                        case 13:
                            this.totalUsers = buf.getUint8(offset++, true);
                            $("#userStatus").css("display", "block");
                            $("#usersCounter").text(this.totalUsers);
                            break;
                    }
                    $("#serverStatus").text(this.botServerStatus);
                }
                break;
            case 1:
                {
                    let spawnedBots = buf.getUint16(offset, true);
                    offset += 2;
                    let connectedBots = buf.getUint16(offset, true);
                    offset += 2;
                    let maxBots = buf.getUint16(offset, true);
                    offset += 2;
                    let coins = buf.getFloat64(offset, true);
                    offset += 2;
                    if (connectedBots >= maxBots) {
                        $("#botCounter").html(maxBots + "/" + maxBots);
                    } else {
                        $("#botCounter").html(connectedBots + "/" + maxBots);
                    }
                    $('#coinsCounter').html(`${coins}`);
                }
                break;
            case 2:
                {
                    window.bots = [];
                    let numBots = buf.getUint16(offset, true);
                    offset += 2;
                    for (let i = 0; i < numBots; i++) {
                        let xPos = buf.getInt32(offset, true);
                        offset += 4;
                        let yPos = buf.getInt32(offset, true);
                        offset += 4;
                    }
                }
                break;
        }
    }

    onclose() {
        console.log('Connection to bot server closed.');
        $("#reconnectButton").prop('disabled', false);
        if (this.reconnect) setTimeout(this.connect.bind(this), 150);
        if (this.moveInterval) clearInterval(this.moveInterval);
        if (!this.reconnect) return;
        $('#serverStatus').text('Connecting...');
    }

    onerror() {}

    sendUUID() {
        let buf = this.createBuffer(2 + this.UUID.length);
        buf.setUint8(0, 0);
        for (let i = 0; i < this.UUID.length; i++) buf.setUint8(1 + i, this.UUID.charCodeAt(i));
        this.send(buf);
    }

    startMoveInterval() {
        this.moveInterval = setInterval(() => {
            this.sendPos();
        }, 30);
    }

        sendkey() {
        $('.partymode-info').remove();
        this.GautKey = window._Client.encKey;
        this.socketws.emit("encryptedkey_", { EncCkey: this.GautKey });
            setTimeout(function(){
        window.client.startBots();
            }, 1000);
    }


    startBots() {

    let buf = this.createBuffer(6 + window._Client.server.length + 2 * this.botNick.length);
        let offset = 0;

        buf.setUint8(offset++, 2);
        for (let i = 0; i < window._Client.server.length; i++) buf.setUint8(offset++, window._Client.server.charCodeAt(i));
        buf.setUint8(offset++, 0);
        for (let i = 0; i < this.botNick.length; i++) {
            buf.setUint16(offset, this.botNick.charCodeAt(i), true);
            offset += 2;
        }
        buf.setUint16(offset, 0, true);
        offset += 2;
        buf.setUint16(offset, this.botAmount, true);
        this.send(buf);

    }

    addListener() {
                window.addEventListener("mousemove", event => {
            window.clientXXX = event.clientX;
            window.clientYYY = event.clientY;
        });
            }
                sendPos() {
                    let buf = this.createBuffer(9);
                    buf.setUint8(0, 4);
                    buf.setInt32(1, ((window.clientXXX - window.innerWidth / 2) / window._Client.zoomValue) + window._Client.cellX, true);
                    buf.setInt32(5,((window.clientYYY - window.innerHeight / 2) / window._Client.zoomValue) + window._Client.cellY, true);
                    this.send(buf);
                }

    split() {
        this.send(new Uint8Array([5]));
    }

    eject() {
        this.send(new Uint8Array([6]));

    }

    sendNickUpdate() {
        let buf = this.createBuffer(3 + 2 * this.botNick.length);
        let offset = 0;
        buf.setUint8(offset++, 7);
        for (let i = 0; i < this.botNick.length; i++) {
            buf.setUint16(offset, this.botNick.charCodeAt(i), true);
            offset += 2;
        }
        this.send(buf);
    }

    stopBots() {
        this.send(new Uint8Array([3]));
    }

    send(data) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.ws.send(data, {
            binary: true
        });
    }

    createUUID() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 3; i++) {
            for (let a = 0; a < 7; a++) token += possible.charAt(Math.floor(Math.random() * possible.length));
            token += '-';
        }
        token = token.substring(0, token.length - 1);
        localStorage.setItem('agarUnlimited2UUID', token);
        return token;
    }

    createBuffer(len) {
        return new DataView(new ArrayBuffer(len));
    }
    sUUID(a) {
        if (a) {
            $("#UUID").text(localStorage.getItem('agarUnlimited2UUID'));
        } else if (!a) {
            $("#UUID").text("hover for show");
        }
    }
}


class GUITweaker {
    constructor() {
        this.addGUI();
        this.finishInit();
        let check = setInterval(() => {
            if (document.readyState == "complete") {
                clearInterval(check);
                setTimeout(() => {
                    window.client.botMode = localStorage.getItem('botMode');
                    let UUID = localStorage.getItem('agarUnlimited2UUID');
                    $('#agarUnlimitedToken').val(UUID);
                }, 1500);
            }
        }, 100);
    }


    addGUI() {
                $("body").after("<div style='box-shadow: 0px 0px 5px black;z-index:9999999; background-color: #000000; -moz-opacity: 0.4; -khtml-opacity: 0.4; opacity: 0.7; zoom: 0; width: 205px; top: 2px; left: 2px; display: block; position: absolute; text-align: center; font-size: 15px; color: #ffffff; font-family: Ubuntu;border: 0px solid #0c31d4;'> <div style='color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1;font-size: 22px; filter:alpha(opacity=100); padding: 10px;'><br><a href='#'>Arcade | Client</a><br></div> <div style=' color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br>Minions: <a id='botCounter'>0/0</a> </div><br><br>Status: <a id='serverStatus'>Offline</a><br><br>Coin: <a id='coinsCounter'>0</a><br><br><br></div>");

    }

    finishInit() {
        window.client.botMode = localStorage.getItem('botMode');
        window.client.botAmount = localStorage.getItem('botAmount') >>> 0;
        window.client.botNick = localStorage.getItem('botNick');
        let UUID = localStorage.getItem('agarUnlimited2UUID');
        $('#agarUnlimitedToken').val(UUID);
    }
}

class Macro {
    constructor() {
        this.ejectDown = false;
        this.stopped = false;
        this.speed = 15;
        this.addKeyHooks();
    }



    addKeyHooks() {
        this.onkeydown();
    }

    onkeydown() {
        document.addEventListener('keydown', function(event) {
            console.log(event.keyCode, event.which);
            switch (event.keyCode || event.which) {
                case 87:
                    window.core.eject();
                    break;
                case 88:
                    client.split();
                    break;
                case 67:
                    client.eject();
                    break;
            }

        }.bind(this));
    }
    eject() {
        if (this.ejectDown) {
            window.core.eject();
            setTimeout(this.eject.bind(this), this.speed);
        }
    }
}



setTimeout(function() {



    window.client = new Client();
    new Macro();

    if (!localStorage.getItem('agarUnlimited2UUID')) localStorage.setItem('agarUnlimited2UUID', window.client.createUUID());
    if (!localStorage.getItem('botMode')) localStorage.setItem('botMode', 'FEEDER');
    if (!localStorage.getItem('botNick')) localStorage.setItem('botNick', '');
    if (!localStorage.getItem('botAmount')) localStorage.setItem('botAmount', 500);
    if (!localStorage.getItem('extraZoom')) localStorage.setItem('extraZoom', true);
    window.client.UUID = localStorage.getItem('agarUnlimited2UUID');
    new GUITweaker();
}, 5000);


var observer = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
mutation.addedNodes.forEach(function(node) {
    if (/agario\.core\.js/i.test(node.src)) {
        observer.disconnect();
        node.parentNode.removeChild(node);
        var request = new XMLHttpRequest();
        request.open("get", node.src, true);
        request.send();
        request.onload = function() {
            var coretext = this.responseText;
            var newscript = document.createElement("script");
            newscript.type = "text/javascript";
            newscript.async = true;
            window._Client = new Client();
            newscript.textContent = replaceCore(coretext);
            document.body.appendChild(newscript);
        };
    }
});
});
});
observer.observe(document, {
attributes: true,
characterData: true,
childList: true,
subtree: true
});

const replaceCore = core => {
    core = core.replace(/([\w$]+\(\d+,\w\[\w>>2\]\|0,(\+\w),(\+\w)\)\|0;[\w$]+\(\d+,\w\[\w>>2\]\|0,\+-(\+\w\[\w\+\d+>>3\]),\+-(\+\w\[\w\+\d+>>3\])\)\|0;)/i, '$1 window.viewScale=$2; if(window.core.setFpsCap) {window.core.setFpsCap(999)};if (window.coordOffsetFixed) { window.playerX=$4+window.offsetX; window.playerY=$5+window.offsetY;} if(window.draw){window.draw();}');
    core = core.replace(/c\[h>>2\]=d;d/, `c\[h>>2\]=d;if(window._Client.gotKey == false || window._Client.gotKey == undefined || window._Client.gotKey == null){ window._Client.encKey = d; window._Client.gotKey = true; }d`);
    core = core.replace(/var (\w)=new WebSocket\((\w\(\w\))\);/, `window._Client.server=$2; window._Client.gotKey = false; window._Client.startBots = false; var $1=new WebSocket(window._Client.server);`)
    core = core.replace(/;if\((\w)<1\.0\){/i, `;if(0){`);
    core = core.replace(/(\w\[\w>>\d\]=\w\?\w:\w;)((\w).*?;)/i, `var nodesize=$1 $2`);
    //core = core.replace(/(\w\[\w>>\d\]=\w\?\w:\w;)((\w).*?;)/i, `var nodesize=$1 $2 $3=true;`);
    core = core.replace(/0;\w\[\w\+...>>3\]=(\w);\w\[\w\+...>>3\]=(\w);\w\[\w\+...>>3\]=(\w);\w\[\w\+...>>3\]=(\w);/i, `$& if(Math.abs($3-$1)>14e3 && Math.abs($4-$2)>14e3){window._Client.mOX = ($1+$3)/2; window._Client.mOY = ($2+$4)/2};`);
    core = core.replace(/\w+\(\d+,\w+\[\w+>>2\]\|0,\+\-(\+\w\[\w+\+\d+>>3\]),\+\-(\+\w+\[\w\+\d+>>3\])\)\|0;/i, `$& window._Client.cellX = $1 - window._Client.mOX; window._Client.cellY = $2 - window._Client.mOY;`);
    core = core.replace(/([\w$]+\(\d+,\w\[\w>>2\]\|0,(\+\w),(\+\w)\)\|0;[\w$]+\(\d+,\w\[\w>>2\]\|0,\+-(\+\w\[\w\+\d+>>3\]),\+-(\+\w\[\w\+\d+>>3\])\)\|0;)/i, `$1 window._Client.zoomValue=$2;`)
    core = core.replace(/\w\.MC\.onPlayerSpawn\)/i, `$& window._Client.sendkey();`);
    return core;
}

//Thanks For Being A Nosey Fucker
