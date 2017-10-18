(function() {
    function GameCell() {
        var gc = this;

        var value = Utils.randomBinary();

        gc.element = createElement('td', {
            class: 'game-cell'
        });

        gc.setValue = function(newValue) {
            gc.element.setAttribute('data-value', newValue);
            value = newValue;
            return gc;
        };

        gc.flipValue = function() {
            gc.setValue(!value);
            return gc;
        };

        gc.initValue = function() {
            gc.setValue(Utils.randomBinary());
            return gc;
        };

        gc.getValue = function() {
            return value;
        };

        gc.attach = function(parent) {
            parent.appendChild(gc.element);
        };
    }

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
                var cell = new GameCell();
                cell.initValue().attach(row);
            }
        }
        gt.element = table;
    }
    window.GameTable = GameTable;
})();
