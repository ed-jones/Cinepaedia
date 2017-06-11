function display(div,type,imdb)
{
  document.getElementById(div).style.display=type;
  if (div='entry')
    {
      search(null,imdb);
      document.getElementById('darkenBackground').style.display='block';
    }
}

function closeWindow()
{
  document.getElementById('entry').style.display='none';
  document.getElementById('darkenBackground').style.display='none';
}
function search(action,id)
{
  var request;
  request = false;
if (action == search)
  {
    document.getElementById('loading').style.display='block';
  var query = document.searchForm.search.value;
  for (i = 0; i < query.length; i++)
    {
      query = query.replace(" ","+");
    }
  }

    if (window.XMLHttpRequest){
      try{
        request = new XMLHttpRequest();
      }
      catch(e){
        try{
          request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e){
          request = false;
        }
      }
    }

    if(request){
      request.onreadystatechange = stateChange;
      if (action == search){
        request.open("GET","http://www.omdbapi.com/?apikey=abc02625&r=xml&type=movie&s=" + query,true);
      }else{
        request.open("GET","http://www.omdbapi.com/?apikey=abc02625&plot=long&r=xml&i=" + id,true);
      }
      request.send("");
    }else{
      alert("Unfortunately this browser is not supported.");
    }

    function stateChange(){
        if (request.status == 200 || request.status == 0){
          var response = request.responseXML;
          if(action == search){
            parseXML(response);
          }else{
            parseXMLid(response,id);
          }
          }
      }
    }
    function parseXML(response){
      var list = "";
      var attr = "";
      if (response){
        var movie = response.firstChild;
        movie = movie.firstChild;
        list = list + "<table>";
        for(a=0;a<response.firstChild.childNodes.length;a++){
          list = list + "<tr onClick=\"javascript:display('entry','inline-block','" + (movie.attributes[2]).nodeValue + "')\">"  + "<td>"
          for(i=0;i<2;i++){
            attr = movie.attributes[i];
            if (i == 1){
              list = list + " (" + attr.nodeValue + ")";
            }else{
              list = list + attr.nodeValue;
            }
          }
          movie = movie.nextSibling;
          list = list + "</td></tr>";
        }
        results.innerHTML = (list) + "</table>";
        document.getElementById('loading').style.display='none';
      }


  }
  function parseXMLid(response,id){
    var list = "";
    var attr = "";
    if (response){
      var movie = response.firstChild;
      movie = movie.firstChild;
      image = movie.attributes[13];
      image = image.nodeValue;
      desc = movie.attributes[9];
      desc = desc.nodeValue;
      title = movie.attributes[0];
      title = title.nodeValue;
      document.getElementById('entry').innerHTML="<img onClick='javascript:closeWindow()' id='close' src='images/close.svg'><div id='text'></div>" + "<img id='poster' src='http://img.omdbapi.com/?apikey=abc02625&i=" + id + "' onerror='this.src=\"images/notfound.jpg\"''>";
      document.getElementById('text').innerHTML="<h2>" + title + "</h2>" + desc;
      document.getElementById('loading').style.display='none';
    }
}
