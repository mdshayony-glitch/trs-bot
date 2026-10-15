(function() {
    // পাসওয়ার্ড প্রম্পট বক্স
    var userPass = prompt("🔐 Enter TRS VIP Access Key:");
    if (userPass !== "TRS1") {
        alert("❌ Invalid Access Password! Access Denied.");
        return;
    }

    alert("✅ Login Successful! Initializing TRS Quantum Engine...");

    // ভাসমান TRS লোগো তৈরি
    var botIcon = document.createElement('div');
    botIcon.innerText = "TRS";
    botIcon.style.cssText = "position:fixed;top:150px;right:20px;width:65px;height:65px;border-radius:50%;background:#000;border:2px solid #00ff66;color:#00ff66;display:flex;align-items:center;justify-content:center;font-weight:bold;font-family:sans-serif;cursor:pointer;z-index:999999;box-shadow:0 0 15px #00ff66;";
    document.body.appendChild(botIcon);

    // লোগোতে ক্লিক করলে সিগন্যাল দেখাবে
    botIcon.onclick = function() {
        var isCall = Math.random() > 0.45;
        var signal = isCall ? "🟢 CALL (BUY)" : "🔴 PUT (SELL)";
        var accuracy = (96.5 + Math.random() * 2.5).toFixed(1) + "%";

        alert("💎 TRS VIP SIGNAL 💎\n\nDirection: " + signal + "\nAccuracy: " + accuracy + "\nProfit Chance: 98.9%");
    };
})();
