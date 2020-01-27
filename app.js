$(document).ready(function ($) {

    function getLocation() {
        $.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
            let latitude = data.iss_position.latitude;
            let longitude = data.iss_position.longitude;
            setLocation(latitude, longitude);
            initMap(latitude, longitude);
        });
    }

    getLocation();
    setInterval(getLocation, 5000);

    function setLocation(latitude, longitude) {
        console.log(latitude, longitude);
        $('#longtitude').text(longitude);
        $('#latitude').text(latitude);
    }

    function initMap(latitude, longitude) {
        let myLatLng = {
            lat: Number(latitude),
            lng: Number(longitude)
        };

        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }

    function getDate() {
        let date = new Date();

        let utcTime;
        let utcDate;

        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();

        let dd = date.getUTCDate();
        let mm = date.getUTCMonth() + 1;
        let yyyy = date.getUTCFullYear();

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        utcTime = hours + ':' + minutes;
        utcDate = dd + '.' + mm + '.' + yyyy;

        setDate(utcTime, utcDate);
    }

    getDate();
    setInterval(getDate, 5000);

    function setDate(utcTime, utcDate) {
        console.log(utcTime, utcDate);
        $('#time').text(utcTime);
        $('#date').text(utcDate);
    }

    function getPeople(callback) {
        $.getJSON('http://api.open-notify.org/astros.json?callback=?', function (data) {

            let people = data.people.filter(function (man) {
                return man.craft === 'ISS';
            });

            if (callback && typeof callback === 'function') {
                callback(people);
            }

            console.log(people);
        });

    }

    function setPeople(people) {
        $('#astronames').text('');

        $('#number').text(people.length);

        console.log(people.length);

        people.forEach(function (man) {
            $('#astronames').append('<li class="list-group-item">' + man.name + '</li>');
        });

    }

    getPeople(setPeople);
    setInterval(getPeople, 5000, setPeople);
});