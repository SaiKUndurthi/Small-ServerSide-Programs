var clientID = key.CLIENT_ID;
var imgur_request = new Request('https://api.imgur.com/3/gallery/image/pmMAAr6', {
        headers: new Headers({
            'Authorization': 'Client-ID '+clientID
        })
    });

var github_request = new Request('https://api.github.com/users/SaiKUndurthi', {
    headers: new Headers({
        'Accept': 'application/vnd.github.v3+json'
    })
});

fetch(github_request).then((data) => {
    //console.log(data.json());
    return data.json();
}).then((star)=>{
    console.log(star);
}).catch((err)=>{
  console.error(err);  
})

    function createImageElement(data) {
        var pT = document.createElement('IMG');
          pT.setAttribute('src', data);
          pT.setAttribute('width', '150');
          pT.setAttribute('height', '150');

        document.getElementById("three").appendChild(pT);
      }




    document.getElementById('one').addEventListener('click', function(e){
        alert('Div 1');
        e.stopPropagation();
    })


    document.getElementById('two').addEventListener('click', function(e){
        alert('Div 2');
        fetch('')
        e.stopPropagation();
    })

    document.getElementById('three').addEventListener('click', function(e){
        alert('Fetching a picture using IMGUR API');
        fetch(imgur_request).then(function(res){
            //console.log(res);
           return res.json();
        }).then(function(src){
            //console.log(src);
            createImageElement(src.data.link);
        })
        e.stopPropagation();
    })


