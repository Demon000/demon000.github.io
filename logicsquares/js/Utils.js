(function() {
    function randomBinary() {
        return (Math.floor(Math.random() * 9) % 2);
    }

    window.Utils = {
        randomBinary: randomBinary
    }
})();
