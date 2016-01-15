request = window.superagent;
marked.setOptions({
 highlight: function (code) {
   return hljs.highlightAuto(code).value;
 }
});
var dblog = new Vue(
 {
   el: 'body',
   data:
   {
     collection: [],
     authors: {},
     limit: 4,
     page: 4,
     viewing: false,
     article: null,
   },
   methods:
   {
     add: function(article)
     {
       this.collection.push(article);
     },
     increase: function()
     {
       this.limit += this.page;
     },
     view: function(article)
     {
       this.article = article;
       var self = this;
       request
       .get('data/' + article.id + '/content.md')
       .end(function(err, res)
       {
         self.article.content = marked(res.text);
         history.pushState(null, null, '#article=' + article.id);
         self.viewing = true;
       });

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
 });

 request
 .get('data/articles.json')
 .end(function(err, res)
 {
   var resource = JSON.parse(res.text);
   resource.forEach(function(article)
   {
     dblog.collection.push(article);
   });
   if(gethash('article'))
   {
     var article = _.findWhere(dblog.collection, {id: gethash('article')});
     console.log(article);
     if(article)
      dblog.view(article);
   }
 });


function gethash(key)
{
  var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
  return matches ? matches[1] : null;
}
