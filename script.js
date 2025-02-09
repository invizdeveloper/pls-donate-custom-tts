const donationText = document.getElementById("donationText");
const messageText = document.getElementById("messageText");
const gifElement = document.getElementById("gif");

const donationQueue = [];
let processing = false; // Flag to track if donations are being processed
const totalMinAmount = 1;

// Tier configuration
const tiers = [
    {
        name: "Tier 1",
        minAmount: totalMinAmount,
        highlightColor: "yellow",
        gifUrl: "https://stream.plsdonate.com/donation.gif",
        mp3Url: "https://stream.plsdonate.com/success.wav"
    },
    {
        name: "Tier 2",
        minAmount: 50,
        highlightColor: "cyan",
        gifUrl: "https://stream.plsdonate.com/donation.gif",
        mp3Url: "dollar.mp3"
    },
    {
        name: "Tier 3",
        minAmount: 100,
        highlightColor: "orange",
        gifUrl: "https://stream.plsdonate.com/donation.gif",
        mp3Url: "https://stream.plsdonate.com/success.wav"
    }
];

// Connect to WebSocket
const socket = new WebSocket('wss://stream.plsdonate.com/api/user/3277386681/websocket');

socket.onmessage = async (event) => {
    const donation = JSON.parse(event.data);
    donationQueue.push(donation);

    // Start processing if not already running
    if (!processing) {
        processDonations();
    }
};

async function processDonations() {
    if (processing) return; // Prevent duplicate execution
    processing = true; // Set flag

    while (donationQueue.length > 0) {
        const donation = donationQueue.shift();
        const { message, sender, amount } = donation;

        // Sanitize the message by removing all # characters
        const sanitizedMessage = (message || "").replace(/#/g, "");

        // Determine the tier for this donation
        const tier = tiers.slice().reverse().find(t => amount >= t.minAmount) || tiers[0];

        // Set text, color, GIF, and show elements based on the tier
        donationText.innerHTML = `<span style="color: ${tier.highlightColor}; font-weight: bold;">@${sender.username}</span> donated <span style="color: ${tier.highlightColor}; font-weight: bold;">${amount} R$</span> via PLS DONATE`;
        messageText.innerHTML = sanitizedMessage;
        gifElement.src = tier.gifUrl;
        donationText.style.display = "block";
        messageText.style.display = "block";
        gifElement.style.display = "block";

        // Play the tier mp3 sound and wait until it finishes
        await playAudio(tier.mp3Url);

        // Generate and play the TTS audio, then wait until it finishes
        const ttsUrl = `https://pd.inviz.tech/tts?text=${encodeURIComponent(sender.displayName)}%20donated%20${amount}%20robux%20via%20PLEASE%20DONATE.%20${encodeURIComponent(sanitizedMessage)}`;
        await playAudio(ttsUrl);

        // Hide elements after both audio files have played
        donationText.style.display = "none";
        messageText.style.display = "none";
        gifElement.style.display = "none";
    }

    processing = false; // Reset flag when done
}

// Helper function to play audio and return a promise that resolves when audio ends
function playAudio(url) {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.play();
        audio.onended = resolve; // Resolve the promise when audio ends
    });
}
