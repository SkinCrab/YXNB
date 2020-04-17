(function() {
    'use strict';
    var editor = document.getElementById('editor');
    editor.addEventListener('keyup', encode, false);
    editor.addEventListener('click', encode, false);
    editor.addEventListener('paste', function(){setTimeout(encode, 0)}, false);
    var result = document.getElementById('result');
    result.addEventListener('keyup', decode, false);
    result.addEventListener('click', decode, false);
    result.addEventListener('paste', function(){setTimeout(decode, 0)}, false);

    var fail_decode = 'Failed to decode.';
    var fail_encode = 'Failed to encode.';

    function str2rc(str) {
        if (str === '') return '';
        return rcnb.encode(new TextEncoder('utf-8').encode(str));
    }

    function rc2str(str) {
        if (str === '') return '';
        return new TextDecoder("utf-8").decode(rcnb.decode(str.trim()));
    }

    var oldValue = ['', ''];
    function decode(e) {
        if (result.value === fail_encode || result.value === oldValue[0]) return;
        oldValue[0] = result.value;
        try {
            editor.value = rc2str(result.value);
        } catch(e) {
            editor.value = fail_decode;
        }
    }

    function encode(e) {
        if (editor.value === fail_decode || editor.value === oldValue[1]) return;
        oldValue[1] = editor.value;
        try {
            result.value = str2rc(editor.value);
        } catch(e) {
            result.value = fail_encode;
        }
    }

    encode();
    (function() {
        var startX, startY, startWidth, startHeight, startHeight2, resizableElement = document.querySelector('.ui-editor'), resizableElement2 = document.querySelector('.ui-aside'), resizer = document.querySelector('.ui-resizer'), doDrag = function(e) {
            if (window.getComputedStyle(resizer).height == '1px') {
                var y = startHeight + e.clientY - startY;
                y = y > 5 ? y : 5;
                resizableElement.style.width = '';
                resizableElement.style.height = y + 'px';
                resizableElement2.style.height = (startHeight2 - y) + 'px'
            } else {
                var x = startWidth + e.clientX - startX;
                x = x > 5 ? x : 5;
                resizableElement.style.width = x + 'px';
                resizableElement.style.height = '';
                resizableElement2.style.height = ''
            }
        }, stopDrag = function(e) {
            document.removeEventListener('mousemove', doDrag, false);
            document.removeEventListener('mouseup', stopDrag, false);
            resizer.classList.remove('resizing')
        };
        resizer.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(resizableElement).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(resizableElement).height, 10);
            startHeight2 = parseInt(window.innerHeight);
            this.classList.add('resizing');
            document.addEventListener('mousemove', doDrag, false);
            document.addEventListener('mouseup', stopDrag, false)
        }, false);
        window.addEventListener('resize', function() {
            resizableElement.style.width = '';
            resizableElement.style.height = '';
            resizableElement2.style.height = ''
        }, false)
    }
    )();
}
)();