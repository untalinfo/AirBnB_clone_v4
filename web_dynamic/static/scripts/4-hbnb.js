$(document).ready(() => {
  /* Checkbox for amenities */
  const amenityDict = {};
  const urlhost = 'http://127.0.0.1';
  const porthost = ':5001'; /* :37297 for contaninersi */

  const listCheck = {};
  $('li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      listCheck[$(this).data('id')] = $(this).data('name');
    } else {
      delete listCheck[$(this).data('id')];
    }
    const values = Object.values(listCheck);
    const list = values.join(', ');
    const short = list.slice(0, 30);
    $('.amenities h4').text(short + '...');
    if (values.length === 0) $('.amenities h4').html('&nbsp;');
  });
  const url = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(url, function (info) {
    if (info.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  /* End Request for status api */
  /* Show places dynamic mode wit filter */
  ajaxCall1();

  function ajaxCall1() {
    $.ajax({
      type: 'POST',
      url: urlhost + porthost + '/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(listCheck) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function(places) {
        $.ajax({
          type: 'GET',
          url: urlhost + porthost + '/api/v1/users/',
          data: '{}',
          dataType: 'json',
          contentType: 'application/json',
          success: function (users) {
            setinfo(places, users);
          }
        });
      }
    });
  }

  function setinfo(places, users) {
    let myuser = '';
    places.forEach(place => {
      myuser = '';

      users.forEach(user => {
        if (user.id === place.user_id) {
          myuser = user.first_name + ' ' + user.last_name;
        }
      });

      const s = (place.max_guest !== 1) ? 's' : '';
      const s2 = (place.number_rooms !== 1) ? 's' : '';
      const s3 = (place.number_bathrooms !== 1) ? 's' : '';
      const html = `<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${s}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${s2}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${s3}</div>
      </div>
      <div class="user">
        <b>Owner:</b> ${myuser} 
      </div>
      <div class="description">
        ${place.description}
      </div>
      </article>`;
      $('.places').append(html);
    });
  }

  $('button').click(function (e) {
    e.preventDefault();
    $('article').remove();
    ajaxCall1();
  });
  /* End Show places dynamic mode with filter */
});
