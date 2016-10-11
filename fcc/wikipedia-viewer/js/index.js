window.request = window.superagent;
var viewer = new Vue(
	{
		el: 'body',
		data:
		{
		    query: '',
		    error: false,
		    results: [],
		    endpoint: 'https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=',
		},
		methods:
		{
		    search()
		    {
		        if(this.query)
		        {
		            request
    		        .get(this.endpoint + encodeURIComponent(this.query))
    		        .end((err, res) => 
    		        {
    		            var self = this;
		                var results = JSON.parse(res.text).query.search;
		                if(results.length)
    		            {
        		            self.results = [];
        		            self.error = false;
        		            results.forEach(r => 
        		            {
        		                self.results.push
        		                ({
        		                    title: r.title,
        		                    description: r.snippet,
        		                    link: 'https://en.wikipedia.org/wiki/' + r.title,
        		                });
        		            });
    		            }
    		            else
    		            {
    		            	self.error = true;
    		            } 

    		                
    		        });
		        }
		        
		    },
		}
	});
viewer.$watch('query', (newv, oldv) => 
{
    viewer.search();
});