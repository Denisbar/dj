util = require("util");

exports.flat2json = function(pathes){
	
	setProperty = function(object,path,value){
		path = path.split(".");
		pos = path[path.length-1].indexOf("[]");
		if(pos>=0){
			value = value.split(",");
			path[path.length-1] = path[path.length-1].substring(0,pos);	
		}
		value = (util.isArray(value)) ? value : [value];
		for(i in value){
				value[i] = (value[i] && value[i].trim) ? value[i].trim() : value[i];
			};
		value = (value.length == 1) ? value[0] : value; 
		current = object;
		path.forEach(function(item, index){
				current[item] = (index == path.length-1) ? value : current[item] || {};
				current = current[item];
		});
	}
	
	result = {};
	pathes.forEach(function(item){
		setProperty(result,item.path,item.value)
	});
	return result;
} 

exports.json2flat = function(object){
	plane = [];
	p = function(object,path){
		for(prop in object){
			path.push(prop);
			if(util.isArray(object[prop]) || !util.isObject(object[prop])){
				key = path.join(".");
				key += (util.isArray(object[prop]))? "[]" : '';
				plane.push({
					path:key, 
					value:(util.isArray(object[prop]))? object[prop].join(","):object[prop]
				});
			path.splice(-1,1);	
			}else{p(object[prop],path)}
		}
		path.splice(-1,1);
	}
	p(object,[]);
	return plane;
}



// TODO Full multiple * implementation needed
// 
function getProperty (obj,path){
  if(path === "") {return obj}
  var res = obj;
  path = path.split(".");
  if (!res) return undefined;
  for(var i in path){
  	if(path[i] === "*"){
  		tmpPath = path.slice(i).slice(1);
  		var buf = []
  		for( j in res){
  			buf = buf.concat(getProperty(res[j],tmpPath.join(".")))
  		}
  		return buf;
  	}else{
	    if(res[path[i]]){
	      res = res[path[i]];
	    }else{
	      return undefined;
	    }
	}    
  }
  
  
  if(util.isObject(res)){
  	return res;
  }
  
  res = (res.split) ? res.split(",") : res;
  for(var i in res){
    res[i] = res[i].trim();
  }
  return res;
}

exports.getProperty = getProperty