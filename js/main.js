$(document).ready(function () {
       
		var rowTemplate = "<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td></tr>";

		$('#keyword').keyup(function () {
			
       		// text area changed
       		keyword = $("#keyword").val()
       		if (keyword.length !== 0) {

                            $('#ajax-loader')[0].style.visibility="visible"
       			//there is something in the textbox
       			$.getJSON( "http://yts.re/api/list.json?keywords="+keyword ,function( data ) {
                                   
       				$("#table_content").html("")
       				
       				if (!data.error)
       				{
       				$.each(data.MovieList, function( index, value ) {
       					name = value.MovieTitleClean
       					imdb = "<a target='_blank' href='"+value.ImdbLink+"'>"+value.MovieRating+"</a>"
       					magnetic_link = "<a href='"+value.TorrentMagnetUrl+"'><img src='img/magnet.png' title='Magnetic link' alt='magnetic link'></a>"
       					torrent_link = "<a href='"+value.TorrentUrl+"'><img src='img/download.png' title='Download Torrent link' alt='torrent link'></a>"
                                          trailer = "<a class='trailer' href='#' id="+value.MovieID+" ><img src='img/tailer.png' height='16' width='16' title='View Trailer' alt='torrent link'></a>"
                                          desc = "<a class='description' href='#' id="+value.MovieID+" ><img src='img/more.png' height='16' width='16' title='Show Description' alt='torrent link'></a>"
       					
       					$("#table_content").append(rowTemplate.format(name,imdb,value.MovieYear,value.Quality,value.Size,trailer,magnetic_link,torrent_link,desc))
       					
       				});
                                   $('#ajax-loader')[0].style.visibility="hidden";
       				
       				}
       				else
       				{
       					$("#table_content").html("")		
       				}

       			});
       		}
       		else
       		{
       			//there is nothing currenlt in the textbox
       			$("#table_content").html("")
       		}
       		


       	});

       $(document.body).on('click',".description",function(){
              var that = this;
              $('#ajax-loader')[0].style.visibility="visible"
              $.getJSON( "http://yts.re/api/movie.json?id="+this.id ,function( data ) {
                     
              $('#movie_title')[0].innerHTML = data.MovieTitleClean
              $('#description')[0].innerHTML = data.LongDescription
              $('#poster')[0].src = data.LargeCover
              $('#runtime')[0].innerHTML = "<strong>Runtime:</strong> "+ data.MovieRuntime+ " minutes"
              $('#genre')[0].innerHTML = "<strong>Genre:</strong> "+data.Genre1+", "+data.Genre2
              $('#language')[0].innerHTML = "<strong>Language:</strong> "+data.Language
              $('#rating')[0].innerHTML = "<strong>IMDB:</strong> "+"<a target='_blank' href='"+data.ImdbLink+"'>"+data.MovieRating+"/10</a>"
              if (data.Subtitles !== "YIFY"){
                     $('#subtitle')[0].innerHTML = "<strong>Subtitle:</strong> "+data.Subtitles
              }
              $('#myModal').modal({show:true})       
              $('#ajax-loader')[0].style.visibility="hidden"
              });
              
       })
       
       $(document.body).on('click',".trailer",function(){
              var that = this;
              $('#ajax-loader')[0].style.visibility="visible"
              $.getJSON( "http://yts.re/api/movie.json?id="+this.id ,function( data ) {
                     $(that).attr("href",data.YoutubeTrailerUrl)
                   $.fancybox({
                     'padding'            : 0,
                     'autoScale'          : false,
                     'transitionIn'       : 'none',
                     'transitionOut'      : 'none',
                     'title'                     : this.title,
                     'width'                     : 640,
                     'height'             : 385,
                     'href'               : that.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                     'type'               : 'swf',
                     'swf'                : {
                     'wmode'                            : 'transparent',
                     'allowfullscreen'    : 'true'
                     }
                     
              });
                   $('#ajax-loader')[0].style.visibility="hidden"
       });
              
})
});