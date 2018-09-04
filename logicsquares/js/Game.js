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
    var NUMPAD_TABLE_SIZE = 3;
    var DEFAULT_USE_NUMPAD = true;
    var NUMPAD_KEYS = [103, 104, 105, 100, 101, 102, 97, 98, 99];
    function NOOP() {}

    function GameTable(o) {
        var gt = this;

        if (!Utils.isDefined(o.handleClick)) {
            o.handleClick = NOOP;
        }

        if (!Utils.isDefined(o.size)) {
            o.size = DEFAULT_TABLE_SIZE;
        }

        if (!Utils.isDefined(o.use_numpad)) {
            o.use_numpad = DEFAULT_USE_NUMPAD;
        }

        gt.element = createElement('table', {
            class: 'game-table'
        });

        var cells = [];

        function isSolved() {
            var sum = 0;

            for (var i = 0; i < o.size; i++) {
                for (var j = 0; j < o.size; j++) {
                    sum += cells[i][j].getValue();
                }
            }

            return sum == 0 || sum == o.size * o.size;
        }

        function handleCellClick(r, c) {
            var toFlip = [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

            toFlip.forEach(function(coords) {
                var y = coords[0];
                var x = coords[1];
                if (y > -1 && y < o.size && x > -1 && x < o.size) {
                    cells[y][x].flipValue();
                }
            });

            o.handleClick.call(gt, isSolved());
        }

        for (var i = 0; i < o.size; i++) {
            var row = createElement('tr', {
               class: 'game-row',
               parent: gt.element
            });

            cells.push([]);
            for (var j = 0; j < o.size; j++) {
                var cell = new GameCell({
                    parent: row
                });

                cell.listen('click', handleCellClick.bind(gt, i, j));

                cells[i].push(cell);
            }
        }

        gt.init = function() {
            for (var i = 0; i < o.size; i++) {
                for (var j = 0; j < o.size; j++) {
                    cells[i][j].initValue();
                }
            }
        };

        if (o.init) {
            gt.init();
        }

       function handleNumpadEvent(event) {
            var key = event.keyCode;
            var index = NUMPAD_KEYS.indexOf(key);
            if (index == -1) {
                return;
            }

            var r = Math.floor(index / o.size);
            var c = index % o.size;
            handleCellClick.call(gt, r, c);
       }

        if (o.use_numpad && o.size == NUMPAD_TABLE_SIZE) {
            document.addEventListener('keydown', handleNumpadEvent);
        }
    }
    window.GameTable = GameTable;
})();
