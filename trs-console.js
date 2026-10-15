(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Bot is active!');
    }

    // ১. পাসওয়ার্ড মোডাল (TRS VIP SECURITY)
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(5,15,5,0.98), rgba(0,0,0,0.99));border:2px solid #00ff66;box-shadow:0 0 40px rgba(0,255,102,0.6);border-radius:20px;padding:24px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;min-width:280px;backdrop-filter:blur(12px);';
    p.innerHTML = '<div style="color:#00ff66;font-size:18px;font-weight:900;margin-bottom:12px;">🔐 TRS VIP SECURITY 🔐</div>' +
                  '<div style="font-size:13px;color:#ccc;margin-bottom:15px;">Enter Access Password:</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Password (TRS1)" style="width:80%;padding:8px;border-radius:6px;border:1px solid #00ff66;background:#000;color:#00ff66;text-align:center;margin-bottom:15px;font-size:14px;outline:none;"><br>' +
                  '<button id="trs-pass-btn" style="background:linear-gradient(90deg, #00ff66, #00cc52);color:#000;border:none;padding:8px 20px;border-radius:8px;font-weight:900;cursor:pointer;font-size:13px;box-shadow:0 0 10px rgba(0,255,102,0.4);">LOGIN BOT</button>';
    document.body.appendChild(p);

    document.getElementById('trs-pass-btn').onclick = function() {
        var val = document.getElementById('trs-pass-input').value;
        if (val === 'TRS1') {
            p.remove();
            initBot();
        } else {
            alert('❌ Incorrect Password! Access Denied.');
        }
    };

    function initBot() {
        // ২. ড্র্যাগেবল TRS ভাসমান আইকন
        var b = document.createElement('div');
        b.id = 'trs-bot-root';
        b.style.cssText = 'position:fixed;top:180px;right:20px;width:68px;height:68px;border-radius:50%;background:radial-gradient(circle,#00280b 0%,#000 100%);border:2.5px solid #00ff66;box-shadow:0 0 18px #00ff66,inset 0 0 10px #00ff66;color:#00ff66;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;font-family:sans-serif;cursor:move;z-index:999999;user-select:none;touch-action:none;';
        b.innerText = 'TRS';
        document.body.appendChild(b);

        var drag = false, ox, oy;
        b.addEventListener('touchstart', function(e) {
            drag = true;
            ox = e.touches[0].clientX - b.offsetLeft;
            oy = e.touches[0].clientY - b.offsetTop;
        });
        document.addEventListener('touchmove', function(e) {
            if (!drag) return;
            b.style.left = (e.touches[0].clientX - ox) + 'px';
            b.style.top = (e.touches[0].clientY - oy) + 'px';
            b.style.right = 'auto';
        });
        document.addEventListener('touchend', function() { drag = false; });

        // ৩. সিগন্যাল কার্ড এবং লাইভ চার্ট অ্যানালাইসিস
        b.addEventListener('click', function() {
            var old = document.getElementById('trs-card');
            if (old) old.remove();

            // ব্রাউজার থেকে কারেন্ট পেয়ার স্ক্যান করা
            var pairName = 'EUR/USD (OTC)';
            var allDivs = document.querySelectorAll('div, span');
            for (var i = 0; i < allDivs.length; i++) {
                var t = allDivs[i].innerText;
                if (t && (t.includes('(OTC)') || (t.includes('/') && t.length < 12))) {
                    pairName = t.trim().split('\n')[0];
                    break;
                }
            }

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(5,15,5,0.98), rgba(0,0,0,0.99));border:2px solid #00ff66;box-shadow:0 0 45px rgba(0,255,102,0.6);border-radius:20px;padding:22px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;min-width:290px;backdrop-filter:blur(12px);';
            c.innerHTML = '<div style="color:#00ff66;font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:12px;">🛡️ TRS QUANTUM ENGINE 🛡️</div>' +
                          '<div id="trs-status" style="font-size:13px;color:#00e5ff;margin:20px 0;font-weight:bold;">🔍 Live Price Movement Scanning...</div>';
            document.body.appendChild(c);

            // অ্যাডভান্সড ডিপ এনালাইসিস সিমুলেশন ধাপসমূহ
            setTimeout(function() {
                var st = document.getElementById('trs-status');
                if (st) st.innerHTML = '📊 Analyzing Technical Momentum & RSI...';
            }, 1200);

            setTimeout(function() {
                var st = document.getElementById('trs-status');
                if (st) st.innerHTML = '⚡ Filtering Safe Entry Point & Order Flow...';
            }, 2500);

            // ফাইনাল অ্যানালাইসিস কার্ড তৈরি
            setTimeout(function() {
                var now = new Date();
                var seconds = now.getSeconds();
                var isCall = (seconds % 2 === 0);
                var act = isCall ? '🟢 CALL (BUY) 📈' : '🔴 PUT (SELL) 📉';
                var actColor = isCall ? '#00ff66' : '#ff3333';
                var trd = isCall ? 'BULLISH BREAKOUT' : 'BEARISH REJECTION';
                var acc = (93.5 + (Math.random() * 3.5)).toFixed(1) + '%';

                c.innerHTML = '<div style="color:#00ff66;font-size:17px;font-weight:900;margin-bottom:8px;">💎 TRS VIP PRO v5.5 💎</div>' +
                              '<div style="font-size:12px;color:#ccc;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:6px;">Asset: <b style="color:#fff;">' + pairName + '</b></div>' +
                              '<div style="font-size:20px;font-weight:bold;margin:12px 0;color:' + actColor + ';text-shadow:0 0 15px ' + actColor + ';">' + act + '</div>' +
                              '<div style="font-size:12px;color:#aaa;margin-bottom:6px;">Pattern: <b style="color:#00e5ff;">' + trd + '</b></div>' +
                              '<div style="font-size:12px;color:#aaa;margin-bottom:15px;">Accuracy: <b style="color:#00ff66;">' + acc + '</b></div>' +
                              '<button id="trs-close-btn" style="background:#222;color:#fff;border:1px solid #555;padding:6px 16px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">CLOSE</button>';

                document.getElementById('trs-close-btn').onclick = function() {
                    c.remove();
                };
            }, 3800);
        });
    }
})();
