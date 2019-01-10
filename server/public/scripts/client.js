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
  const nameIn = $('#nameIn').val();
  const ageIn = $('#ageIn').val();
  const genderIn = $('#genderIn').val();
  let readyForTransferIn = $('#readyForTransferIn').val();
  const notesIn = $('#notesIn').val();

  if (!nameIn) {
    alert('Please provide a name for the new koala.');
  } else if (!ageIn) {
    alert('Please provide an age for the new koala.');
  } else if (!genderIn) {
    alert('Please provide a gender for the new koala.');
  } else {
    if (!readyForTransferIn) {
      readyForTransferIn = 'false';
    }
    const koalaToSend = { 
      name: nameIn,
      age: ageIn,
      gender: genderIn,
      ready_to_transfer: readyForTransferIn,
      notes: notesIn
    };
    console.log(`Currently in koalaToSend ${koalaToSend}`);
    $.ajax({
      method: 'POST',
      url: '/koalas',
      data: koalaToSend
    }).then(function(result) {
      console.log(result);
      getKoalas();
      clearInputs();
    }).catch(function (error){
      console.log(`error in Post /koalas ${error}`);
    });
  }
}

// Clear all input fields
function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
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