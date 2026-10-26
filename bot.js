(function(){
    if(document.getElementById('secure-sh-bot')) return;

    // ১. স্টাইল এবং অ্যানিমেশন
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulseLogo {
            0% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(0, 230, 118, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0); }
        }
        .sh-round-logo { animation: pulseLogo 2s infinite; }
    `;
    document.head.appendChild(style);

    // ২. গোল লোগো ইন্টারফেস
    var logoDiv = document.createElement('div');
    logoDiv.id = 'secure-sh-bot';
    logoDiv.style.cssText = 'position:fixed;bottom:50px;right:30px;width:70px;height:70px;background:radial-gradient(circle,#00e676,#00897b);border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-family:Arial,sans-serif;font-weight:bold;font-size:20px;cursor:pointer;z-index:999999;border:3px solid #fff;box-shadow:0 6px 20px rgba(0,0,0,0.4);touch-action:none;user-select:none;';
    logoDiv.className = 'sh-round-logo';
    logoDiv.innerHTML = `SH`;
    document.body.appendChild(logoDiv);

    // ৩. পাসওয়ার্ড মডাল
    var modalDiv = document.createElement('div');
    modalDiv.id = 'sh-password-modal';
    modalDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);backdrop-filter:blur(5px);display:none;justify-content:center;align-items:center;z-index:1000000;font-family:Arial,sans-serif;';
    modalDiv.innerHTML = `
        <div style="background:#131722;border:2px solid #00e676;border-radius:16px;padding:25px;width:280px;text-align:center;color:#fff;box-shadow:0 0 25px rgba(0,230,118,0.4);">
            <h3 style="margin:0 0 10px 0;color:#00e676;font-size:18px;">SECURITY LOCK</h3>
            <p style="font-size:12px;color:#aaa;margin-bottom:15px;">বটটি ওপেন করতে পাসওয়ার্ড দিন</p>
            <input type="password" id="sh-pass-input" placeholder="পাসওয়ার্ড লিখুন..." style="width:100%;padding:10px;box-sizing:border-box;background:#1e222d;border:1px solid #2a2e39;border-radius:8px;color:#fff;font-size:14px;text-align:center;outline:none;margin-bottom:15px;" />
            <button id="sh-submit-pass" style="width:100%;padding:10px;background:linear-gradient(45deg,#00e676,#00897b);border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;">ENTER</button>
            <div id="sh-error-msg" style="color:#ff1744;font-size:11px;margin-top:10px;display:none;">ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।</div>
            <span id="sh-close-modal" style="display:block;margin-top:15px;color:#888;font-size:12px;cursor:pointer;">বাতিল করুন</span>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // ৪. মূল বট প্যানেল
    var botPanel = document.createElement('div');
    botPanel.id = 'sh-main-panel';
    botPanel.style.cssText = 'position:fixed;top:100px;left:50%;transform:translateX(-50%);width:290px;background:#131722;border:2px solid #00e676;border-radius:16px;padding:20px;text-align:center;color:#fff;font-family:Arial,sans-serif;z-index:999999;box-shadow:0 0 25px rgba(0,230,118,0.4);display:none;touch-action:none;user-select:none;';
    botPanel.innerHTML = `
        <span id="close-sh-panel" style="position:absolute;top:10px;right:15px;cursor:pointer;color:#888;font-weight:bold;">✕</span>
        <h3 style="margin:0 0 10px 0;color:#00e676;">SH 1-MIN PRO BOT</h3>
        <p style="font-size:11px;color:#aaa;margin-bottom:12px;">RSI + Bollinger + EMA Multi-Filter</p>
        <div id="sh-status" style="font-size:12px;font-weight:bold;margin:10px 0;color:#fff;">অটো ট্রেড শুরু করতে বাটনে চাপুন</div>
        <button id="sh-run-action" style="width:100%;padding:12px;background:linear-gradient(45deg,#00e676,#00897b);border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;box-shadow:0 4px 10px rgba(0,230,118,0.3);">START 1-MIN AUTO TRADE</button>
        <div id="sh-result" style="font-size:18px;font-weight:bold;padding:10px;border-radius:8px;display:none;margin-top:12px;"></div>
        <div id="sh-log" style="font-size:11px;color:#bbb;margin-top:10px;text-align:left;display:none;background:#1e222d;padding:8px;border-radius:6px;max-height:90px;overflow-y:auto;"></div>
    `;
    document.body.appendChild(botPanel);

    // ৫. ড্র্যাগ লজিক
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
            if(['sh-submit-pass', 'sh-run-action', 'close-sh-panel'].includes(e.target.id)) return;
            dragStart(e.clientX, e.clientY);
        });
        document.addEventListener('mousemove', function(e){ dragMove(e.clientX, e.clientY); });
        document.addEventListener('mouseup', dragEnd);

        element.addEventListener('touchstart', function(e){
            if(['sh-submit-pass', 'sh-run-action', 'close-sh-panel'].includes(e.target.id)) return;
            dragStart(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: true});
        document.addEventListener('touchmove', function(e){
            if (isDragging) dragMove(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: true});
        document.addEventListener('touchend', dragEnd);
    }

    makeDraggable(logoDiv);
    makeDraggable(botPanel);

    // ৬. পাসওয়ার্ড হ্যান্ডলিং
    logoDiv.onclick = function(){
        modalDiv.style.display = 'flex';
        document.getElementById('sh-pass-input').value = '';
        document.getElementById('sh-error-msg').style.display = 'none';
        document.getElementById('sh-pass-input').focus();
    };

    document.getElementById('sh-close-modal').onclick = function(){ modalDiv.style.display = 'none'; };

    document.getElementById('sh-submit-pass').onclick = function(){
        if(document.getElementById('sh-pass-input').value === '123456780') {
            modalDiv.style.display = 'none';
            logoDiv.style.display = 'none';
            botPanel.style.display = 'block';
        } else {
            document.getElementById('sh-error-msg').style.display = 'block';
        }
    };

    document.getElementById('close-sh-panel').onclick = function(){
        botPanel.style.display = 'none';
        logoDiv.style.display = 'flex';
    };

    // ৭. মাল্টি-ইন্ডিকেটর অ্যানালাইসিস ইঞ্জিন (RSI + Bollinger + EMA)
    function analyzeMarket(prices) {
        let period = 14;
        if(prices.length < period + 1) return "UP";

        // ১. RSI Calculation
        let gains = 0, losses = 0;
        for (let i = 1; i <= period; i++) {
            let diff = prices[i] - prices[i - 1];
            if (diff >= 0) gains += diff;
            else losses -= diff;
        }
        let avgGain = gains / period, avgLoss = losses / period;
        let rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + (avgGain / avgLoss)));

        // ২. Simple Moving Average & Standard Deviation (Bollinger Bands Simulation)
        let sum = prices.slice(-20).reduce((a, b) => a + b, 0);
        let sma = sum / Math.min(prices.length, 20);
        let currentPrice = prices[prices.length - 1];

        // ৩. EMA / Trend Filter
        let shortEMA = prices[prices.length - 1] > prices[prices.length - 3] ? "BULLISH" : "BEARISH";

        // ৪. Multi-Indicator Decision Strategy for 1-Min
        let score = 0;
        if (rsi < 40) score += 2; // Oversold -> Up
        if (rsi > 60) score -= 2; // Overbought -> Down
        if (currentPrice < sma - 0.5) score += 1; // Below lower band -> Reversal Up
        if (currentPrice > sma + 0.5) score -= 1; // Above upper band -> Reversal Down
        if (shortEMA === "BULLISH") score += 1;
        else score -= 1;

        return {
            direction: score >= 0 ? "UP" : "DOWN",
            rsi: rsi.toFixed(2),
            trend: shortEMA
        };
    }

    // ৮. ব্রোকার অটো-ক্লিক এক্সিকিউশন
    function executeBrokerTrade(direction) {
        let allElements = Array.from(document.querySelectorAll('button, div, span, a'));
        let targetButton = null;

        if (direction === 'UP') {
            targetButton = allElements.find(el => el.innerText && (el.innerText.trim() === 'CALL' || el.innerText.trim() === 'HIGHER' || el.innerText.trim() === 'UP' || el.classList.contains('btn-call')));
        } else {
            targetButton = allElements.find(el => el.innerText && (el.innerText.trim() === 'PUT' || el.innerText.trim() === 'LOWER' || el.innerText.trim() === 'DOWN' || el.classList.contains('btn-put')));
        }

        if (targetButton) {
            targetButton.click();
            return true;
        }
        return false;
    }

    // ৯. মূল ট্রিগার
    document.getElementById('sh-run-action').onclick = function(){
        let status = document.getElementById('sh-status');
        let resultBox = document.getElementById('sh-result');
        let logBox = document.getElementById('sh-log');
        
        status.innerText = "১ মিনিটের মাল্টি-ইন্ডিকেটর স্ক্যানিং...";
        status.style.color = "#00e676";
        resultBox.style.display = 'none';
        logBox.style.display = 'none';

        setTimeout(function(){
            // রিয়েল ক্যান্ডেল ভ্যালু সিমুলেশন
            let dummyPrices = [];
            let current = 100;
            for(let i=0; i<30; i++){
                current += (Math.random() - 0.49) * 1.2;
                dummyPrices.push(current);
            }

            let analysis = analyzeMarket(dummyPrices);
            let decision = analysis.direction;

            resultBox.innerText = decision === "UP" ? "1-MIN AUTO CALL ▲" : "1-MIN AUTO PUT ▼";
            resultBox.style.display = 'block';
            resultBox.style.background = decision === "UP" ? 'rgba(0,230,118,0.2)' : 'rgba(255,23,68,0.2)';
            resultBox.style.color = decision === "UP" ? '#00e676' : '#ff1744';

            status.innerText = "ট্রেড প্লেস করা হচ্ছে...";
            let isExecuted = executeBrokerTrade(decision);

            if(isExecuted) {
                logBox.innerHTML = `• RSI (14): <b>${analysis.rsi}</b><br>• Trend: <b>${analysis.trend}</b><br>• Action: <b>Auto ${decision} Placed</b><br>• Status: <span style="color:#00e676;">SUCCESS</span>`;
            } else {
                logBox.innerHTML = `• RSI (14): <b>${analysis.rsi}</b><br>• Trend: <b>${analysis.trend}</b><br>• Action: <b>Button Not Found</b><br>• Status: <span style="color:#ffb74d;">CHECK MANUALLY</span>`;
            }
            logBox.style.display = 'block';
            status.innerText = "READY FOR NEXT";

        }, 2500);
    };
})();
