$(document).ready(function () {

$('#newsSearch').on('change', function() {
   $('.menu').addClass('headerShrink');
});


// $('#newsSearch').addClass('headerShrink');


  $('#newsSearch').on('change', function (event) {
    var select = $('select').val();
    event.preventDefault();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + select + ".json";
    url += '?' + $.param({
      'api-key': "323a596153c34f5bb7b9b12f4b1f396b"
    })

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function (data) {
      console.log(data);
      var apiData = data.results;
      var newsData = '';

      
      $.each(apiData, function (key, value) {
        
        var apiMedia = value.multimedia;
        var abstract = value.abstract;
        var apiUrl = value.url;
        
        if (apiMedia.length > 0) {

        newsData += '<li>';
        newsData += '<a href="'+apiUrl+'">'
        newsData += '<div class="articleBox" style="background-image:url('+apiMedia[4].url+')";>';
        newsData += '<p class="articleAbstract">'+abstract+''
        newsData += '</p></div></a></li>'
        
        }
        $('.topNews').html(newsData);
      });




    }).fail(function (err) {
      throw err;

    })
  });
});



