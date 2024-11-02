# PLS DONATE Custom TTS popup
Customisable version using the original API

**FAQ**
1. Is it allowed in PLS DONATE?

**i asked pls donate staff about it and heres what they said**
![PD STAFF MESSAGE](https://cdn.discordapp.com/attachments/1302392086548582401/1302393857790443560/7nipsPl.png?ex=6727f44d&is=6726a2cd&hm=ffc2d14226e45a668842b29a5dbaee3e760804c60cb0dea302780563095e275b&)
# How to use
Download the code in a ZIP file

Go to script.js

On line 6 set the lowest about a donation should show up for

```
const totalMinAmount = 1
// 1 is the lowest amount
```

On line 8 you got all the tiers

```
const tiers = [
    {
        name: "Tier 1", // DOSNT MATTER
        minAmount: totalMinAmount, // LOWEST AMOUNT TIER
        highlightColor: "yellow", // COLOR LIST - https://www.w3schools.com/cssref/css_colors.php
        gifUrl: "https://stream.plsdonate.com/donation.gif", // GIF
        mp3Url: "https://stream.plsdonate.com/success.wav" // SOUND
        // U can use a link or put the files in the same folder and put the names with extention
    },
    // u can make how much u want - 3 is just an example
    {
        name: "Tier 2",
        minAmount: 50,
        highlightColor: "cyan",
        gifUrl: "tier2.gif",
        mp3Url: "tier2.wav"
    },
    {
        name: "Tier 3",
        minAmount: 100,
        highlightColor: "orange",
        gifUrl: "tier3.gif",
        mp3Url: "tier3.wav"
    }
];
```

On line 33 put your userid
```
const socket = new WebSocket('wss://stream.plsdonate.com/api/user/3277386681/websocket');
// replace 3277386681 with your UserID
```
**Put the index.html file inside your obs**

# Credits
[Roblox](https://www.roblox.com/users/3277386681/profile)

[Youtube](https://www.youtube.com/@InvizDev)

Discord - invizdeveloper
