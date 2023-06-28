$(document).ready(function() {
    // Fetch city data from the database
    $.ajax({
      url: 'proxy.php',
      type: 'GET',
      dataType: 'html',
      success: function(response) {
        var cities = [];
        
        // Extract city names from the Wikipedia page
        $(response).find('.wikitable.sortable tbody tr').each(function() {
          var city = $(this).find('td:nth-child(2)').text().trim();
          cities.push(city);
        });
        
        // Populate the dropdown with city names
        var dropdown = $('#cityDropdown');
        $.each(cities, function(index, city) {
          dropdown.append($('<option></option>').text(city));
        });
      }
    });
    
    // Handle text field input changes
    $('#cityInput').on('input', function() {
      var input = $(this).val().trim().toLowerCase();
      
      // Filter the dropdown options based on the user input
      $('#cityDropdown option').each(function() {
        var city = $(this).text().toLowerCase();
        
        if (city.indexOf(input) === 0) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
    
    // Handle city selection from the dropdown
    $('#cityDropdown').on('change', function() {
      var selectedCity = $(this).val();
      
      // Make an AJAX request to retrieve city information
      $.ajax({
        url: 'php.php',
        type: 'GET',
        dataType: 'html',
        success: function(response) {
          $(response).find('.wikitable.sortable tbody tr').each(function() {
            var city = $(this).find('td:nth-child(2)').text().trim();
            
            if (city === selectedCity) {
              var rank = $(this).find('td:nth-child(1)').text().trim();
              var population2011 = $(this).find('td:nth-child(3)').text().trim();
              var population2001 = $(this).find('td:nth-child(4)').text().trim();
              var state = $(this).find('td:nth-child(5)').text().trim();
              
              // Display the city information on the webpage
              $('#cityRank').text('Rank: ' + rank);
              $('#cityPopulation2011').text('Population (2011): ' + population2011);
              $('#cityPopulation2001').text('population (2001):' + population2001);
              $('#cityState').text('State or Union Territory: ' + state);
            
              return false; // Stop iterating after finding the selected city
            }
          });
        }
      });
    });
  });