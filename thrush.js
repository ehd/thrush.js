;(function(exports){
	var partition = function(array, size){
		return array.reduce(function(a, e, index){
			if (a[0].length < size){
				return [a[0].concat(e)].concat(a.slice(1));
			}else{
				return [[e]].concat(a);
			}
		}, [[]]).reverse();
	};

	exports.thrush = function t(a, b, c, d, e, f, g, h, i){
		if(i){
			var ps = partition(Array.prototype.slice.call(arguments), 8);
			var cs = ps.map(function(p){return t.apply(this, p)});
			return t.apply(this, cs);
		}else if(h){
			return function(){
				return h.call(this,
					   g.call(this,
					   f.call(this,
					   e.call(this,
					   d.call(this,
					   c.call(this,
					   b.call(this,
					   a.apply(this, arguments)))))))); };
		}else if(g){
			return function(){
				return g.call(this,
					   f.call(this,
					   e.call(this,
					   d.call(this,
					   c.call(this,
					   b.call(this,
					   a.apply(this, arguments))))))); };
		}else if (f){
			return function(){
				return f.call(this,
					   e.call(this,
					   d.call(this,
					   c.call(this,
					   b.call(this,
					   a.apply(this, arguments)))))); };
		}else if (e){
			return function(){
				return e.call(this,
					   d.call(this,
					   c.call(this,
					   b.call(this,
					   a.apply(this, arguments))))); };
		}else if (d){
			return function(){
				return d.call(this,
					   c.call(this,
					   b.call(this,
					   a.apply(this, arguments)))); };
		}else if (c){
			return function(){
				return c.call(this,
					   b.call(this,
					   a.apply(this, arguments))); };
		}else if (b){
			return function(){
				return b.call(this,
					   a.apply(this, arguments));
			};
		}else if (a){
			return a;
		}else{
			return function(){};
		}
	};
})(window);
