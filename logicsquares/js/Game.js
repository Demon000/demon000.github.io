(function() {
    function GameCell(o) {
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
            gc.setValue(value ? 0 : 1);
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

        function handleClick() {
            gc.flipValue();
            if (Utils.isDefined(o.handleClick)) {
                o.handleClick(value);
            }
        }
        gc.element.addEventListener('click', handleClick);

        if (Utils.isDefined(o.parent)) {
            gc.attach(o.parent);
        }

        if (Utils.isDefined(o.init)) {
            gc.initValue();
        }

    }

    function GameTable(o) {
        var gt = this;

        var size = o.size;

        var table = createElement('table', {
            class: 'game-table'
        });

        var cells = [];

        for (var i = 0; i < size; i++) {
            var row = createElement('tr', {
               class: 'game-row',
               parent: table
            });

            cells.push([]);
            for (var j = 0; j < size; j++) {
                var cell = new GameCell({
                    parent: row,
                    init: true
                });
                cells[i].push(cell);
            }
        }

        gt.element = table;
    }
    window.GameTable = GameTable;
})();
