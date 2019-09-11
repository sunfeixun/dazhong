var projectData = {
	width:1300,
	height:640,
	container:null,
	loader:null,
	shower:null,
	duration:0.5,
	eventer:new createjs.EventDispatcher,
	effectSound:{}
}

var page, convertEn;

function init(){
	var loader = new Lib.loader;
	var imgCount = 12, imgRes = {path:'graphics/',asset:['SpriteImages.json','firstpage.jpg'],type:'.png'};
	var i;

	Lib.stageFunc.initStage('canvas',{width:projectData.width,height:projectData.height});

	projectData.loader = loader;
	projectData.container = Lib.stageFunc.getStuff('rootContainer');
	projectData.shower = projectData.container.addChild(new createjs.Container);

	var loadResrouce = [
		{path:'audio/',asset:['1','2','3','4','5','6','7','8','9','10','11','12','13','18',
								'19','20','bgm','click','right','wrong'],type:'.mp3'}
	];
	var data, type;
	var loadlist = [];

	for(i=0;i<imgCount;i++){
		imgRes.asset.push('SpriteImages_' + i.toString());
	}

	loadResrouce.push(imgRes);

	for(i=0;i<loadResrouce.length;i++){
		data = loadResrouce[i];
		type = data.type||'';
		for(var j=0;j<data.asset.length;j++){
			data.asset[j] = data.asset[j].indexOf('.')<0? data.asset[j]+type:data.asset[j];
		}
		loader.add(data.asset,data.path);
	}

	loader.addLoadProgress(null,projectData.container).set({color:'white',x:projectData.width/2,y:projectData.height/2});
	loader.on(Lib.loader.HANDLE_COMPLETE,buildPages);
/*	loader.on('progress',function(e){
		Lib.stageFunc.freshResize();
	});*/
	loader.Load();
}

convertEn = new ((function() {

	function ce(){
		this.enElements = [];
		this.language = null;
	}

	var _proto = ce.prototype;

	_proto.addEnElement = function(obj,props,alignCenter,hascache){
		if(!(obj instanceof createjs.Sprite)) return;

		var str = obj.currentAnimation + '_en';
		var o;
		var i;

		if(obj.spriteSheet._animations.indexOf(str) < 0) return;

		o = {
			obj:obj,
			enprops:props,
			alignCenter:alignCenter,
			hasCache:hascache
		}

		if(props){
			o.chprops = {};
			for(i in props){
				o.chprops[i] = obj[i];
			}
		}

		hascache && recache(obj);

		for(i in o){
			if(o[i]===undefined) delete o[i];
		}

		this.enElements.push(o);

		function recache(_o){
			var _str = _o.currentAnimation + '_en';
			var _ostr = _o.currentAnimation;
			var _bound1 = _o.getBounds(), _bound2;
			var x,y,w,h;

			_o.gotoAndStop(_str);
			_bound2 = _o.getBounds();

			x = _bound1.x < _bound2.x ? _bound1.x:_bound2.x;
			y = _bound1.y < _bound2.y ? _bound1.y:_bound2.y;
			w = _bound1.width > _bound2.width? _bound1.width:_bound2.width;
			h = _bound1.height > _bound2.height? _bound1.height:_bound2.height;
			_o.cache(x,y,w,h);
			_o.gotoAndStop(_ostr);
			_o.setBounds(x,y,w,h);
		}
	}

	_proto.switchLang = function(lang){
		var i, j, ene, animation, prop;

		if(lang){
			if(this.language === lang) return;
			this.language = lang;
		}else{
			this.language = this.language === 'ch'? 'en':'ch';
		}

		for(i=0;i<this.enElements.length;i++){
			ene = this.enElements[i];
			animation = ene.obj.currentAnimation;

			if(this.language === 'en'){
				ene.obj.gotoAndStop(animation + '_en');
				prop = ene.enprops;
			}else if(this.language === 'ch'){
				ene.obj.gotoAndStop(animation.replace('_en',''));
				prop = ene.chprops;
			}

			if(prop){
				for(j in prop){
					ene.obj[j] = prop[j];
				}
			}

			if(ene.alignCenter){
				ene.obj.regX = ene.obj.getBounds().width/2;
				ene.obj.regY = ene.obj.getBounds().height/2;
			}

			ene.hasCache && ene.obj.updateCache();
		}
	}

	return ce;
})());