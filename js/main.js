$(document).ready(function () {

// FETCHING API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  $('#categorySelect').heapbox({'onChange': function () {

    $('.menu').addClass('headerShrink');
    $('.loading').show();

    let select = $('select').val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + select + ".json";
    url += '?' + $.param({
      'api-key': "323a596153c34f5bb7b9b12f4b1f396b"
    })
// filtering the articles with images
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function (data) {
      console.log(data);
      let newsData = '';
      let apiData = data.results.filter(function(value) {
        return value.multimedia.length >= 5;
      })

// Splicing article to 12
      apiData.splice(12);

// GOING THRU EACH ARRAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      $.each(apiData, function (key, value) {
        
        let apiMedia = value.multimedia;
        let abstract = value.abstract;
        let apiUrl = value.url;

        newsData += '<li>';
        newsData += '<a href="'+apiUrl+'">'
        newsData += '<div class="articleBox" style="background-image:url('+apiMedia[4].url+')";>';
        newsData += '<p class="articleAbstract">'+abstract+''
        newsData += '</p></div></a></li>'
        
        $('.topNews').html(newsData);
      });

    }).fail(function () {
      
      $('.newsApi').append('<p> Sorry Try Again </p>');

    })

// HIDING THE LOGO @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    .always(function() {
      $('.loading').hide();
    })

  } });
});



