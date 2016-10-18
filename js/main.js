$(document).ready(function () {

// FETCHING API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  $('#categorySelect').heapbox({'onChange': function () {

    $('.menu').addClass('headerShrink');
    $('.loading').show();

    var select = $('select').val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + select + ".json";
    url += '?' + $.param({
      'api-key': "323a596153c34f5bb7b9b12f4b1f396b"
    })

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function (data) {
      console.log(data);
      var newsData = '';
      var apiData = data.results.filter(function(value) {
        return value.multimedia.length >= 5;
      })

      apiData.splice(12);

// GOING THRU EACH ARRAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      $.each(apiData, function (key, value) {
        
        var apiMedia = value.multimedia;
        var abstract = value.abstract;
        var apiUrl = value.url;

        newsData += '<li>';
        newsData += '<a href="'+apiUrl+'">'
        newsData += '<div class="articleBox" style="background-image:url('+apiMedia[4].url+')";>';
        newsData += '<p class="articleAbstract">'+abstract+''
        newsData += '</p></div></a></li>'
        
        $('.topNews').html(newsData);
      });

    }).fail(function (err) {
      throw err;

    })

// HIDING THE LOGO @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    .always(function() {
      $('.loading').hide();
    })

  } });
});



