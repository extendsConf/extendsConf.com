const log = function log() {

	log.history = log.history || [];
	log.history.push(arguments);

	if(console && SITE.config.devMode)
	{

		let items = Array.prototype.slice.call(arguments);
		if (items.length === 1)
		{
			console.log( '[Dev]', Array.prototype.slice.call(arguments).shift() );
		}
		else
		{
			console.group('[Dev]');
			for (var i=0; i < items.length; i++)
			{
				console.log(items[i]);
			}
			console.groupEnd();
		}

	}

};

export {
	log
}
