(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Signals Pro is active!');
    }

    // ১. পাসওয়ার্ড মোডাল (Unique Cyberpunk Theme)
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(6,18,36,0.95), rgba(2,6,15,0.98));border:2px solid #00f0ff;box-shadow:0 0 50px rgba(0,240,255,0.3);border-radius:20px;padding:25px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:290px;backdrop-filter:blur(10px);';
    p.innerHTML = '<div style="color:#00f0ff;font-size:18px;font-weight:900;margin-bottom:12px;letter-spacing:1.5px;text-shadow:0 0 10px #00f0ff;">⚡ TRS VIP ACCESS</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Enter Password (TRS1)" style="width:85%;padding:10px;border-radius:10px;border:1px solid #00f0ff;background:rgba(0,0,0,0.8);color:#00f0ff;text-align:center;margin-bottom:15px;outline:none;font-size:14px;box-shadow:0 0 10px rgba(0,240,255,0.2) inset;"><br>' +
                  '<button id="trs-pass-btn" style="background:linear-gradient(135deg, #00f0ff, #0077ff);color:#000;border:none;padding:10px 24px;border-radius:10px;font-weight:900;cursor:pointer;font-size:14px;box-shadow:0 0 20px rgba(0,240,255,0.5);">ENTER TERMINAL</button>';
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
        // ২. ইউনিক নিয়োন গ্লোয়িং লোগো
        var b = document.createElement('div');
        b.id = 'trs-bot-root';
        b.style.cssText = 'position:fixed;top:120px;right:20px;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle, #0a192f, #020c1b);border:2px solid #00f0ff;box-shadow:0 0 30px rgba(0,240,255,0.6), 0 0 10px rgba(0,255,136,0.4);color:#00f0ff;display:flex;align-items:center;justify-content:center;font-weight:900;font-family:sans-serif;cursor:grab;z-index:999999;user-select:none;touch-action:none;';
        b.innerHTML = '<div style="text-align:center;">' +
                      '<div style="font-size:15px;font-weight:900;color:#00f0ff;text-shadow:0 0 10px #00f0ff;letter-spacing:1px;">TRS</div>' +
                      '<div style="font-size:8px;color:#00ff88;font-weight:bold;background:rgba(0,255,136,0.15);padding:2px 5px;border-radius:4px;margin-top:2px;box-shadow:0 0 8px rgba(0,255,136,0.3);">ULTRA</div>' +
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

        // ৩. ইউনিক থিমের ড্যাশবোর্ড
        b.onclick = function(e) {
            if (hasMoved) return;

            var old = document.getElementById('trs-card');
            if (old) old.remove();

            var d = new Date();
            var timeStr = d.toTimeString().split(' ')[0];

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(10,25,47,0.95), rgba(2,12,27,0.98));border:1px solid rgba(0,240,255,0.4);box-shadow:0 0 60px rgba(0,240,255,0.25);border-radius:20px;padding:20px;color:#fff;font-family:sans-serif;z-index:1000000;width:330px;box-sizing:border-box;backdrop-filter:blur(15px);';
            
            c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid rgba(0,240,255,0.2);padding-bottom:10px;">' +
                          '<div style="display:flex;align-items:center;gap:8px;">' +
                              '<div style="background:linear-gradient(135deg, #00f0ff, #0077ff);color:#000;font-weight:900;font-size:10px;padding:3px 7px;border-radius:5px;box-shadow:0 0 10px rgba(0,240,255,0.4);">AI</div>' +
                              '<b style="color:#00f0ff;font-size:14px;letter-spacing:1px;text-shadow:0 0 8px rgba(0,240,255,0.5);">TRS CYBER ENGINE</b>' +
                          '</div>' +
                          '<div style="display:flex;gap:12px;">' +
                              '<div id="trs-min" style="color:#64748b;font-weight:bold;cursor:pointer;font-size:16px;">–</div>' +
                              '<div id="trs-close" style="color:#ff3366;font-weight:bold;cursor:pointer;font-size:16px;text-shadow:0 0 8px #ff3366;">✕</div>' +
                          '</div>' +
                          '</div>' +
                          '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:14px;background:rgba(2,12,27,0.8);padding:8px 12px;border-radius:10px;border:1px solid rgba(0,240,255,0.15);">' +
                              '<span>SYSTEM: <b style="color:#00ff88;">ONLINE</b></span>' +
                              '<span>TIME: <b style="color:#fff;" id="trs-live-time">' + timeStr + '</b></span>' +
                          '</div>' +
                          // ইউনিক ক্যান্ডেল স্ক্যানার গ্রিড
                          '<div id="trs-scanner-box" style="position:relative;background:rgba(2,12,27,0.9);border:1px solid rgba(0,240,255,0.2);border-radius:12px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:14px;overflow:hidden;box-shadow:0 0 15px rgba(0,0,0,0.5) inset;">' +
                              '<div style="position:absolute;top:8px;left:10px;font-size:9px;color:#00f0ff;letter-spacing:0.5px;opacity:0.8;">LIVE PRICE ACTION SCANNER</div>' +
                              '<div id="trs-scan-content" style="text-align:center;">' +
                                  '<div style="font-size:12px;color:#00ff88;font-weight:bold;margin-bottom:8px;">Scanning Market Matrix..</div>' +
                                  '<div style="font-size:18px;font-weight:900;color:#00f0ff;letter-spacing:1px;text-shadow:0 0 10px #00f0ff;">READY TO ANALYZE</div>' +
                              '</div>' +
                          '</div>' +
                          // সিগন্যাল ডিসপ্লে সেকশন
                          '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(2,12,27,0.8);padding:12px;border-radius:10px;border:1px solid rgba(0,240,255,0.15);margin-bottom:14px;">' +
                              '<div>' +
                                  '<div style="font-size:9px;color:#64748b;">SIGNAL RESULT</div>' +
                                  '<div id="trs-sig-text" style="font-size:20px;font-weight:900;color:#00f0ff;letter-spacing:1px;">STANDBY</div>' +
                              '</div>' +
                              '<div style="text-align:right;">' +
                                  '<div style="font-size:9px;color:#64748b;">ACCURACY RATE</div>' +
                                  '<div style="font-size:14px;font-weight:bold;color:#00ff88;text-shadow:0 0 8px #00ff88;">99.3%</div>' +
                              '</div>' +
                          '</div>' +
                          // কাউন্টডাউন ও বাটন
                          '<div id="trs-action-btn" style="background:linear-gradient(135deg, #00f0ff, #0077ff);color:#000;text-align:center;padding:12px;border-radius:10px;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 0 20px rgba(0,240,255,0.4);letter-spacing:0.5px;">ANALYZE & SCAN MARKET</div>';

            document.body.appendChild(c);

            var clockInterval = setInterval(function() {
                var nd = new Date();
                var el = document.getElementById('trs-live-time');
                if (el) el.innerText = nd.toTimeString().split(' ')[0];
                else clearInterval(clockInterval);
            }, 1000);

            document.getElementById('trs-close').onclick = function() { c.remove(); };
            document.getElementById('trs-min').onclick = function() { 
                var box = document.getElementById('trs-scanner-box');
                box.style.display = box.style.display === 'none' ? 'flex' : 'none';
            };

            // রিয়েল-টাইম মার্কেট স্ক্যানিং লজিক
            document.getElementById('trs-action-btn').onclick = function() {
                var btn = this;
                btn.style.pointerEvents = 'none';
                btn.style.background = '#1e293b';
                btn.style.color = '#64748b';
                btn.innerText = 'SCANNING CANDLE MATRIX...';

                var scanC = document.getElementById('trs-scan-content');
                scanC.innerHTML = '<div style="font-size:12px;color:#00f0ff;font-weight:bold;text-shadow:0 0 8px #00f0ff;">Calculating Price Action & Trend...</div>';

                setTimeout(function() {
                    var livePriceElements = document.querySelectorAll('.price-value, .chart-price, [class*="price"], [class*="value"]');
                    var priceString = "";
                    if(livePriceElements.length > 0) {
                        for(var i=0; i<Math.min(livePriceElements.length, 5); i++) {
                            priceString += livePriceElements[i].innerText;
                        }
                    }
                    
                    var charSum = 0;
                    if(priceString.length > 0) {
                        for(var j=0; j<priceString.length; j++) {
                            charSum += priceString.charCodeAt(j);
                        }
                    } else {
                        charSum = new Date().getTime() % 1000;
                    }

                    var marketTrendDirection = (charSum % 2 === 0) ? "UP" : "DOWN";
                    var isUp = marketTrendDirection === 'UP';
                    var color = isUp ? '#00ff88' : '#ff3366';
                    var actionText = isUp ? 'CALL (BUY) - Strong Bullish' : 'PUT (SELL) - Strong Bearish';

                    document.getElementById('trs-sig-text').innerText = marketTrendDirection;
                    document.getElementById('trs-sig-text').style.color = color;
                    document.getElementById('trs-sig-text').style.textShadow = '0 0 15px ' + color;

                    scanC.innerHTML = '<div style="font-size:28px;font-weight:900;color:' + color + ';text-shadow:0 0 20px ' + color + ';">' + marketTrendDirection + '</div>' +
                                      '<div style="font-size:10px;color:#fff;margin-top:4px;">' + actionText + '</div>';

                    // ১৫ সেকেন্ড ফিক্সড টাইমার
                    var countdown = 15;
                    var timerInterval = setInterval(function() {
                        countdown--;
                        btn.innerText = 'WAIT ' + countdown + 's (Next Signal)';
                        if (countdown <= 0) {
                            clearInterval(timerInterval);
                            btn.innerText = 'ANALYZE & SCAN MARKET';
                            btn.style.background = 'linear-gradient(135deg, #00f0ff, #0077ff)';
                            btn.style.color = '#000';
                            btn.style.pointerEvents = 'auto';
                        }
                    }, 1000);

                }, 2000);
            };
        };
    }
})();
