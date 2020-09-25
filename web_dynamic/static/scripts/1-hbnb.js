$(document).ready(function () {
  let list_check = [];
  ids = $(("input[type='checkbox']").prop("data-id"));
  console.log(ids);
  if($("input[type='checkbox']").is(":checked")){
    list_check.push(ids);
  } else {
    console.log('no check')
  }
});