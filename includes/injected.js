window.addEventListener('DOMContentLoaded',
        function() {
            var getjs = function (path, callback) {
                var onJS = function (event) {
                    var message = event.data;
                    if (message.topic === 'LoadedJS' && message.path === path) {
                        opera.extension.removeEventListener('message', onJS, false);
                        callback(message.js)
                    }
                }
                opera.extension.addEventListener('message', onJS, false);
                opera.extension.postMessage({
                    topic: 'LoadJS',
                    path: path
                });
            }

            var dotjs = function ($) {
                getjs(
                    'http://localhost:3131/' + window.location.hostname.replace('www.','') + '.js',
                    function (js) { $(function() { eval(js) }) }
                );
            }

            if (!window.jQuery) {
                getjs(
                    "http://code.jquery.com/jquery-1.7.1.min.js",
                    function (js) { eval(js); window.jQuery.noConflict()(dotjs); }
                );
            } else {
                window.jQuery(dotjs);
            }
        },
        false);
