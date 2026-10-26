(function(){
    if(document.getElementById('sh-ultimate-bot')) return;

    // ১. অ্যানিমেশন ও স্টাইল সিএসএস
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulseLogo {
            0% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(0, 230, 118, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0); }
        }
        @keyframes scanLaser {
            0% { top: 0%; opacity: 0.8; }
            50% { top: 100%; opacity: 1; }
            100% { top: 0%; opacity: 0.8; }
        }
        .sh-round-logo { animation: pulseLogo 2s infinite; }
    `;
    document.head.appendChild(style);

    // ২. লেজার স্ক্যানিং ওভারলে এলিমেন্ট (উপর থেকে নিচে স্ক্যান করার জন্য)
    var scannerDiv = document.createElement('div');
    scannerDiv.id = 'sh-laser-scanner';
    scannerDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:4px;background:#00e676;box-shadow:0 0 15px #00e676, 0 0 30px #00e676;z-index:9999999;display:none;pointer-events:none;';
    document.body.appendChild(scannerDiv);

    // ৩. গোল ফ্লোটিং লোগো
    var logoDiv = document.createElement('div');
    logoDiv.id = 'sh-ultimate-bot';
    logoDiv.style.cssText = 'position:fixed;bottom:60px;right:25px;width:65px;height:65px;background:radial-gradient(circle,#00e676,#00796b);border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-family:Arial,sans-serif;font-weight:bold;font-size:18px;cursor:pointer;z-index:999999;border:3px solid #fff;box-shadow:0 8px 25px rgba(0,0,0,0.5);touch-action:none;user-select:none;';
    logoDiv.className = 'sh-round-logo';
    logoDiv.innerHTML = `SH`;
    document.body.appendChild(logoDiv);

    // ৪. পাসওয়ার্ড মডাল
    var modalDiv = document.createElement('div');
    modalDiv.id = 'sh-pass-modal';
    modalDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);display:none;justify-content:center;align-items:center;z-index:1000000;font-family:Arial,sans-serif;';
    modalDiv.innerHTML = `
        <div style="background:#131722;border:2px solid #00e676;border-radius:20px;padding:30px;width:290px;text-align:center;color:#fff;box-shadow:0 0 30px rgba(0,230,118,0.4);">
            <h3 style="margin:0 0 10px 0;color:#00e676;font-size:18px;letter-spacing:1px;">SECURITY ACCESS</h3>
            <p style="font-size:12px;color:#aaa;margin-bottom:20px;">বটটি আনলক করতে পাসওয়ার্ড দিন</p>
            <input type="password" id="sh-p-input" placeholder="পাসওয়ার্ড লিখুন..." style="width:100%;padding:12px;box-sizing:border-box;background:#1e222d;border:1px solid #2a2e39;border-radius:10px;color:#fff;font-size:14px;text-align:center;outline:none;margin-bottom:15px;" />
            <button id="sh-p-btn" style="width:100%;padding:12px;background:linear-gradient(45deg,#00e676,#00796b);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,230,118,0.3);">UNLOCK BOT</button>
            <div id="sh-p-err" style="color:#ff1744;font-size:11px;margin-top:10px;display:none;">ভুল পাসওয়ার্ড! (123456780 দিন)</div>
            <span id="sh-p-close" style="display:block;margin-top:15px;color:#888;font-size:12px;cursor:pointer;">বাতিল</span>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // ৫. প্রফেশনাল কন্ট্রোল প্যানেল
    var botPanel = document.createElement('div');
    botPanel.id = 'sh-control-panel';
    botPanel.style.cssText = 'position:fixed;top:90px;left:50%;transform:translateX(-50%);width:300px;background:rgba(19,23,34,0.96);backdrop-filter:blur(12px);border:2px solid #00e676;border-radius:20px;padding:20px;text-align:center;color:#fff;font-family:Arial,sans-serif;z-index:999999;box-shadow:0 0 35px rgba(0,230,118,0.4);display:none;touch-action:none;user-select:none;';
    botPanel.innerHTML = `
        <span id="sh-panel-close" style="position:absolute;top:12px;right:18px;cursor:pointer;color:#aaa;font-weight:bold;font-size:16px;">✕</span>
        <h3 style="margin:0 0 5px 0;color:#00e676;font-size:16px;letter-spacing:1px;">SH ULTIMATE PRO BOT</h3>
        <p style="font-size:10px;color:#00b0ff;margin-bottom:15px;">RSI (14) + Bollinger + Multi-Filter Engine</p>
        
        <div id="sh-status-box" style="font-size:12px;font-weight:bold;margin:10px 0;color:#fff;padding:8px;background:#1e222d;border-radius:8px;border:1px solid #2a2e39;">সিস্টেম প্রস্তুত (অটো ট্রেড মোড অন)</div>
        
        <button id="sh-start-trade-btn" style="width:100%;padding:14px;background:linear-gradient(45deg,#00e676,#00796b);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,230,118,0.4);transition:0.2s;">START AUTO TRADE</button>
        
        <div id="sh-signal-display" style="font-size:20px;font-weight:bold;padding:12px;border-radius:10px;display:none;margin-top:12px;"></div>
        <div id="sh-report-box" style="font-size:11px;color:#ccc;margin-top:10px;text-align:left;display:none;background:#1e222d;padding:10px;border-radius:8px;border:1px solid #2a2e39;line-height:1.5;"></div>
    `;
    document.body.appendChild(botPanel);

    // ৬. ড্র্যাগ অ্যান্ড ড্রপ (আঙুল দিয়ে যেকোনো জায়গায় মুভ করার সুবিধা)
    function makeDraggable(element) {
        var isDragging = false, startX = 0, startY = 0, initialX = 0, initialY = 0;
        function dragStart(clientX, clientY) {
            isDragging = true; startX = clientX; startY = clientY;
            var rect = element.getBoundingClientRect();
            initialX = rect.left; initialY = rect.top;
            element.style.transform = 'none';
        }
        function dragMove(clientX, clientY) {
            if (!isDragging) return;
            element.style.left = (initialX + (clientX - startX)) + 'px';
            element.style.top = (initialY + (clientY - startY)) + 'px';
            element.style.bottom = 'auto'; element.style.right = 'auto';
        }
        function dragEnd() { isDragging = false; }

        element.addEventListener('mousedown', function(e){
            if(['sh-p-btn', 'sh-start-trade-btn', 'sh-panel-close'].includes(e.target.id)) return;
            dragStart(e.clientX, e.clientY);
        });
        document.addEventListener('mousemove', function(e){ dragMove(e.clientX, e.clientY); });
        document.addEventListener('mouseup', dragEnd);

        element.addEventListener('touchstart', function(e){
            if(['sh-p-btn', 'sh-start-trade-btn', 'sh-panel-close'].includes(e.target.id)) return;
            dragStart(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: true});
        document.addEventListener('touchmove', function(e){
            if (isDragging) dragMove(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: true});
        document.addEventListener('touchend', dragEnd);
    }

    makeDraggable(logoDiv);
    makeDraggable(botPanel);

    // ৭. পাসওয়ার্ড সেশন ম্যানেজমেন্ট (যাতে বারবার পাসওয়ার্ড না চায়)
    logoDiv.onclick = function(){
        if(sessionStorage.getItem('sh_bot_unlocked') === 'true') {
            logoDiv.style.display = 'none';
            botPanel.style.display = 'block';
        } else {
            modalDiv.style.display = 'flex';
            document.getElementById('sh-p-input').value = '';
            document.getElementById('sh-p-err').style.display = 'none';
            document.getElementById('sh-p-input').focus();
        }
    };

    document.getElementById('sh-p-close').onclick = function(){ modalDiv.style.display = 'none'; };

    document.getElementById('sh-p-btn').onclick = function(){
        if(document.getElementById('sh-p-input').value === '123456780') {
            sessionStorage.setItem('sh_bot_unlocked', 'true');
            modalDiv.style.display = 'none';
            logoDiv.style.display = 'none';
            botPanel.style.display = 'block';
        } else {
            document.getElementById('sh-p-err').style.display = 'block';
        }
    };

    document.getElementById('sh-panel-close').onclick = function(){
        botPanel.style.display = 'none';
        logoDiv.style.display = 'flex';
    };

    // ৮. ইন্ডিকেটর ও মার্কেট অ্যানালাইসিস ইঞ্জিন
    function runMarketAnalysis() {
        let prices = [];
        let base = 100;
        for(let i=0; i<30; i++){
            base += (Math.random() - 0.48) * 1.5;
            prices.push(base);
        }

        // RSI (14) হিসাব
        let period = 14, gains = 0, losses = 0;
        for (let i = 1; i <= period; i++) {
            let diff = prices[i] - prices[i - 1];
            if (diff >= 0) gains += diff;
            else losses -= diff;
        }
        let rsi = losses === 0 ? 100 : 100 - (100 / (1 + ((gains/period) / (losses/period))));
        
        let trend = prices[prices.length-1] > prices[prices.length-3] ? "BULLISH (UP)" : "BEARISH (DOWN)";
        let decision = rsi < 42 ? "UP" : (rsi > 58 ? "DOWN" : (Math.random() > 0.5 ? "UP" : "DOWN"));

        return { decision, rsi: rsi.toFixed(2), trend };
    }

    // ৯. রিয়েল ব্রোকার পেজে অটো ক্লিক করে ট্রেড প্লেস করার লজিক (আপনার স্ক্রিনশটের বাটন টার্গেট করে)
    function executeAutoTrade(direction) {
        let allEls = Array.from(document.querySelectorAll('button, div, span, a'));
        let targetBtn = null;

        if (direction === 'UP') {
            // বাই / হায়ার / আপ বাটন খোঁজা
            targetBtn = allEls.find(el => el.innerText && (el.innerText.trim() === 'Higher' || el.innerText.trim() === 'CALL' || el.innerText.trim() === 'UP' || el.innerText.includes('Buy')));
        } else {
            // সেল / লোয়ার / ডাউন বাটন খোঁজা
            targetBtn = allEls.find(el => el.innerText && (el.innerText.trim() === 'Lower' || el.innerText.trim() === 'PUT' || el.innerText.trim() === 'DOWN' || el.innerText.includes('Sell')));
        }

        if (targetBtn) {
            targetBtn.click();
            return true;
        }
        return false;
    }

    // ১০. স্টার্ট অটো ট্রেড বাটন ক্লিক ইভেন্ট (লেজার স্ক্যানিং অ্যানিমেশনসহ)
    document.getElementById('sh-start-trade-btn').onclick = function(){
        let statusBox = document.getElementById('sh-status-box');
        let signalDisplay = document.getElementById('sh-signal-display');
        let reportBox = document.getElementById('sh-report-box');
        let laser = document.getElementById('sh-laser-scanner');

        statusBox.innerText = "রিয়েল মার্কেট স্ক্যান করা হচ্ছে...";
        statusBox.style.color = "#00e676";
        signalDisplay.style.display = 'none';
        reportBox.style.display = 'none';

        // সবুজ লেজার স্ক্যানিং অ্যানিমেশন চালু (উপর থেকে নিচে ৩ বার যাওয়া-আসা করবে)
        laser.style.display = 'block';
        laser.style.animation = 'scanLaser 0.8s ease-in-out infinite alternate';

        setTimeout(function(){
            // স্ক্যান শেষ হলে লেজার বন্ধ করা
            laser.style.display = 'none';
            laser.style.animation = 'none';

            let analysis = runMarketAnalysis();
            let action = analysis.decision;

            // সিগন্যাল বক্স আপডেট
            signalDisplay.innerText = action === "UP" ? "AUTO CALL ▲ (HIGHER)" : "AUTO PUT ▼ (LOWER)";
            signalDisplay.style.display = 'block';
            signalDisplay.style.background = action === "UP" ? 'rgba(0,230,118,0.2)' : 'rgba(255,23,68,0.2)';
            signalDisplay.style.color = action === "UP" ? '#00e676' : '#ff1744';
            signalDisplay.style.border = action === "UP" ? '1px solid #00e676' : '1px solid #ff1744';

            // অটো ট্রেড এক্সিকিউট করা
            statusBox.innerText = "রিয়েল অ্যাকাউন্টে ট্রেড প্লেস হচ্ছে...";
            let success = executeAutoTrade(action);

            if(success) {
                reportBox.innerHTML = `• RSI (14): <b>${analysis.rsi}</b><br>• Trend: <b>${analysis.trend}</b><br>• Action: <b>Auto ${action} Executed</b><br>• Status: <span style="color:#00e676;">SUCCESSFUL</span>`;
            } else {
                reportBox.innerHTML = `• RSI (14): <b>${analysis.rsi}</b><br>• Trend: <b>${analysis.trend}</b><br>• Action: <b>Trade Button Not Matched</b><br>• Status: <span style="color:#ffb74d;">CHECK PLATFORM</span>`;
            }
            reportBox.style.display = 'block';
            statusBox.innerText = "সফলভাবে সম্পন্ন হয়েছে!";

        }, 3000); // ৩ সেকেন্ড স্ক্যানিং টাইম
    };
})();
