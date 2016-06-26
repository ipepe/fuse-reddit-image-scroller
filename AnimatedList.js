var Observable = require("FuseJS/Observable");
var items = Observable();
var reddit_url = 'https://www.reddit.com/r/HeresAFunFact.json';

fetch(reddit_url).then( function(response){
    return response.json();
}).then(function(responseObject) {
    responseObject.data.children.forEach(function(post){
        try{
            var item = {
                title: post.data.title,
                image_url: post.data.preview.images[0].source.url
            };
            items.add(item);
        }catch(ex){
            console.error(ex);
        }

    });
});

module.exports = {
    items: items,
    onPostClicked: function(){
        console.log("testTest!")
    }
};