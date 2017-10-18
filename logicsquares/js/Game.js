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

        gc.listen = function(event, f) {
            gc.element.addEventListener(event, f);
        };

        if (Utils.isDefined(o.parent)) {
            gc.attach(o.parent);
        }
    }

    function GameTable(o) {
        var gt = this;

        var size = o.size;

        gt.element = createElement('table', {
            class: 'game-table'
        });

        var cells = [];

        function isSolved() {
            var sum = 0;

            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    sum += cells[i][j].getValue();
                }
            }

            return sum == 0 || sum == size * size;
        }

        function handleClick(r, c) {
            var toFlip = [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

            toFlip.forEach(function (coords) {
                var y = coords[0];
                var x = coords[1];
                if (y > -1 && y < size && x > -1 && x < size) {
                    cells[y][x].flipValue();
                }
            });

            if (isSolved() && Utils.isDefined(o.handleSolved)) {
                o.handleSolved();
            }
        }

        for (var i = 0; i < size; i++) {
            var row = createElement('tr', {
               class: 'game-row',
               parent: gt.element
            });

            cells.push([]);
            for (var j = 0; j < size; j++) {
                var cell = new GameCell({
                    parent: row
                });

                cell.listen('click', handleClick.bind(this, i, j));

                cells[i].push(cell);
            }
        }

        gt.init = function() {
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    cell.initValue();
                }
            }
        };

        if (Utils.isDefined(o.init)) {
            gt.init();
        }
    }
    window.GameTable = GameTable;
})();
