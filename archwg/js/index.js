var wg = new Vue({
	el: 'body',
	data: {
		view: {
			background: '#111111',
			width: screen.width + 'px',
			height: screen.height + 'px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			flexShrink: 0,
		},
		logo: {
			height: screen.width * 0.16  + 'px',
			fill: '#eeeeee',
		},
		text: {
			fontSize: screen.width * 0.03 + 'px',
			fontFamily: 'Monospace',
			textAlign: 'center',
			color: '#eee',
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
		},
		content: 'insert text',
	},
	watch:
	{
		'logo.height': 'settext',
		'view.height': 'settext',
	},
	ready() {
		this.settext();
	},
	methods: {
		settext(){
			this.text.top = parseInt(this.view.height, 10) / 2 +
							parseInt(this.logo.height, 10) / 2 + 
							parseInt(this.logo.height, 10) * 0.2 + 'px';
		},
		generate() {
			var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
			canvas.height = parseInt(this.view.height, 10);
			canvas.width = parseInt(this.view.width, 10);
			rasterizeHTML.drawHTML(document.querySelector('.view').outerHTML).then((r) => {
			    context.drawImage(r.image, 0, 0);
			    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
				window.location.href = image;
			});
		},
	},
});