var datepickers = [].slice.call(document.querySelectorAll('[data-datepicker]'))
var datepickersList = datepickers.map(function (el) {
    return new Datepicker(el, {
        buttonClass: 'btn'
    });
});