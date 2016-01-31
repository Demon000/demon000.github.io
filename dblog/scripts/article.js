request = window.superagent;
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});
var article = new Vue(
  {
    el: 'body',
    data:
    {
      id: location.hash.substr(1),
      story: {},
      author: {},
      loaded: false,

    },
    methods:
    {
      back()
      {
        console.log('go back!');
        history.back();
      },
      ripple: ripple,
    },
  });
  request
  .get('data/articles.json')
  .end((err, res) =>
  {
    var resource = _.find(JSON.parse(res.text), {id: article.id});
    article.story = _.assign(article.story, resource);

    request
    .get('authors/authors.json')
    .end((err, res) =>
    {
      var resource = JSON.parse(res.text)[article.story.author];
      article.author = _.assign(article.author, resource);

      request
      .get('data/' + article.id + '/content.md')
      .end((err, res) =>
      {
        article.story.content = marked(res.text);
        article.loaded = true;
        
      });
    });
  });
