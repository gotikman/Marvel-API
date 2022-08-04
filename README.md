## Demo
+ :earth_americas: **GitHub Pages**    https://gotikman.github.io/demo-marvel-api/
## Initial Resource
+ Template https://www.figma.com/file/xiC1B6ZlHvbiUK6FO3caxN/Marvel-DB
+ Marvel API https://developer.marvel.com/docs

## Deploy 
+ GitHub Pages --> https://gotikman.github.io/demo-marvel-api/
+ Heroku.com --> https://marvel-api-gotikman.herokuapp.com/www-react-api


## Провірка API
створюєм дублікат класу для...
const marvelServise = new MarvelService();  
marvelServise.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); 
http://prntscr.com/22qy9a6