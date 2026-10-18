(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Bot is active!');
    }

    // ১. সিকিউরিটি পাসওয়ার্ড মোডাল
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#031005;border:2px solid #00ff66;box-shadow:0 0 30px rgba(0,255,102,0.5);border-radius:15px;padding:20px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:270px;';
    p.innerHTML = '<div style="color:#00ff66;font-size:16px;font-weight:900;margin-bottom:10px;">🔐 TRS VIP SECURITY</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Password (TRS1)" style="width:75%;padding:6px;border-radius:5px;border:1px solid #00ff66;background:#000;color:#00ff66;text-align:center;margin-bottom:12px;outline:none;"><br>' +
                  '<button id="trs-pass-btn" style="background:#00ff66;color:#000;border:none;padding:6px 15px;border-radius:5px;font-weight:900;cursor:pointer;">LOGIN</button>';
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
        // ২. ভাসমান TRS আইকন
        var b = document.createElement('div');
        b.id = 'trs-bot-root';
        b.style.cssText = 'position:fixed;top:150px;right:20px;width:60px;height:60px;border-radius:50%;background:#000;border:2px solid #00ff66;box-shadow:0 0 15px #00ff66;color:#00ff66;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;font-family:sans-serif;cursor:pointer;z-index:999999;';
        b.innerText = 'TRS';
        document.body.appendChild(b);

        b.onclick = function() {
            var old = document.getElementById('trs-card');
            if (old) old.remove();

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#031005;border:2px solid #00ff66;box-shadow:0 0 40px rgba(0,255,102,0.6);border-radius:15px;padding:20px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:280px;';
            
            c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
                          '<b style="color:#fff;font-size:15px;">TRS ENGINE CONNECTED</b>' +
                          '<div id="trs-close" style="color:#00ff66;cursor:pointer;">✕</div>' +
                          '</div>' +
                          '<div id="trs-status" style="font-size:12px;color:#00ff66;margin:12px 0;font-weight:bold;">FETCHING FROM TERMUX...</div>' +
                          '<div style="position:relative;width:80px;height:80px;margin:10px auto;border:1px solid #00ff66;border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
                          '<div style="position:absolute;width:40px;height:2px;background:#00ff66;top:39px;left:40px;transform-origin:left center;animation:trsR 1s linear infinite;"></div>' +
                          '</div>';

            document.body.appendChild(c);

            if(!document.getElementById('trs-style')) {
                var st = document.createElement('style');
                st.id = 'trs-style';
                st.innerHTML = '@keyframes trsR { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                document.head.appendChild(st);
            }

            document.getElementById('trs-close').onclick = function() { c.remove(); };

            // টার্মাক্স ব্যাকএন্ড লোকাল সার্ভার থেকে ডেটা ফেচ করা
            fetch('http://localhost:5000/signal')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var isUp = data.direction === 'UP';
                    var sColor = isUp ? '#00ff66' : '#ff3333';
                    var sub = isUp ? 'CALL (BUY)' : 'PUT (SELL)';

                    c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
                                  '<b style="color:#fff;font-size:15px;">TRS ENGINE DATA</b>' +
                                  '<div id="trs-close2" style="color:#00ff66;cursor:pointer;">✕</div>' +
                                  '</div>' +
                                  '<div style="font-size:11px;color:#00e5ff;margin-bottom:5px;">Engine: <b>Termux Python API</b></div>' +
                                  '<div style="font-size:28px;font-weight:900;margin:10px 0;color:' + sColor + ';">' + data.direction + '</div>' +
                                  '<div style="font-size:12px;color:#aaa;">Action: <b style="color:' + sColor + ';">' + sub + '</b></div>' +
                                  '<div style="font-size:11px;color:#00ff66;margin-top:8px;">Accuracy: <b>' + data.accuracy + '</b></div>';

                    document.getElementById('trs-close2').onclick = function() { c.remove(); };
                })
                .catch(function(err) {
                    c.innerHTML = '<div style="color:#ff3333;font-size:12px;margin:15px 0;">❌ Termux Engine Not Running!<br><span style="font-size:10px;color:#aaa;">Start python server.py in Termux</span></div>' +
                                  '<div id="trs-close3" style="color:#00ff66;cursor:pointer;font-size:12px;">Close</div>';
                    document.getElementById('trs-close3').onclick = function() { c.remove(); };
                });
        };
    }
})();
