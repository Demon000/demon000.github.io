request = window.superagent;
var dblog = new Vue(
 {
   el: 'body',
   data:
   {
     collection: [],
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
         self.viewing = true;
       });

     },
     ripple: ripple,
   }
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
 });
