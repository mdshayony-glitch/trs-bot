(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Bot is active!');
    }

    // ১. সিকিউরিটি পাসওয়ার্ড মোডাল
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, #020f04, #000);border:2px solid #00ff66;box-shadow:0 0 40px rgba(0,255,102,0.4);border-radius:16px;padding:25px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:280px;';
    p.innerHTML = '<div style="color:#00ff66;font-size:18px;font-weight:900;margin-bottom:12px;letter-spacing:1px;">🔐 TRS VIP SECURITY</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Enter Password (TRS1)" style="width:80%;padding:8px;border-radius:8px;border:1px solid #00ff66;background:#000;color:#00ff66;text-align:center;margin-bottom:15px;outline:none;font-size:14px;"><br>' +
                  '<button id="trs-pass-btn" style="background:#00ff66;color:#000;border:none;padding:8px 20px;border-radius:8px;font-weight:900;cursor:pointer;font-size:14px;box-shadow:0 0 10px #00ff66;">LOGIN</button>';
    document.body.appendChild(p);

    document.getElementById('trs-pass-btn').onclick = function() {
        if (document.getElementById('trs-pass-input').value === 'TRS1') {
            p.remove();
            initBot();
        } else {
            alert('❌ Incorrect Password!');
        }
    };

    function initBot() {
        // ২. ড্র্যাগেবল (টেনে যেকোনো জায়গায় নেওয়া যায়) এবং প্রিমিয়াম লোগো
        var b = document.createElement('div');
        b.id = 'trs-bot-root';
        b.style.cssText = 'position:fixed;top:120px;right:20px;width:65px;height:65px;border-radius:50%;background:radial-gradient(circle, #05260a, #000);border:2px solid #00ff66;box-shadow:0 0 20px #00ff66;color:#00ff66;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;font-family:sans-serif;cursor:grab;z-index:999999;user-select:none;touch-action:none;';
        b.innerHTML = '<div style="text-align:center;"><div style="font-size:14px;font-weight:900;">TRS</div><div style="font-size:8px;color:#00e5ff;">AI</div></div>';
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
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasMoved = true;
            }
            b.style.left = (initialX + dx) + 'px';
            b.style.top = (initialY + dy) + 'px';
            b.style.right = 'auto';
        });

        b.addEventListener('pointerup', function(e) {
            isDragging = false;
        });

        // ৩. লোগোতে ক্লিক করলে প্রফেশনাল রাডার স্ক্যানিং শুরু হবে
        b.onclick = function(e) {
            if (hasMoved) return; // ড্র্যাগ করা হলে ক্লিক ট্রিগার হবে না

            var old = document.getElementById('trs-card');
            if (old) old.remove();

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, #031507, #000);border:2px solid #00ff66;box-shadow:0 0 50px rgba(0,255,102,0.5);border-radius:18px;padding:22px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:300px;';
            
            // প্রফেশনাল রাডার স্ক্যানিং ইউআই
            c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
                          '<b style="color:#00ff66;font-size:14px;letter-spacing:1px;">TRS RADAR SCANNER</b>' +
                          '<div id="trs-close" style="color:#ff3333;font-weight:bold;cursor:pointer;font-size:16px;">✕</div>' +
                          '</div>' +
                          '<div id="trs-status" style="font-size:11px;color:#00e5ff;margin:10px 0;font-weight:bold;letter-spacing:0.5px;">ANALYZING MARKET MOMENTUM...</div>' +
                          '<div style="position:relative;width:90px;height:90px;margin:15px auto;border:2px solid rgba(0,255,102,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle, rgba(0,255,102,0.05), transparent);">' +
                              '<div style="position:absolute;width:100%;height:1px;background:rgba(0,255,102,0.2);top:45px;"></div>' +
                              '<div style="position:absolute;width:1px;height:100%;background:rgba(0,255,102,0.2);left:45px;"></div>' +
                              '<div style="position:absolute;width:45px;height:2px;background:linear-gradient(90deg, transparent, #00ff66);top:44px;left:45px;transform-origin:left center;animation:trsR 1.2s linear infinite;"></div>' +
                          '</div>' +
                          '<div style="font-size:10px;color:#888;margin-top:5px;">Connecting to Termux Engine...</div>';

            document.body.appendChild(c);

            if(!document.getElementById('trs-style')) {
                var st = document.createElement('style');
                st.id = 'trs-style';
                st.innerHTML = '@keyframes trsR { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                document.head.appendChild(st);
            }

            document.getElementById('trs-close').onclick = function() { c.remove(); };

            // টার্মাক্স সার্ভার থেকে ডেটা ফেচ করা (২ সেকেন্ড রাডার অ্যানিমেশন দেখানোর পর ফাইনাল রেজাল্ট শো করবে)
            setTimeout(function() {
                fetch('http://127.0.0.1:5000/signal')
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                        var isUp = data.direction === 'UP';
                        var sColor = isUp ? '#00ff66' : '#ff3333';
                        var sub = isUp ? 'CALL (BUY)' : 'PUT (SELL)';

                        c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
                                      '<b style="color:#00ff66;font-size:14px;letter-spacing:1px;">TRS VIP SIGNAL</b>' +
                                      '<div id="trs-close2" style="color:#ff3333;font-weight:bold;cursor:pointer;font-size:16px;">✕</div>' +
                                      '</div>' +
                                      '<div style="font-size:10px;color:#aaa;margin-bottom:4px;">Engine: <b style="color:#00e5ff;">Termux AI Backend</b></div>' +
                                      '<div style="font-size:34px;font-weight:900;margin:12px 0;color:' + sColor + ';text-shadow:0 0 20px ' + sColor + ';">' + data.direction + '</div>' +
                                      '<div style="font-size:12px;color:#fff;background:rgba(0,255,102,0.08);padding:8px;border-radius:8px;margin:8px 0;border:1px solid rgba(0,255,102,0.2);">Action: <b style="color:' + sColor + ';">' + sub + '</b></div>' +
                                      '<div style="font-size:11px;color:#00ff66;margin-top:8px;">Accuracy Rate: <b>' + data.accuracy + '</b></div>';

                        document.getElementById('trs-close2').onclick = function() { c.remove(); };
                    })
                    .catch(function(err) {
                        c.innerHTML = '<div style="color:#ff3333;font-size:12px;margin:15px 0;line-height:1.5;">❌ Termux Engine Not Connected!<br><span style="font-size:10px;color:#aaa;">Run: python server.py in Termux</span></div>' +
                                      '<div id="trs-close3" style="background:#00ff66;color:#000;padding:6px 15px;border-radius:6px;cursor:pointer;font-size:12px;display:inline-block;font-weight:bold;">Close</div>';
                        document.getElementById('trs-close3').onclick = function() { c.remove(); };
                    });
            }, 1800); // ১.৮ সেকেন্ড অসাধারণ রাডার স্ক্যানিং প্রসেসিং দেখাবে
        };
    }
})();
