(function() {
    function GameCell(o) {
        var gc = this;

        var value;

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

    var DEFAULT_TABLE_SIZE = 3;
    function NOOP() {}

    function GameTable(o) {
        var gt = this;

        if (!Utils.isDefined(o.handleClick)) {
            o.handleClick = NOOP;
        }

        if (!Utils.isDefined(o.size)) {
            o.size = DEFAULT_TABLE_SIZE;
        }

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

        function handleCellClick(r, c) {
            var toFlip = [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

            toFlip.forEach(function(coords) {
                var y = coords[0];
                var x = coords[1];
                if (y > -1 && y < size && x > -1 && x < size) {
                    cells[y][x].flipValue();
                }
            });

            o.handleClick.call(gt, isSolved());
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

                cell.listen('click', handleCellClick.bind(gt, i, j));

                cells[i].push(cell);
            }
        }

        gt.init = function() {
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    cells[i][j].initValue();
                }
            }
        };

        if (o.init) {
            gt.init();
        }

        if (o.numpad && size == 3) {
            var numpadKeys = [103, 104, 105, 100, 101, 102, 97, 98, 99];
            document.addEventListener('keydown', function(event) {
                var key = event.keyCode;
                var index = numpadKeys.indexOf(key);
                if (index == -1) {
                    return;
                }

                var r = Math.floor(index / size);
                var c = index % size;
                handleCellClick.call(gt, r, c);
            });
        }
    }
    window.GameTable = GameTable;
})();
