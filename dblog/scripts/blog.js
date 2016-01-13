request = window.superagent;
var dblog = new Vue(
 {
   el: 'body',
   data:
   {
     collection: [],
     limit: 4,
     page: 4,
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
       console.log(article);
     },
     ripple: ripple,
   }
 });
 request
 .get('data/articles.json')
 .end(function(err, res)
 {
   var resource = JSON.parse(res.text);
   resource.reverse();
   resource.forEach(function(article)
   {
     dblog.collection.push(article);
   });
 });
