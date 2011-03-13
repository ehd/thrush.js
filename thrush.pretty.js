;(function(exports){
	var wrap = function(a, b){
		return function(){
			return b.call(this, a.apply(this, arguments));
		};
	};

	exports.thrush = function(){
		return Array.prototype.slice.call(arguments).reduce(wrap);
	};
})(window);
