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
                                  <button class="ready-button">Ready For Transfer</button>
                                </td>
                                <td>
                                  <button class="delete-button">Delete</button>
                                </td>
                              </tr>`)
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
