$(document).ready(function() {
    $('#accordion').accordion({collapsible: true});
    $('#tabs').tabs({collapsible: true});

    var availableTags = [
    "ActionScript",
"AppleScript",
"Asp",
"BASIC",
"C",
"C++",
"Clojure",
"COBOL",
"ColdFusion",
"Erlang",
"Fortran",
"Groovy",
"Haskell",
"Java",
"JavaScript",
"Lisp",
"Perl",
"PHP",
"Python",
"Ruby",
"Scala",
"Scheme"
    ];
$( "#tags" ).autocomplete({
    source: availableTags
});
});
