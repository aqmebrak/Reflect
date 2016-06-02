function printUsers(){
    $.getJSON("database/users.json", function(json) {
        var s = "";
        $.each(json.user, function( key, val ) {
            var fct="openMirror("+val.id+")";
            s+="<button onclick='"+fct+"' class='btn btn-primary btn-lg' role='button'>" + val.firstname + "</button><br/><br/>";
        });
        $("#users").html(s+"</ul>");
    });
}

function openMirror(uid)
{
    var form = document.createElement('form');
    form.setAttribute('action', "mirror.php");
    form.setAttribute('method', 'post');
        var inputvar = document.createElement('input');
        inputvar.setAttribute('type', 'hidden');
        inputvar.setAttribute('name', 'uid');
        inputvar.setAttribute('value', uid);
        form.appendChild(inputvar);

    document.body.appendChild(form);
    form.submit();
}
