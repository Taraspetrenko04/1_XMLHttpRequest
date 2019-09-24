'use strict';

window.onload = () => {

    document.querySelector('.request').onclick = () => {
        ajaxGet('https://swapi.co/api/films/', function (data){
            let films =  data.results;
            console.log(films[0]);
            // document.querySelector('.list').innerHTML = ;
            }
        )}



    function ajaxGet(url, callback) {
        let request = new XMLHttpRequest();
        // let f = callback || function(data){};


        request.open('GET', url);
        request.responseType = 'json';
        request.send(); 
       
        request.onload = function() {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.response);// will do after full loading request;
            }
        }
    }
   


}