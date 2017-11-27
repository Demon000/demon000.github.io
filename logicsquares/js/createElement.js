(function(){
	function createElement(type, o) {
		var e = document.createElement(type);

		if (o.parent) {
			o.parent.appendChild(e);
			delete o.parent;
		}
		if (o.content) {
			e.innerHTML = o.content;
			delete o.content;
		}
		if (o.style) {
			for (var s in o.style) {
				e.style[s] = o.style[s];
			}
			delete o.style;
		}
		for (var i in o) {
			e.setAttribute(i, o[i]);
		}
		return e;
	}
	window.createElement = createElement;
})();
