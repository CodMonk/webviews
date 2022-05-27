window.addEventListener('message', function(eventData) {
    if(eventData.data == 'VCMM') {
            document.getElementById('ymIframe').contentWindow.postMessage({
                event_code: 'ym-client-event',
                data: {
                    event: {
                     code: "VCMM",
                     data: ""
                    }
                }
           }, '*');
           return;
        }

});
