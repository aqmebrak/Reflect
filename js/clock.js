function initClock(timezone) {
    var data =
    {
        title: 'Paris, FR',
        offset: timezone,
        dst: true,
        digital: true,
        analog: false,
        timeformat: 'hh:mm A',
        date: false,
        dateformat: 'MM/DD/YYYY',
        angleSec: 0,
        angleMin: 0,
        angleHour: 0,
        skin: 1,
        imgpath: ''
    }
    $('#clock_hou').jClocksGMT(data);
}   