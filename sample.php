function convertAddress( address, callback, item ) {
  geocoder.geocode( { 
    'address' : address 
  }, function(results, status) {
    if ( status == google.maps.GeocoderStatus.OK ) {
      callback( results[0].geometry.location );
      cords = [ results[0].geometry.location.lat(), results[0].geometry.location.lng() ];
      $.post( jobifySettings.ajaxurl, { action : 'jobify_cache_cords', cords : cords, job : item.job } );
    } else alert("Geocode failed, status: "+status);
  });
}