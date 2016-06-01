
function printUsers(){
    $.getJSON("database.json", function(json) {
        console.log(json); // this will show the info it in firebug console
        var s = "<ul>";
        $.each(json.user, function( key, val ) {
            s+="<li id='" + val.id + "'>" + val.firstname + "</li>";
        });
        $("#users").html(s+"</ul>");
    });
}