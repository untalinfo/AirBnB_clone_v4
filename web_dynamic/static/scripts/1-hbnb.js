$(document).ready(function () {
  let list_check = {};
  $('li input[type="checkbox"]').change(function () {
    if ($(this).is(":checked")){
      list_check[$(this).data("id")] = $(this).data("name")
  } else {
      delete list_check[$(this).data("id")]
      console.log(list_check)
      console.log('no check')
  }
      const values = Object.values(list_check)
      const list = values.join(', ')
      const short = list.slice(0, 30)
      console.log(short)
      $('.amenities h4').text(short + '...')
      if (values.length === 0) $('.amenities h4').html('&nbsp;');
  })})
