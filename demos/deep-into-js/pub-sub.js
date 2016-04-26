
var pubsub = {};

(function(q) {
	var topics = [],
		subUid = -1;

	// 发布
	q.publish = function(topic, args) {
		if (!topics[topic]) {
			return false;
		}

		setTimeout(function() {
			var subscribers = topics[topic],
				len = subscribers ? subscribers.lenght : 0;

			while (len--) {
				subscribers[len].func(topic, args);
			}
		}, 0);
	};

	// 订阅
	q.subscribe = function(topic, func) {
		if (!topics[topic]) {
			topics[topic] = [];
		}

		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});

		return token;
	};

	// 取消订阅
	q.unsubscribe = function(token) {
		for (var i = 0; i < topics.length; i++) {
			if (topics[i]) {
				for (var j = 0; j < topics[i].length; j ++) {
					if (topics[i][j].token === token) {
						topics[i].splice(j, 1);
						return token;
					}
				}
			}
		}

		return false;
	};
}(pubsub));