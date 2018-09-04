(function() {
    function handleClick(isSolved) {
        var gameTable = this;
        if (isSolved) {
            alert('nice');
            gameTable.init();
        }
    }
    var gameTable = new GameTable({
        size: 3,
        init: true,
        use_numpad: true,
        handleClick: handleClick
    });
    document.body.appendChild(gameTable.element);
})();
