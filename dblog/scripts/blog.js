request = window.superagent;
var dblog = new Vue(
 {
   el: 'body',
   data:
   {
     collection: [],
     authors: {},
     limit: 6,
     page: 6,
     loaded: false,
   },
   methods:
   {
     add(article)
     {
       this.collection.push(article);
     },
     increase()
     {
       this.limit += this.page;
     },
     view(article)
     {
       location.assign(`article.html#${article.id}`);
     },
     ripple: ripple,
   }
 });
 request
 .get('authors/authors.json')
 .end(function(err, res)
 {
   var resource = JSON.parse(res.text);
   for(var author in resource)
    dblog.authors[author] = resource[author];
  request
  .get('data/articles.json')
  .end(function(err, res)
  {
    var resource = JSON.parse(res.text);
    resource.forEach(function(article)
    {
      dblog.collection.push(article);
    });
    dblog.loaded = true;
  });
 });
