window.addEventListener('load', function() {

    document.getElementsByClassName('getFilms')[0].addEventListener('click', function() {
        let response;
        let xhr = new XMLHttpRequest();//create hxr object
        let url = new URL('https://swapi.co/api/films/');
        // let url = new URL('https://swapi.co/api/people/1/');//hero
        
 
        xhr.open('GET', url);//make get request
        xhr.responseType = 'json';
        xhr.send(); // send request

        
        xhr.onload = function() {
            if (xhr.status != 200 && xhr.readyState != 4) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
              } else { // если всё прошло гладко, выводим результат
                // console.log(xhr.readyState);
                response = xhr.response;
                createList(response); 

                getChar(response, function(data) {///2//push it into li
                    console.log(data); 
                })    
              }
          };
    });

    function getChar(response, callback){
        let counter = 0;
        let data = [];
        response.results.forEach(element => {
            let arr = [];
            arr = element.characters;
            let d = []
            let count = 0;
           

            replaceLinks(arr, function(d) {///1
                let arr = [];
                d.forEach(element => {
                    arr.push(element.name);
                }) //nedd create new list 
                callback(arr);///2 //push it into li
            })

            
            function replaceLinks(arr, callback){
                
                
                for (let char = 0; char < arr.length; char++){
                    let req = new XMLHttpRequest()
                    // console.log(arr[char]);
                    let url = new URL(arr[char]);
                    req.open('GET', url);
                    req.send()
                    req.responseType = 'json';

                    req.onload = function() {
                        if (req.readyState == 4 && req.status == 200) {
                        count++;
                        d.push(req.response);

                        if (count === arr.length){
                            callback(d);///1
                        }
                    }
                } 
            }            
        }
    }
    )};
    
    let list = document.getElementsByClassName('list')[0];
    let ol = document.createElement('ol');
    list.appendChild(ol);
    

    function createList(response){
            let results = response.results;


            for( let i = 0; i < results.length; i++){ //for использует синхронные события
                let li = document.createElement('li');
                li.innerHTML = `${results[i].title}`; 
                li.id = results[i].episode_id; //set Id for every li
                ol.appendChild(li);
            }
    }

 
    // End
})