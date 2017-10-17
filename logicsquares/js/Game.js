(function() {
    function GameTable(options) {
        var gt = this;

        var size = options.size;

        var table = createElement('table', {
            class: 'game-table'
        });

        for (var i = 0; i < size; i++) {
            var row = createElement('tr', {
               class: 'game-row',
               parent: table
            });

            for (var j = 0; j < size; j++) {
                var cell = createElement('td', {
                    class: 'game-cell',
                    parent: row
                });
            }
        }
        gt.element = table;
    }
    window.GameTable = GameTable;
})();
