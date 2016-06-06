function printUsers(){
    $.getJSON("database/users.json", function(json) {
        var s = "";
        $.each(json.user, function( key, val ) {
            var openMirror="openMirror("+val.id+")";
            var openConfig="openConfig("+val.id+")";
            //s +="<button onclick='"+fct+"' class='btn btn-primary btn-lg' role='button'>" + val.firstname + "</button><br/><br/>";
            s += "<div class='thumbnail hvr-glow'>";
            s += "<div onclick='"+openMirror+"'>";
            s += "<img class='temp' src='images/user.png'>";
            s += "<div class='caption'>";
            s += "<h3>"+val.firstname+"</h3>";
            s += "</div>";
            s += "</div>";
            s += "<button role='button' onclick='"+openConfig+"' class='btn btn-default'>Configure</button>";
            s += "</div>";
        });
        $('.row').html(s);
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

function openConfig(uid){
    var form = document.createElement('form');
    form.setAttribute('action', "config/weather-config.php");
    form.setAttribute('method', 'post');
    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'uid');
    inputvar.setAttribute('value', uid);
    form.appendChild(inputvar);

    document.body.appendChild(form);
    form.submit();
}