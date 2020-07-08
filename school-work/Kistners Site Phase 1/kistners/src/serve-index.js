var recipes = require('./recipes');
var fs = require('fs');
var productData = [];

/*
* Dynamically serves the index page.
*/
function serveIndex(req, res){
  var cards = generateCards();
  req.templates.render("./templates/home.html", {cards: cards}, (err, data)=>{
    if(err) return res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);dszfasdesdrewsdfrfrfrrdxcf  Z
  });
}

/*
* Generates a series of cards based on recipe JSON data and images. 
*/
function generateCards(){
    productData.push(recipes.featured(11));
    var card, cards = [];
    for(i = 0; i < productData[0].length; i++){
        card =
        `<div id="card">
            <img src="images/${productData[0][i].images[0]}" id="card-image" />
            <h3>${productData[0][i].name}</h3>
            <p>$${productData[0][i].price}</p>  
        </div>`
        cards.push(card);
    }
    return cards.join("");
}

module.exports = serveIndex; 