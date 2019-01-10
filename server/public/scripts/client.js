console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveKoala); 
  $( '#viewKoalas' ).on( 'click', '.delete-button', deleteKoalas);
  $('#viewKoalas').on('click','.ready-button',setReady);

}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then(function (response) {
    const listOfKoalas = response;
    $('#viewKoalas').empty();
    for (koala of listOfKoalas) {
      
      $('#viewKoalas').append(`<tr>
                                <td>${koala.name}</td>
                                <td>${koala.gender}</td>
                                <td>${koala.age}</td>
                                <td>${koala.ready_to_transfer}</td>
                                <td>${koala.notes}</td>
                                <td>
                                  <button class="ready-button" 
                                  data-koalaid="${koala.id}"
                                  id="${koala.id}">Ready For Transfer</button>
                                </td>
                                <td>
                                  <button class="delete-button"
                                  data-koalaid="${koala.id}">Delete</button>
                                </td>
                              </tr>`);
      if (koala.ready_to_transfer){
        $(`#${koala.id}`).css('visibility', 'hidden');
      }; 
      
    }
    
    
  }).catch(function (error) {
    console.log('Returning this error:', error);
    
  })
} // end getKoalas  

function saveKoala(){
  // ajax call to server to get koalas
 const koalaToSend = { 
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
 };
 console.log(`currently in koalaToSend ${koalaToSend}`);
 $.ajax({
  method: 'POST',
  url: '/koalas',
  data: koalaToSend
}).then(function(result) {
  console.log(result);
  getKoalas();
}).catch(function (error){
  console.log(`error in Post /koalas ${error}`);
});


}

function deleteKoalas() {
  console.log($(this).data('koalaid'));
  const koalaid = $(this).data('koalaid');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaid}`
  }).then(function (response) {
    getKoalas();
  }).catch(function (error) {
    alert('Oh, nope, koala stayed');
    console.log('in delete:', error);
    
  });
  
}

function setReady(){
  console.log($(this).data('koalaid'));
  const koalaid = $(this).data('koalaid');
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaid}`
  }).then(function (response) {
    getKoalas();
  }).catch(function (error) {
    alert('This koala is not ready yet');
    console.log('in setReady:', error);  
  });
}