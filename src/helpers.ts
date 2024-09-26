export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function onDomContentLoaded() {

    return new Promise<void>((resolve) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                resolve();
            });
        } else {
            resolve();
        }
    });
}

export function setInputFilter(textbox: Element, inputFilter: (value: string) => boolean, errMsg: string) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }

                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}


export function setInputFilterWithWhitespaces(
    textbox: Element,
    inputFilter: (value: string) => boolean,
    errMsg: string
) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }

                this.value = numberWithSpaces(this.value.replaceAll(" ", ""));
                this.oldValue = numberWithSpaces(this.value.replaceAll(" ", ""));
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}

export function determineSexType(fio) {
    const femaleEndings = ['овна', 'евна', 'ична', 'ова', 'ева', 'ина', 'ая', 'яя', 'екая', 'цкая'];

    function hasEnding(word, endings) {
        return endings.some(ending => word.endsWith(ending));
    }

    const isFemale = hasEnding(fio[1], femaleEndings) || hasEnding(fio[2], femaleEndings);

    return isFemale ? "ая" : "ый";
}

export function formatNumberWithSpaces(amount) {
    amount = '' + amount;
    var numbersOnly = amount.replaceAll(" ", "");
    return numbersOnly.replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
}
