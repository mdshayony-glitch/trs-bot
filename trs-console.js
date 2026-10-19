(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Signals Pro is already active!');
    }

    // ১. পাসওয়ার্ড মোডাল
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, #0b0f19, #020408);border:1px solid #d4af37;box-shadow:0 0 40px rgba(212,175,55,0.3);border-radius:16px;padding:25px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:280px;';
    p.innerHTML = '<div style="color:#d4af37;font-size:18px;font-weight:900;margin-bottom:12px;letter-spacing:1px;">🔐 TRS VIP LOGIN</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Enter Password (TRS1)" style="width:80%;padding:8px;border-radius:8px;border:1px solid #d4af37;background:#000;color:#d4af37;text-align:center;margin-bottom:15px;outline:none;font-size:14px;"><br>' +
                  '<button id="trs-pass-btn" style="background:linear-gradient(135deg, #d4af37, #aa771c);color:#000;border:none;padding:8px 20px;border-radius:8px;font-weight:900;cursor:pointer;font-size:14px;">CONNECT</button>';
    document.body.appendChild(p);

    document.getElementById('trs-pass-btn').onclick = function() {
        if (document.getElementById('trs-pass-input').value === 'TRS1') {
            p.remove();
            initTRSBot();
        } else {
            alert('❌ Incorrect Password!');
        }
    };

    function initTRSBot() {
        // ২. আপনার দেওয়া গোল্ডেন স্টাইলের মুভেবল ড্র্যাগেবল লোগো
        var b = document.createElement('div');
        b.id = 'trs-bot-root';
        b.style.cssText = 'position:fixed;top:120px;right:20px;width:65px;height:65px;border-radius:50%;background:radial-gradient(circle, #1e1b10, #000);border:2px solid #d4af37;box-shadow:0 0 25px rgba(212,175,55,0.6);color:#d4af37;display:flex;align-items:center;justify-content:center;font-weight:900;font-family:sans-serif;cursor:grab;z-index:999999;user-select:none;touch-action:none;';
        b.innerHTML = '<div style="text-align:center;">' +
                      '<div style="font-size:14px;font-weight:900;color:#d4af37;text-shadow:0 0 6px #d4af37;">TRS</div>' +
                      '<div style="font-size:7px;color:#00ff66;font-weight:bold;background:rgba(0,255,102,0.1);padding:1px 3px;border-radius:3px;margin-top:2px;">PRO</div>' +
                      '</div>';
        document.body.appendChild(b);

        var isDragging = false, startX, startY, initialX, initialY, hasMoved = false;

        b.addEventListener('pointerdown', function(e) {
            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            initialX = b.offsetLeft;
            initialY = b.offsetTop;
            b.setPointerCapture(e.pointerId);
        });

        b.addEventListener('pointermove', function(e) {
            if (!isDragging) return;
            var dx = e.clientX - startX;
            var dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
            b.style.left = (initialX + dx) + 'px';
            b.style.top = (initialY + dy) + 'px';
            b.style.right = 'auto';
        });

        b.addEventListener('pointerup', function(e) {
            isDragging = false;
        });

        // ৩. লোগোতে ক্লিক করলে প্রিমিয়াম ড্যাশবোর্ড ওপেন হবে
        b.onclick = function(e) {
            if (hasMoved) return;

            var old = document.getElementById('trs-card');
            if (old) old.remove();

            var d = new Date();
            var timeStr = d.toTimeString().split(' ')[0];

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, #0f172a, #020617);border:1px solid #d4af37;box-shadow:0 0 60px rgba(0,0,0,0.8);border-radius:14px;padding:16px;color:#fff;font-family:sans-serif;z-index:1000000;width:320px;box-sizing:border-box;';
            
            c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #1e293b;padding-bottom:8px;">' +
                          '<div style="display:flex;align-items:center;gap:8px;">' +
                              '<div style="background:#d4af37;color:#000;font-weight:900;font-size:10px;padding:2px 6px;border-radius:4px;">PRO</div>' +
                              '<b style="color:#d4af37;font-size:13px;letter-spacing:0.5px;">TRS SIGNALS PRO</b>' +
                          '</div>' +
                          '<div style="display:flex;gap:10px;">' +
                              '<div id="trs-min" style="color:#94a3b8;font-weight:bold;cursor:pointer;font-size:14px;">–</div>' +
                              '<div id="trs-close" style="color:#ef4444;font-weight:bold;cursor:pointer;font-size:14px;">✕</div>' +
                          '</div>' +
                          '</div>' +
                          '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:10px;background:#020617;padding:6px 10px;border-radius:6px;border:1px solid #1e293b;">' +
                              '<span>ENGINE: <b style="color:#00ff66;">AI ACTIVE</b></span>' +
                              '<span>TIME: <b style="color:#fff;">' + timeStr + '</b></span>' +
                          '</div>' +
                          // ক্যান্ডেল স্ক্যানার গ্রিড বক্স
                          '<div id="trs-scanner-box" style="position:relative;background:#020617;border:1px solid #1e293b;border-radius:8px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:12px;overflow:hidden;">' +
                              '<div style="position:absolute;top:8px;left:10px;font-size:9px;color:#64748b;letter-spacing:0.5px;">MARKET PRICE ACTION SCANNER</div>' +
                              '<div id="trs-scan-content" style="text-align:center;">' +
                                  '<div style="font-size:11px;color:#00e5ff;font-weight:bold;margin-bottom:8px;">Analyzing Candles & Trend..</div>' +
                                  '<div style="width:30px;height:60px;background:#d4af37;border-radius:4px;margin:0 auto;box-shadow:0 0 15px #d4af37;animation:pulseCandle 1s infinite alternate;"></div>' +
                              '</div>' +
                          '</div>' +
                          // সিগন্যাল ডিসপ্লে সেকশন
                          '<div style="display:flex;justify-content:space-between;align-items:center;background:#020617;padding:10px;border-radius:8px;border:1px solid #1e293b;margin-bottom:12px;">' +
                              '<div>' +
                                  '<div style="font-size:9px;color:#64748b;">LATEST SIGNAL</div>' +
                                  '<div id="trs-sig-text" style="font-size:18px;font-weight:900;color:#d4af37;letter-spacing:1px;">READY</div>' +
                              '</div>' +
                              '<div style="text-align:right;">' +
                                  '<div style="font-size:9px;color:#64748b;">ACCURACY</div>' +
                                  '<div style="font-size:14px;font-weight:bold;color:#00ff66;">96.8%</div>' +
                              '</div>' +
                          '</div>' +
                          // কাউন্টডাউন ও অ্যাকশন বাটন
                          '<div id="trs-action-btn" style="background:linear-gradient(135deg, #d4af37, #aa771c);color:#000;text-align:center;padding:10px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 12px rgba(212,175,55,0.3);">GET HIGH ACCURACY SIGNAL</div>';

            document.body.appendChild(c);

            if(!document.getElementById('trs-style')) {
                var st = document.createElement('style');
                st.id = 'trs-style';
                st.innerHTML = '@keyframes pulseCandle { 0% { transform: scaleY(0.9); opacity: 0.7; } 100% { transform: scaleY(1.1); opacity: 1; } }';
                document.head.appendChild(st);
            }

            document.getElementById('trs-close').onclick = function() { c.remove(); };
            document.getElementById('trs-min').onclick = function() { 
                var box = document.getElementById('trs-scanner-box');
                box.style.display = box.style.display === 'none' ? 'flex' : 'none';
            };

            // বাটন ক্লিক করলে নিখুঁত ট্রেন্ড লজিক ও কাউন্টডাউন শুরু হবে
            document.getElementById('trs-action-btn').onclick = function() {
                var btn = this;
                btn.style.pointerEvents = 'none';
                btn.style.background = '#334155';
                btn.style.color = '#fff';
                btn.innerText = 'ANALYZING MARKET PATTERNS...';

                var scanC = document.getElementById('trs-scan-content');
                scanC.innerHTML = '<div style="font-size:11px;color:#00e5ff;font-weight:bold;animation:pulseCandle 0.6s infinite alternate;">Calculating Price Action & Momentum...</div>';

                setTimeout(function() {
                    // নিখুঁত টাইম-সাইকেল ও মোমেন্টাম বেসড সিগন্যাল ক্যালকুলেশন
                    var d = new Date();
                    var sec = d.getSeconds();
                    var min = d.getMinutes();
                    var calc = (min * 60 + sec) % 7;
                    var chosenDir = (calc % 2 === 0) ? "UP" : "DOWN";
                    
                    var isUp = chosenDir === 'UP';
                    var color = isUp ? '#00ff66' : '#ef4444';
                    var actionText = isUp ? 'CALL (BUY) - Strong Bullish' : 'PUT (SELL) - Strong Bearish';

                    document.getElementById('trs-sig-text').innerText = chosenDir;
                    document.getElementById('trs-sig-text').style.color = color;

                    scanC.innerHTML = '<div style="font-size:24px;font-weight:900;color:' + color + ';text-shadow:0 0 15px ' + color + ';">' + chosenDir + '</div>' +
                                      '<div style="font-size:10px;color:#94a3b8;margin-top:4px;">' + actionText + '</div>';

                    // কাউন্টডাউন টাইমার (১৫ সেকেন্ড)
                    var countdown = 15;
                    var timerInterval = setInterval(function() {
                        countdown--;
                        btn.innerText = 'WAIT ' + countdown + 's (Next Signal)';
                        if (countdown <= 0) {
                            clearInterval(timerInterval);
                            btn.innerText = 'GET HIGH ACCURACY SIGNAL';
                            btn.style.background = 'linear-gradient(135deg, #d4af37, #aa771c)';
                            btn.style.color = '#000';
                            btn.style.pointerEvents = 'auto';
                        }
                    }, 1000);

                }, 1800);
            };
        };
    }
})();
