function copyPassword() {
    var passwordField = document.getElementById("generated-pass");
    passwordField.focus();
    passwordField.select();
    document.execCommand("copy");
}

$(document).ready(function() {
    $(".setting-item").click(function(event) {
        var isChecked = $(this).attr("ischeck") === "true";
        $(this).attr("ischeck", isChecked ? "false" : "true");
    });

    $(".show-setting-button").click(function(event) {
        var isOpen = $(this).attr("isopen") === "true";
        $(this).attr("isopen", isOpen ? "false" : "true");
        $(".setting-items-wrapper").slideToggle(1000);
    });

    $("#generated-pass").focus(function(event) {
        $("#generated-pass").select();
    });
});

jQuery.generateRandomPassword = function(length, useLowerCase, useUpperCase, useNumbers, useSpecialChars, useAmbiguous, usePersianChars) {
    length = length !== undefined ? length : 8;
    useLowerCase = useLowerCase === undefined ? true : useLowerCase;
    useUpperCase = useUpperCase === undefined ? true : useUpperCase;
    useNumbers = useNumbers === undefined ? true : useNumbers;
    useSpecialChars = useSpecialChars !== undefined && useSpecialChars;
    useAmbiguous = useAmbiguous !== undefined && useAmbiguous;
    usePersianChars = usePersianChars !== undefined && usePersianChars;

    var charSet = "";
    if (usePersianChars) charSet += "آابپتثجچ‌حخدذرز‌ژس‌شصضطظعغفقکگلمنوهی";
    if (useLowerCase) charSet += "abcdefghjkmnpqrstuvwxyz";
    if (useUpperCase) charSet += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (useNumbers) charSet += "23456789";
    if (useSpecialChars) charSet += "-_";
    if (useAmbiguous) charSet += "~!@#$%^&*()=+[]{};:,.<>/?";
    if (useLowerCase && useAmbiguous) charSet += "iol";
    if (useUpperCase && useAmbiguous) charSet += "IO";
    if (useNumbers && useAmbiguous) charSet += "01";
    if (useLowerCase || useNumbers || !useAmbiguous) charSet += "iolIO01";

    if (charSet === "") return "لطفا حداقل یک مورد را انتخاب کنید\n";

    var characters = charSet.split("");
    var password = "";
    for (var i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
};

$(function() {
    $("#generate").click(function(event) {
        var generatedPassword = $.generateRandomPassword(
            $(".length").val(),
            $("#AlphaLower").attr("ischeck") === "true",
            $("#AlphaUpper").attr("ischeck") === "true",
            $("#Num").attr("ischeck") === "true",
            $("#HypenDashUnderscore").attr("ischeck") === "true",
            $("#Special").attr("ischeck") === "true",
            $("#Ambiguous").attr("ischeck") === "true",
            $("#Persian").attr("ischeck") === "true"
        );

        $(".my-social-network").fadeIn(500);
        $("#generated-pass").val(generatedPassword);
        $("#tgicon").attr("href", "tg://msg?text=" + generatedPassword);
        $("#waicon").attr("href", "whatsapp://send?text=" + generatedPassword);
        event.preventDefault();
    });
});

$(".checkboxlist").on("click", "input:checkbox", function() {
    $(this).parent().toggleClass("checked_item", this.checked);
    $(this).parent().toggleClass("unchecked_item");
});

$("#alphalower_chars_checkbox").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
});
