function printUsers(){
    $.getJSON("database/users.json", function(json) {
        var s = "";
        $.each(json, function( key, val ) {
            var openMirror="openMirror("+key+")";
            var openConfig="openConfig("+key+")";
            var openPatternLock="openPatternLock("+key+")";
            //s +="<button onclick='"+fct+"' class='btn btn-primary btn-lg' role='button'>" + val.firstname + "</button><br/><br/>";
            s += "<div class='thumbnail hvr-glow'>";
            s += "<div onclick='"+openPatternLock+"'>";
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
    form.setAttribute('action', "../mirror.php");
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

function openPatternLock(uid){
    var isPatternSet = false;
    var pattern = "";

    $.getJSON("database/users.json", function (data) {
        //retreive original top & left values
        $.each(data, function (key, val) {
            if (key == uid && val["patternLock"] != "") {
                pattern = val["patternLock"];
            }
        });
        //if pattern has not been set
        if (pattern == "") {
            var form = document.createElement('form');
            form.setAttribute('action', "patternLock/setPatternLock.php");
            form.setAttribute('method', 'post');
            var inputvar = document.createElement('input');
            inputvar.setAttribute('type', 'hidden');
            inputvar.setAttribute('name', 'uid');
            inputvar.setAttribute('value', uid);
            form.appendChild(inputvar);

            document.body.appendChild(form);
            form.submit();
        }
        //if pattern has already been set
        else {
            var form = document.createElement('form');
            form.setAttribute('action', "patternLock/patternLock.php");
            form.setAttribute('method', 'post');
            var inputUid = document.createElement('input');
            inputUid.setAttribute('type', 'hidden');
            inputUid.setAttribute('name', 'uid');
            inputUid.setAttribute('value', uid);
            form.appendChild(inputUid);
            var inputPattern = document.createElement('input');
            inputPattern.setAttribute('type', 'hidden');
            inputPattern.setAttribute('name', 'pattern');
            inputPattern.setAttribute('value', pattern);
            form.appendChild(inputPattern);

            document.body.appendChild(form);
            form.submit();
        }
    });
}