
## Initial Resource
+ Template https://www.figma.com/file/xiC1B6ZlHvbiUK6FO3caxN/Marvel-DB
+ Marvel API https://developer.marvel.com/docs
+ Deploy on Heroku.com --> https://marvel-api-gotikman.herokuapp.com/www-react-api

## Провірка API
const marvelServise = new MarvelService();  
//! створюєм дублікат класу для...
marvelServise.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); 
http://prntscr.com/22qy9a6

