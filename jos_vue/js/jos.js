var jos = new Vue(
	{
		el: 'body',
		data:
		{
			ws:
			[
				{
					title: 'My Computer',
					icon: 'assets/computer.png',
					size: '',
					state: 'active',
					src: 'filemanager.html',
					cursor:
					{
						top: 0,
						left: 0,
					},
					style: 
					{
						top: '50px', 
						left: '50px', 
						width: '500px', 
						height: '500px',
						zIndex: 2,
					}
				},
				{
					title: 'My Computer',
					icon: 'assets/computer.png',
					size: '',
					state: '',
					content: 'Content!Another content!<script type="text/javascript">alert("hi");</script>',
					cursor:
					{
						top: 0,
						left: 0,
					},
					style: 
					{
						top: '500px', 
						left: '150px', 
						width: '500px', 
						height: '500px',
						zIndex: 1,
					}
				},

			],
			dragging: false,
			maxindex: 2,
		},
		methods:
		{
			remove(w)
			{
				this.ws.splice(_.indexOf(w), 1);
			},
			maximize(w)
			{
				if(w.size == 'fullscreen')
				{
					w.size = '';
				}
				else
				{
					w.size = 'fullscreen';
				}
			},
			minimize(w)
			{
				if(w.state == 'minimized')
				{
					this.activate(w);
				}
				else
				{
					w.state = 'minimized';
				}
			},
			activate(w)
			{
				var prev = _.find(this.ws, {'state': 'active'});
				if(prev)
					prev.state = '';
				w.state = 'active';
				this.maxindex++;
				w.style.zIndex = this.maxindex;
			},
			startdrag(w, e)
			{
				w.cursor.top = e.pageY - parseInt(w.style.top, 10);
				w.cursor.left = e.pageX - parseInt(w.style.left, 10);
				this.dragging = w;
			},
			ondrag(e)
			{
				if(!this.dragging)
					return;

				if(e.pageY < 5)
					this.dragging.size = 'fullscreen';
				else if(e.pageX < 5)
					this.dragging.size = 'leftscreen';
				else if(e.pageX > window.innerWidth - 5)
					this.dragging.size = 'rightscreen';
				else
				{
					if(this.dragging.size)
					{
						this.dragging.size = '';
						this.dragging.cursor.left = parseInt(this.dragging.style.width, 10) / 2;
						this.dragging.cursor.top = 18;
					}
					this.dragging.style.left = e.pageX - this.dragging.cursor.left + 'px';
					this.dragging.style.top = e.pageY - this.dragging.cursor.top + 'px';
				}
			},
			enddrag(e)
			{
				this.dragging = false;
			}
		}
	});