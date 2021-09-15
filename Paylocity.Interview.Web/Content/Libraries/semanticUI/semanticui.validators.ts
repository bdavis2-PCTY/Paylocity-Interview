$.fn.form.settings.rules.phone = (value) => {
    //https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    2086662211
    return phonePattern.test(value);
}
