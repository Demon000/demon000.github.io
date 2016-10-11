var preview = new Vue({
  el: 'body',
  data: {
    input: '> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".',
    parsed: '',
  },
  methods: {
    parse() {
      var reader = new commonmark.Parser();
      var writer = new commonmark.HtmlRenderer();
      var parsed = reader.parse(this.input);
      var result = writer.render(parsed);
      this.parsed = result;
    },
  },
  watch: {
    'input': 'parse',
  },
  ready() {
    this.parse();
  },
});