(function(){
	function Dallery(e, o) {
		var d = this;

		d.container = e;

		d.index = 0;

		var nsel = '.next';
		var psel = '.prev';

		var ssel = '.slide';

		var fadein = 'fadein';
		var fadeout = 'fadeout';
		if(o) {
			if(o.index) {
				d.index = o.index;
			}
			if(o.next) {
				nsel = o.next;
			}
			if(o.prev) {
				psel = o.prev;
			}
			if(o.slide) {
				ssel = o.slide;
			}
			if(o.fadein) {
				fadein = o.fadein;
			}
			if(o.fadeout) {
				fadeout = o.fadeout;
			}
		}

		d.elements = [].slice.call(d.container.querySelectorAll(ssel));
		d.elements.forEach(function(e) {
			e.classList.add('fadeout');
		});
		var n = e.querySelector(nsel);
		var p = e.querySelector(psel);

		

		d.set = function(i) {
			if(d.elements.length <= i) {
				i = 0;
			} else if (i < 0) {
				i = d.elements.length - 1;
			}
			d.elements[d.index].classList.remove(fadein);
			d.elements[d.index].classList.add(fadeout);
			d.index = i;
			d.elements[d.index].classList.remove(fadeout);
			d.elements[d.index].classList.add(fadein);
		};

		d.next = function() {
			d.set(d.index + 1);
		};

		d.prev = function() {
			d.set(d.index - 1);
		};

		n.addEventListener('click', d.next);
		p.addEventListener('click', d.prev);
		
		
		d.set(d.index);
	}
	window.Dallery = Dallery;
})();