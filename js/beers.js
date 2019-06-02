$('document').ready(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respsonse = JSON.parse(xhttp.responseText);
            var beers = respsonse.beers;
            
            var currentBeers = beers.filter(function(beer){
                return beer.onTap === true;
            });
            console.log(currentBeers);

            var otherBeers = beers.filter(function(beer){
                return beer.onTap === false;
            });
            console.log(otherBeers);
            
            for (var i = 0; i < currentBeers.length; i++) {
                var currentBeer = 
                    '<div class="card m-2 text-center">' + 
                    '<img src="img/'+currentBeers[i].img+'" alt="" class="card-img-top">' + 
                    '<div class="card-body">' + 
                    '<ul class="list-unstyled">'+
                    '<li><strong>'+currentBeers[i].title+'</strong></li>'+
                    '<li><em>'+currentBeers[i].style+'</em></li>'+
                    '<li>'+currentBeers[i].abv+'</li>'+
                    '<li>'+currentBeers[i].description+'</li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>';
                $('#currentBeers').append(currentBeer);
            }

            for (var i = 0; i < otherBeers.length; i++) {
                var otherBeer = 
                    '<div class="card m-2 text-center">' + 
                    '<img src="img/'+otherBeers[i].img+'" alt="" class="card-img-top">' + 
                    '<div class="card-body">' + 
                    '<ul class="list-unstyled">'+
                    '<li><strong>'+otherBeers[i].title+'</strong></li>'+
                    '<li><em>'+otherBeers[i].style+'</em></li>'+
                    '<li>'+otherBeers[i].abv+'</li>'+
                    '<li>'+otherBeers[i].description+'</li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>';
                $('#otherBeers').append(otherBeer);
            }
        }
    };
    xhttp.open("GET", "beers.json", true);
    xhttp.send();
});