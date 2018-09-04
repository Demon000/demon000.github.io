(function() {
    function randomBinary() {
        return (Math.floor(Math.random() * 9) % 2);
    }

	function isDefined(value) {
		return typeof value != 'undefined';
	}

    window.Utils = {
        randomBinary: randomBinary,
        isDefined: isDefined
    };
})();
