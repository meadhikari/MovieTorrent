$(document).ready(function(){var e="<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td><td>{9}</td></tr>";$("#keyword").keyup(function(){keyword=$("#keyword").val();if(keyword.length!==0){$("#ajax-loader")[0].style.visibility="visible";$.getJSON("http://yts.re/api/list.json?keywords="+keyword,function(t){$("#table_content").html("");if(!t.error){$.each(t.MovieList,function(t,n){name=n.MovieTitleClean;imdb="<a target='_blank' href='"+n.ImdbLink+"'>"+n.MovieRating+"</a>";magnetic_link="<a href='"+n.TorrentMagnetUrl+"'><img src='img/magnet.png' title='Magnetic link' alt='magnetic link'></a>";torrent_link="<a href='"+n.TorrentUrl+"'><img src='img/download.png' title='Download Torrent link' alt='torrent link'></a>";trailer="<a class='trailer' href='#' id="+n.MovieID+" ><img src='img/tailer.png' height='16' width='16' title='View Trailer' alt='torrent link'></a>";desc="<a class='description' href='#' id="+n.MovieID+" ><img src='img/more.png' height='16' width='16' title='Show Description' alt='torrent link'></a>";amzn="<a target='_blank' href='http://www.amazon.com/s/ref=nb_ss_d?tag=httpmeadhgith-20&url=search-alias%3Ddvd&field-keywords="+n.MovieTitleClean+"'><img src='img/amzn.png' title='Just Buy if you can' alt='buy from amazon' height='16' width='16'></a>";$("#table_content").append(e.format(name,imdb,n.MovieYear,n.Quality,n.Size,trailer,magnetic_link,torrent_link,amzn,desc))});$("#ajax-loader")[0].style.visibility="hidden"}else{$("#table_content").html("")}})}else{$("#table_content").html("")}});$(document.body).on("click",".description",function(){var e=this;$("#ajax-loader")[0].style.visibility="visible";$.getJSON("http://yts.re/api/movie.json?id="+this.id,function(e){$("#movie_title")[0].innerHTML=e.MovieTitleClean;$("#description")[0].innerHTML=e.LongDescription;$("#poster")[0].src=e.LargeCover;$("#runtime")[0].innerHTML="<strong>Runtime:</strong> "+e.MovieRuntime+" minutes";$("#genre")[0].innerHTML="<strong>Genre:</strong> "+e.Genre1+", "+e.Genre2;$("#language")[0].innerHTML="<strong>Language:</strong> "+e.Language;$("#rating")[0].innerHTML="<strong>IMDB:</strong> "+"<a target='_blank' href='"+e.ImdbLink+"'>"+e.MovieRating+"/10</a>";if(e.Subtitles!=="YIFY"){$("#subtitle")[0].innerHTML="<strong>Subtitle:</strong> "+e.Subtitles}$("#myModal").modal({show:true});$("#ajax-loader")[0].style.visibility="hidden"})});$(document.body).on("click",".trailer",function(){var e=this;$("#ajax-loader")[0].style.visibility="visible";$.getJSON("http://yts.re/api/movie.json?id="+this.id,function(t){$(e).attr("href",t.YoutubeTrailerUrl);$.fancybox({padding:0,autoScale:false,transitionIn:"none",transitionOut:"none",title:this.title,width:$(window).width()>=640?$(window).width()/2.5:$(window).width()/3,height:$(window).width()>=640?$(window).height()/1.5:$(window).height()/2,href:e.href.replace(new RegExp("watch\\?v=","i"),"v/"),type:"swf",swf:{wmode:"transparent",allowfullscreen:"true"}});$("#ajax-loader")[0].style.visibility="hidden"})})});if(!String.prototype.format){String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return typeof e[n]!="undefined"?e[n]:t})}}