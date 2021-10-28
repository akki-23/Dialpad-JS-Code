let btn = document.querySelectorAll('button'),
    input = document.querySelector('input'),
    busy = true,
    hold,
    isBusy,
    delay = 800,
    change = -1,
    click = null;
    // loop for the 
for (let i = 0, len = btn.length; i < len; ++i) {
    btn[i].onmousedown = function (e) {
        let text = this.getAttribute('data-text').split(""),
            number = this.getAttribute('data-number');
        busy = true;
        clearTimeout(isBusy);
        if (click !== e.target) {
            busy = false;
        }
        if (change >= text.length - 1 || click !== e.target) {
            change = 0;
            click = e.target;
        } else {
            change = change + 1;
        }
        if (text[0] === '#') {
            input.value = input.value.slice(0, -1);
            hold = setTimeout(function () {
                input.value = "";
            }, delay);
            return;
        }
        hold = setTimeout(function () {
            input.value = input.value.slice(0, -1) + number;
        }, delay);
        input.value = busy ? input.value.slice(0, -1) + text[change] : input.value + text[change];
    };
    btn[i].onmouseup = function (e) {
        clearTimeout(hold);
        busy = true;
        isBusy = setTimeout(function () {
            change = -1;
            busy = false;
            e.target = null;
        }, delay);
        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length;
    };
}