/* Variables */
var SCREEN_NAME = ''

/* Logs */
const printLog = console.log

const printError = (message, title) => {
    if (title && contents) {
        printLog(`ERROR(${title || ''}): ${message || ''}`)
    } else if (contents) {
        printLog(`ERROR: ${message || ''}`)
    }
}

const printException = (e, message, title) => {
    if (e) {
        printLog(`EXCEPT(${e.name || ''}): ${e.message || ''}`)
        printError(message, title);
    }
}

/* Initial */
$(document).ready(function() {
    if (typeof onTCRCommonDocumentReady == 'function') {
        onTCRCommonDocumentReady()
    }

    if (typeof onTCRDocumentReady == 'function') {
        onTCRDocumentReady()
    }
})

window.onload = function() {
    if (typeof onTCRCommonLoad == 'function') {
        onTCRCommonLoad()
    }

    if (typeof onTCRLoad == 'function') {
        onTCRLoad()
    }
}

/* Event Handlers */
const onEventListener = jsonText => {
    let data = false
    try {
        data = JSON.parse(jsonText)
    } catch (e) {
        printException(e, 'JSON Error', 'callfromHost')
    }

    try {
        if (data) {
            if (typeof onTCRCommonListener == 'function') {
                onTCRCommonListener(data)
            }

            if (typeof onTCREventListener === 'function') {
                SCREEN_NAME = data.screen_name
                onTCREventListener(data)
            } else {
                printError('Listener is not defined')
            }
        }
    } catch (e) {
        printException(e, 'Listener Error', 'callfromHost')
    }
}

const sendEvent = data => {
    const webhost = window?.chrome?.webview?.hostObjects?.webhost

    if (webhost && (typeof data === 'object')) {
        try {
            const jsonText = JSON.stringify(data)
            webhost.callWebhost(jsonText)

            // printLog("callWebhost", jsonText)
        } catch (e) {
            // printException(e, data)
        }
    } else {
        printError('Data format is invalid')
    }
}

/* String */
String.prototype.format = function() {
    var formatted = this
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi')
        formatted = formatted.replace(regexp, arguments[i])
    }
    return formatted
}

String.prototype.toCache = function() {
    const matches = this.match(/\d+$/)
    return matches ? matches[0] : 0
}

String.prototype.comma = function() {
    return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

String.prototype.uncomma = function() {
    return this.replace(/[^\d]+/g, '');
}

Array.prototype.toText = function() {
    return this.join("\n")
}

/* Common Interface */
function callfromHost(data) {
    // printLog('callfromHost', data)
    onEventListener(data)
}

function sendTCREvent(data) {
    // printLog('sendTCREvent', data)
    sendEvent(data)
}

/* Long click */
(function ($) {
    $.fn.longClick = function (callback, timeout) {
        $(this).mousedown(function (event) {
            event.preventDefault()

            var initialEvent = event
            var timer = window.setTimeout(function () { callback(initialEvent) }, timeout)

            $(document).mouseup(function (event) {
                window.clearTimeout(timer)
                $(document).unbind("mouseup")
                return true
            })

            // $(document).mouseout(function (event) {
            //     window.clearTimeout(timer)
            //     $(document).unbind("mouseout")
            //     return true
            // })

            return true
        })
    }
})(jQuery)