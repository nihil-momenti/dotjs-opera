function onMessage(event) {
    var message = event.data;

    if (message.topic == 'LoadJS') {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status < 200 || this.status >= 300) {
                    return opera.postError("Can't read " + path);
                }

                event.source.postMessage({
                    topic: 'LoadedJS',
                    js:    req.responseText,
                    path:  message.path
                });
            }
        };
        req.open('GET', message.path, false);
        req.send(null);
    }
}

window.addEventListener('DOMContentLoaded', function() { opera.extension.onmessage = onMessage; }, false);
