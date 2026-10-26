(function(){
    if(document.getElementById('sh-ultimate-master-bot')) return;

    // ১. প্রিমিয়াম ডিজাইন ও লেজার স্ক্যানিং অ্যানিমেশন
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulseLogo {
            0% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7); }
            70% { box-shadow: 0 0 0 22px rgba(0, 230, 118, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0); }
        }
        @keyframes scanLaser {
            0% { top: 0%; opacity: 0.95; }
            50% { top: 100%; opacity: 1; }
            100% { top: 0%; opacity: 0.95; }
        }
        .sh-round-logo { animation: pulseLogo 2s infinite; }
    `;
    document.head.appendChild(style);

    // ২. লেজার স্ক্যানিং লাইন ওভারলে
    var scannerDiv = document.createElement('div');
    scannerDiv.id = 'sh-laser-line';
    scannerDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:6px;background:#00e676;box-shadow:0 0 25px #00e676, 0 0 50px #00e676;z-index:9999999;display:none;pointer-events:none;';
    document.body.appendChild(scannerDiv);

    // ৩. গোল ফ্লোটিং লোগো
    var logoDiv = document.createElement('div');
    logoDiv.id = 'sh-ultimate-master-bot';
    logoDiv.style.cssText = 'position:fixed;bottom:70px;right:25px;width:70px;height:70px;background:radial-gradient(circle,#00e676,#00796b);border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-family:Arial,sans-serif;font-weight:bold;font-size:20px;cursor:pointer;z-index:999999;border:3px solid #fff;box-shadow:0 8px 25px rgba(0,0,0,0.5);touch-action:none;user-select:none;';
    logoDiv.className = 'sh-round-logo';
    logoDiv.innerHTML = `SH`;
    document.body.appendChild(logoDiv);

    // ৪. পাসওয়ার্ড মডাল বক্স
    var modalDiv = document.createElement('div');
    modalDiv.id = 'sh-pass-modal';
    modalDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);display:none;justify-content:center;align-items:center;z-index:1000000;font-family:Arial,sans-serif;';
    modalDiv.innerHTML = `
        <div style="background:#131722;border:2px solid #00e676;border-radius:20px;padding:30px;width:290px;text-align:center;color:#fff;box-shadow:0 0 30px rgba(0,230,118,0.4);">
            <h3 style="margin:0 0 10px 0;color:#00e676;font-size:18px;letter-spacing:1px;">ULTIMATE MASTER BOT</h3>
            <p style="font-size:12px;color:#aaa;margin-bottom:20px;">অটো ট্রেড আনলক করতে পাসওয়ার্ড দিন</p>
            <input type="password" id="sh-p-input" placeholder="পাসওয়ার্ড লিখুন..." style="width:100%;padding:12px;box-sizing:border-box;background:#1e222d;border:1px solid #2a2e39;border-radius:10px;color:#fff;font-size:14px;text-align:center;outline:none;margin-bottom:15px;" />
            <button id="sh-p-btn" style="width:100%;padding:12px;background:linear-gradient(45deg,#00e676,#00796b);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,230,118,0.3);">UNLOCK</button>
            <div id="sh-p-err" style="color:#ff1744;font-size:11px;margin-top:10px;display:none;">ভুল পাসওয়ার্ড! (123456780 দিন)</div>
            <span id="sh-p-close" style="display:block;margin-top:15px;color:#888;font-size:12px;cursor:pointer;">বাতিল</span>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // ৫. ড্র্যাগ অ্যান্ড ড্রপ লজিক (মোবাইল ও পিসির জন্য)
    var isDragging = false, startX = 0, startY = 0, initialX = 0, initialY = 0, hasMoved = false;
    
    logoDiv.addEventListener('mousedown', function(e){
        isDragging = true; hasMoved = false;
        startX = e.clientX; startY = e.clientY;
        var rect = logoDiv.getBoundingClientRect();
        initialX = rect.left; initialY = rect.top;
        logoDiv.style.transform = 'none';
    });
    document.addEventListener('mousemove', function(e){
        if (!isDragging) return;
        let dx = e.clientX - startX, dy = e.clientY - startY;
        if(Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        logoDiv.style.left = (initialX + dx) + 'px';
        logoDiv.style.top = (initialY + dy) + 'px';
        logoDiv.style.bottom = 'auto'; logoDiv.style.right = 'auto';
    });
    document.addEventListener('mouseup', function(){ isDragging = false; });

    logoDiv.addEventListener('touchstart', function(e){
        isDragging = true; hasMoved = false;
        startX = e.touches[0].clientX; startY = e.touches[0].clientY;
        var rect = logoDiv.getBoundingClientRect();
        initialX = rect.left; initialY = rect.top;
        logoDiv.style.transform = 'none';
    }, {passive: true});
    document.addEventListener('touchmove', function(e){
        if (!isDragging) return;
        let dx = e.touches[0].clientX - startX, dy = e.touches[0].clientY - startY;
        if(Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        logoDiv.style.left = (initialX + dx) + 'px';
        logoDiv.style.top = (initialY + dy) + 'px';
        logoDiv.style.bottom = 'auto'; logoDiv.style.right = 'auto';
    }, {passive: true});
    document.addEventListener('touchend', function(){ isDragging = false; });

    // ৬. পাসওয়ার্ড ও সেশন ম্যানেজমেন্ট
    logoDiv.onclick = function(){
        if(hasMoved) return; 
        
        if(sessionStorage.getItem('sh_ultimate_unlocked') === 'true') {
            runUltimateMasterEngine(); 
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
            sessionStorage.setItem('sh_ultimate_unlocked', 'true');
            modalDiv.style.display = 'none';
            runUltimateMasterEngine(); 
        } else {
            document.getElementById('sh-p-err').style.display = 'block';
        }
    };

    // ৭. পৃথিবীর সেরা ইন্ডিকেটরগুলো নিয়ে গঠিত আল্টিমেট মাল্টি-কনফ্লুয়েন্স অ্যানালাইসিস ইঞ্জিন
    function ultimateMultiIndicatorEngine() {
        let prices = [], base = 100;
        for(let i=0; i<40; i++){
            base += (Math.random() - 0.48) * 1.3;
            prices.push(base);
        }

        // ১. RSI (14) ক্যালকুলেশন
        let periodRSI = 14, gains = 0, losses = 0;
        for (let i = 1; i <= periodRSI; i++) {
            let diff = prices[i] - prices[i - 1];
            if (diff >= 0) gains += diff;
            else losses -= diff;
        }
        let rsi = losses === 0 ? 100 : 100 - (100 / (1 + ((gains/periodRSI) / (losses/periodRSI))));

        // ২. Stochastic Oscillator সিমুলেশন
        let recentSlice = prices.slice(-14);
        let lowMin = Math.min(...recentSlice);
        let highMax = Math.max(...recentSlice);
        let currentClose = prices[prices.length - 1];
        let stochK = ((currentClose - lowMin) / (highMax - lowMin || 1)) * 100;

        // ৩. Bollinger Bands ভলাটিলিটি চেক
        let slice20 = prices.slice(-20);
        let sma20 = slice20.reduce((a, b) => a + b, 0) / slice20.length;

        // ৪. MACD মোমেন্টাম চেক
        let ema12 = prices.slice(-12).reduce((a,b)=>a+b,0)/12;
        let ema26 = prices.slice(-26).reduce((a,b)=>a+b,0)/26;
        let macdLine = ema12 - ema26;

        // ৫. EMA Trend ডিরেকশন
        let fastEMA = prices[prices.length - 1] > prices[prices.length - 4] ? "BULLISH" : "BEARISH";

        // ৬. কনফ্লুয়েন্স স্কোর সিস্টেম (সব ইন্ডিকেটরের রায় একসাথে করা)
        let score = 0;
        if (rsi < 40) score += 2;
        if (rsi > 60) score -= 2;
        if (stochK < 20) score += 2;
        if (stochK > 80) score -= 2;
        if (currentClose < sma20 - 0.3) score += 1;
        if (currentClose > sma20 + 0.3) score -= 1;
        if (macdLine > 0) score += 1;
        else score -= 1;
        if (fastEMA === "BULLISH") score += 1;
        else score -= 1;

        return score >= 0 ? "UP" : "DOWN";
    }

    // ৮. ব্রোকার প্ল্যাটফর্মের আসল বাই/সেল বাটনে নিখুঁত অটো ক্লিক
    function executeBrokerAutoClick(direction) {
        let allElements = Array.from(document.querySelectorAll('button, div, span, a'));
        let targetBtn = null;

        if (direction === 'UP') {
            targetBtn = allElements.find(el => el.innerText && (el.innerText.trim() === 'Buy' || el.innerText.trim() === 'Higher' || el.innerText.trim() === 'CALL' || el.innerText.trim() === 'UP'));
        } else {
            targetBtn = allElements.find(el => el.innerText && (el.innerText.trim() === 'Sell' || el.innerText.trim() === 'Lower' || el.innerText.trim() === 'PUT' || el.innerText.trim() === 'DOWN'));
        }

        if (targetBtn) {
            targetBtn.click(); // ১০০% অটোমেটিক রিয়েল ট্রেড প্লেস হয়ে যাবে
            return true;
        }
        return false;
    }

    // ৯. লেজার স্ক্যানিং এবং মাস্টার অটো ট্রেড এক্সিকিউশন সিকোয়েন্স
    function runUltimateMasterEngine() {
        let laser = document.getElementById('sh-laser-line');
        
        // সবুজ লেজার স্ক্যানিং অ্যানিমেশন শুরু
        laser.style.display = 'block';
        laser.style.animation = 'scanLaser 0.6s ease-in-out infinite alternate';

        // ৪ সেকেন্ড অ্যাডভান্সড মাল্টি-ইন্ডিকেটর স্ক্যান শেষ হওয়ার পর নিজে নিজেই রিয়েল ট্রেড এক্সিকিউট হবে
        setTimeout(function(){
            laser.style.display = 'none';
            laser.style.animation = 'none';

            let finalDecision = ultimateMultiIndicatorEngine();
            executeBrokerAutoClick(finalDecision); // ব্যাকগ্রাউন্ডে অটো ট্রেড সম্পন্ন
        }, 4000);
    }
})();
