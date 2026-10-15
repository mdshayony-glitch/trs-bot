(function() {
    if (document.getElementById('trs-bot-root') || document.getElementById('trs-pass-modal')) {
        return alert('TRS Bot is active!');
    }

    // ১. পাসওয়ার্ড মোডাল
    var p = document.createElement('div');
    p.id = 'trs-pass-modal';
    p.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(3,15,5,0.98), rgba(0,0,0,0.99));border:2px solid #00ff66;box-shadow:0 0 40px rgba(0,255,102,0.6);border-radius:20px;padding:24px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:290px;backdrop-filter:blur(12px);';
    p.innerHTML = '<div style="color:#00ff66;font-size:18px;font-weight:900;margin-bottom:12px;">🔐 TRS VIP SECURITY 🔐</div>' +
                  '<div style="font-size:13px;color:#ccc;margin-bottom:15px;">Enter Access Password:</div>' +
                  '<input type="password" id="trs-pass-input" placeholder="Password " style="width:80%;padding:8px;border-radius:6px;border:1px solid #00ff66;background:#000;color:#00ff66;text-align:center;margin-bottom:15px;font-size:14px;outline:none;"><br>' +
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
        // ২. ড্র্যাগেবল ভাসমান লোগো
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

        // ৩. ক্লিক করলে রডার ও সিগন্যাল প্যানেল আসবে
        b.addEventListener('click', function() {
            if (drag) return;
            var old = document.getElementById('trs-card');
            if (old) old.remove();

            // অটো মার্কেট ডিটেকশন
            var currentMarket = 'EUR/USD (OTC)';
            var elements = document.querySelectorAll('*');
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].innerText;
                if (text && (text.includes('/USD') || text.includes('(OTC)') || text.includes('EUR') || text.includes('GBP'))) {
                    var lines = text.trim().split('\n');
                    for (var j = 0; j < lines.length; j++) {
                        var line = lines[j].trim();
                        if ((line.includes('/') || line.includes('OTC')) && line.length < 20 && line.length > 3) {
                            currentMarket = line;
                            break;
                        }
                    }
                    if (currentMarket !== 'EUR/USD (OTC)') break;
                }
            }

            var c = document.createElement('div');
            c.id = 'trs-card';
            c.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg, rgba(3,15,5,0.98), rgba(0,0,0,0.99));border:2px solid #00ff66;box-shadow:0 0 45px rgba(0,255,102,0.6);border-radius:20px;padding:20px;color:#fff;font-family:sans-serif;z-index:1000000;text-align:center;width:290px;backdrop-filter:blur(12px);';
            
            c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
                          '<b style="color:#fff;font-size:17px;letter-spacing:1px;">TRS QUANTUM BOT</b>' +
                          '<div id="trs-close-btn" style="background:#112211;border:1px solid #00ff66;color:#00ff66;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;cursor:pointer;font-size:13px;">✕</div>' +
                          '</div>' +
                          '<div style="font-size:11px;color:#00e5ff;margin-bottom:6px;background:rgba(0,229,255,0.1);padding:4px;border-radius:4px;">Market: <b>' + currentMarket + '</b></div>' +
                          '<div style="display:flex;justify-content:space-between;font-size:10px;color:#aaa;background:rgba(255,255,255,0.05);padding:5px 8px;border-radius:5px;margin-bottom:8px;">' +
                          '<span>Time: <b>1M</b></span>' +
                          '<span>Mode: <b style="color:#00ff66;">VIP AI</b></span>' +
                          '<span>Acc: <b style="color:#00ff66;">96%</b></span>' +
                          '</div>' +
                          '<div id="trs-status" style="font-size:12px;color:#00ff66;letter-spacing:1px;margin:6px 0;font-weight:bold;">S I G N A L &nbsp; R E A D Y</div>' +
                          '<div style="position:relative;width:120px;height:120px;margin:10px auto;border:1px solid rgba(0,255,102,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle, rgba(0,50,20,0.2) 0%, rgba(0,0,0,0.8) 100%);box-shadow:inset 0 0 15px rgba(0,255,102,0.2);">' +
                          '<div style="position:absolute;width:80px;height:80px;border:1px dashed rgba(0,255,102,0.3);border-radius:50%;"></div>' +
                          '<div style="position:absolute;width:40px;height:40px;border:1px solid rgba(0,255,102,0.3);border-radius:50%;"></div>' +
                          '<div style="position:absolute;width:40px;height:2px;background:#00ff66;top:60px;left:60px;transform-origin:left center;animation:trsRadar 1.5s linear infinite;box-shadow:0 0 8px #00ff66;"></div>' +
                          '<div style="width:6px;height:6px;background:#00ff66;border-radius:50%;box-shadow:0 0 10px #00ff66;"></div>' +
                          '</div>' +
                          '<div style="font-size:10px;color:#888;margin-top:6px;">User: <b style="color:#aaa;">@trs VIP</b></div>';

            document.body.appendChild(c);

            if(!document.getElementById('trs-radar-style')) {
                var st = document.createElement('style');
                st.id = 'trs-radar-style';
                st.innerHTML = '@keyframes trsRadar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                document.head.appendChild(st);
            }

            document.getElementById('trs-close-btn').onclick = function() {
                c.remove();
            };

            // স্ক্যানিং শেষ হয়ে সিগন্যাল আসার সময়
            setTimeout(function() {
                var st = document.getElementById('trs-status');
                if(st) st.innerHTML = 'S C A N &nbsp; C O M P L E T E';
            }, 2000);

            setTimeout(function() {
                var now = new Date();
                var isUp = (now.getSeconds() % 2 === 0);
                var sigText = isUp ? 'U P' : 'D O W N';
                var sigColor = isUp ? '#00ff66' : '#ff3333';
                var subText = isUp ? 'CALL (BUY)' : 'PUT (SELL)';

                c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
                              '<b style="color:#fff;font-size:17px;letter-spacing:1px;">TRS QUANTUM BOT</b>' +
                              '<div id="trs-close-btn-2" style="background:#112211;border:1px solid #00ff66;color:#00ff66;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;cursor:pointer;font-size:13px;">✕</div>' +
                              '</div>' +
                              '<div style="font-size:11px;color:#00e5ff;margin-bottom:6px;background:rgba(0,229,255,0.1);padding:4px;border-radius:4px;">Market: <b>' + currentMarket + '</b></div>' +
                              '<div style="display:flex;justify-content:space-between;font-size:10px;color:#aaa;background:rgba(255,255,255,0.05);padding:5px 8px;border-radius:5px;margin-bottom:8px;">' +
                              '<span>Time: <b>1M</b></span>' +
                              '<span>Mode: <b style="color:#00ff66;">VIP AI</b></span>' +
                              '<span>Acc: <b style="color:#00ff66;">96.4%</b></span>' +
                              '</div>' +
                              '<div style="font-size:10px;color:#888;letter-spacing:1px;margin-bottom:2px;">P R E M I U M &nbsp; S I G N A L</div>' +
                              '<div style="font-size:32px;font-weight:900;margin:10px 0;color:' + sigColor + ';text-shadow:0 0 25px ' + sigColor + ';letter-spacing:3px;">' + sigText + '</div>' +
                              '<div style="font-size:12px;color:#aaa;margin-bottom:10px;">Action: <b style="color:' + sigColor + ';font-size:13px;">' + subText + '</b></div>' +
                              '<div style="font-size:10px;color:#666;margin-top:4px;">User: <b style="color:#888;">@trs VIP</b></div>';

                document.getElementById('trs-close-btn-2').onclick = function() {
                    c.remove();
                };
            }, 3200);
        });
    }
})();
