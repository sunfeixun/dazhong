 var Page, captionText;

(function() {
	var loader, sprite;
	var allPages = [null];
	var shower;
	var currentPage, currentIndex;
	var uiPage, menuPage, percentPage,firstTip;
	var count = 0, all, per;
	var defaultPage;

	function page(n,autoRecent){
		this.Container_constructor();
		this.custom = {};

		if(n==='tipstep'){
			firstTip = this;
		}else if(n==='ui'){
			uiPage = this;
		}else if(n==='menu'){
			menuPage = this;
		}else if(n==='percent'){
			percentPage = this;
		}else if(typeof(n)!=='number'){
		 console.log('需要输入页面号码');
		}else{
			allPages[n] && console.log('该页面已被占用  '+ n);
			allPages[n] = this;

			if(autoRecent===false){
				this.custom.preventNext = true;
				this.on(page.COUNT_PERCENT,countpercent,null,true);
				this.on(page.HANDLE_COMPLETE,handleComplete,this,true);
			}else{
				this.on('added',needFinish,this,true);
			}
		}
	}

	function needFinish(){
		var _au;
		if(this.custom.audio){
			this.custom.preventNext = true;
			_au = loader.playSound(this.custom.audio + '.mp3').stop();
			_au.on('complete',handleComplete,this,true);
			_au.on('complete',countpercent,null,true);
		}else{
			handleComplete.apply(this);
			countpercent();
		}
	}

	function handleComplete(){
		delete this.custom.preventNext;
		uiPage.enableNext();
	}

	function countpercent(e){
		var converPer;
		count ++;
		all = allPages.length-1;
		per = count/all;
		converPer = per * 20;
		percentPage.custom.percentTxt.text = Math.round(per*100).toString() + '%';

		for(var i=0;i<converPer;i++){
			percentPage.custom.arr[i].visible = true;
		}
	}

	page.COUNT_PERCENT = 'countpercent';
	page.HANDLE_COMPLETE = 'handlecomplete';

	page.nextPage = function(){
		page.gotoPage(currentIndex+1,true);
	}

	page.prevPage = function(){
		page.gotoPage(currentIndex-1);
	}

	page.getPageByIndex = function(ind){
		return allPages[ind];
	}

	page.setLoader = function(l){
		loader = l;
	}

	page.setSprite = function(s){
		sprite = s;
	}

	page.setMainShower = function(s){
		shower = s;
	}

	page.getIndex = function(){
		return currentIndex;
	}

	page.getCurrentPage = function(){
		return currentPage;
	}

	page.isEnd = function(){
		return currentIndex === allPages.length-1;
	}

	page.end = function(){
		return allPages.length-1;
	}

	page.getMenu = function(){
		return menuPage;
	}

	page.getFirstTip = function(){
		return firstTip;
	}

	page.hideUI = function(show){
		if(show===undefined) show = false;
		uiPage.visible = percentPage.visible = show;
	}

	page.getUI = function(){
		return uiPage;
	}

	page.gotoDefaultPage = function(){
		page.gotoPage(typeof(defaultPage)==='number'? defaultPage:1);
	}

	page.gotoPage = function(num,next){
		if(!num){
			console.log('无效的页面代码');
			return;
		}else if(num===currentIndex){
			return;
		}else if(!allPages[num]){
			console.log('页面不存在');
			return;
		}else if(currentPage && currentPage.custom.preventNext && next){
			console.log('页面未完成');
			return;
		}

		shower.removeAllChildren();
		shower.addChild(allPages[num]);
		currentPage = allPages[num];
		currentIndex = num;
		loader.stopSound();

		currentPage.custom.audio && loader.playSound(currentPage.custom.audio + '.mp3');
		currentPage.custom.captionTimeline && currentPage.custom.captionTimeline.restart();
		currentPage.custom.captionTimeline_en && currentPage.custom.captionTimeline_en.restart();

		typeof(currentPage.custom.reset)==='function' && currentPage.custom.reset();
		currentPage.custom.mainTween && currentPage.custom.mainTween.restart();
		currentPage.dispatchEvent('firstlook');

		projectData.eventer.dispatchEvent('pagechange');

		return 'jump';
	}

	var p = createjs.extend(page,createjs.Container);

	p.createElement = function(datas,timeline){
		var ele, data, _parent;
		var instance = {};
		var statement = null;
		var i, j;
		var _i;

		if(timeline){
			this.custom.mainTween = timeline;
			timeline.pause();
		}

		for(_i=0;_i<datas.length;_i++){
			data = datas[_i];
			data.type = data.type || 'img';

			if(data.statement){
				statement = data.statement;
				continue;
			}else if(data.type==='statementOff'){
				statement = null;
				continue;
			}else if(data.type==='img'){
				if(!sprite[data.name]) console.log(data.name);
				ele = sprite[data.name].clone();
			}else if(data.type==='container'){
				ele = new createjs.Container;
			}else if(data.type instanceof createjs.DisplayObject){
				ele = data.type;
			}

			if(statement){
				for(j in statement){
					data[j] = data[j]===undefined? statement[j]:data[j];
				}

				if(statement.tween && data.tween){
					for(j in statement.tween){
						if(data.tween[j]===undefined) data.tween[j] = statement.tween[j];
					}
				}
			}

			if(typeof(data.regX)==='number') ele.regX = data.regX;
			if(typeof(data.regY)==='number') ele.regY = data.regY;

			if(data.createHitArea){
				ele.hitArea = new createjs.Shape();
				ele.hitArea.graphics.f('white').r(ele.getBounds().x,ele.getBounds().y,ele.getBounds().width,ele.getBounds().height);
			}

			ele.x = data.x || 0;
			ele.y = data.y || 0;
			ele.visible = data.visible===undefined? true:data.visible;
			data.attr && ele.set(data.attr);
			if(data.noCenter) ele.regX = ele.regY = 0;
			if(typeof(data.instance)==='string') instance[data.instance] = ele;
			if(data.addToArray) data.addToArray.push(ele);

			if(data.on){
				if(typeof(data.on[0])==='string'){
					ele.on.apply(ele,data.on);
				}else if(data.on[0] instanceof Array){
				for(i=0;i<data.on.length;i++){
						ele.on.apply(ele,data.on[i]);
					}
				}
			}

			if(data.addTo){
				data.addTo = typeof(data.addTo) === 'string'? instance[data.addTo]:data.addTo;
				data.addTo.addChild(ele);
			}

			if(data.tween){
				if(data.tween.hideObj){
					if(data.tween.hideObj instanceof Array){
						for(j=0;j<data.tween.hideObj.length;j++){
							data.tween.hideObj[j].obj = typeof(data.tween.hideObj[j].obj)==='string'? instance[data.tween.hideObj[j].obj]:data.tween.hideObj[j].obj;
							hideObj(timeline, data.tween.hideObj[j].obj,data.tween.hideObj[j].duration, data.tween.hideObj[j].mode, data.tween.hideObj[j].at);
						}
					}else if(typeof(data.tween.hideObj)==='object'){
						data.tween.hideObj.obj = typeof(data.tween.hideObj.obj)==='string'? instance[data.tween.hideObj.obj]:data.tween.hideObj.obj;
						hideObj(timeline, data.tween.hideObj.obj, data.tween.hideObj.duration, data.tween.hideObj.mode, data.tween.hideObj.at);
					}
				}

				if(data.tween.showMode){
					timeline.from(ele,data.tween.showDuration||projectData.duration,
							typeof(data.tween.showMode)==='string'? preferAnimate(data.tween.showMode):data.tween.showMode,
							data.tween.showAt);
				}
			}

			convertEn.addEnElement(ele,data.enprops,data.encenter,data.hascache);

			_parent = data.addTo || this;
			_parent.addChild(ele);
		}

		if(instance) this.custom.instance = instance;

		return instance;
	}

	p.asDefaultPage = function(){
		defaultPage = allPages.indexOf(this);
	}

	p.getInstance = function(str){
		return this.custom.instance[str];
	}

	p.toSelectQuiz = function(selecters,submit,correct,incorrect,others){
		var sls = this.addChild(new createjs.Container);
		var options = selecters.options, correctAnswer = selecters.correctAnswer;
		var bound;
		var cf = new createjs.ColorFilter(0,0,0,1, 37,172,228,0);
		var _this = this;
		var wrongLimit = others.wrongLimit || 1;
		var wrongCount = 0;
		var tryAgain;
		var submitTween;
		var resetButton = typeof(others.resetButton)==='string'? this.getInstance(others.resetButton):others.resetButton;
		var resetButtonTween = TweenLite.from(resetButton,0.5,{alpha:0,y:'+=30'});

		resetButton.on('click',resetQuiz,this);

		if(others.tryAgain) tryAgain = typeof(others.tryAgain)==='string'? this.getInstance(others.tryAgain):others.tryAgain;

		sls.cursor = 'pointer';
		this.custom.quizType = typeof(correctAnswer)==='number'? 'single':'multi';

		for(var i=0;i<options.length;i++){
			if(typeof(options[i])==='string') options[i] = this.getInstance(options[i]);
			bound = options[i].getBounds();
			options[i].hitArea = new createjs.Shape(new createjs.Graphics().f('white').r(bound.x,bound.y,bound.width,bound.height));
			options[i].filters = [];
			!options[i].cacheCanvas && options[i].cache(bound.x,bound.y,bound.width,bound.height);
			sls.addChild(options[i]);
		}

		if(typeof(correctAnswer)==='number'){
			options[correctAnswer].correct = true;
			sls.on('click',single,this);
		}else{
			for(var i=0;i<options.length;i++){
				options[i].correct = correctAnswer.indexOf(i) >= 0;
			}

			sls.on('click',multi,this);
		}

		// 正确，错误反馈
		correct = typeof(correct)==='string'? this.getInstance(correct):correct;
		incorrect = typeof(incorrect)==='string'? this.getInstance(incorrect):incorrect;

		this.on('added',resetQuiz,this);

		// 提交按钮;
		submit = typeof(submit)==='string'? this.getInstance(submit):submit;
		submitTween = TweenLite.from(submit,0.5,{alpha:0,y:'+=30'}).pause();
		submit.on('click',function(){
			if(tryAgain) tryAgain.visible = false;

			if(this.custom.quizType==='single'){
				this.custom.currentSelect === options[correctAnswer]? onCorrect():onIncorrect();
			}else{
				for(var i=0;i<options.length;i++){
					if(options[i].correct!==options[i].isSelected){
						onIncorrect();
						return;
					}
				}

				onCorrect();
			}

		},this);

		function resetQuiz(){
			resetButtonTween.seek(0).pause();
			submitTween.seek(0).pause();
			wrongCount = 0;
			sls.mouseEnabled = true;
			submit.visible = true;
			correct.visible = incorrect.visible = false;
			if(tryAgain) tryAgain.visible = false;
			if(this.custom.quizType==='single'){
				this.custom.currentSelect && filterObj(this.custom.currentSelect,true);
				this.custom.currentSelect = null;
			}else{
				options.forEach(function(e){
					e.isSelected = false;
					filterObj(e,true);
				});
			}
		}

		function onCorrect(){
			effectSound('right');
			correct.visible = true;
			pass();
			disableQuiz();
		}

		function onIncorrect(){
			// wrongCount ++;
			if(tryAgain) tryAgain.visible = true;
			effectSound('wrong');
			resetButtonTween.restart();
			// incorrect.visible = true;
			disableQuiz();
			// pass();
		}

/*		function onIncorrect(){
			wrongCount ++;
			effectSound('wrong');

			if(wrongCount < wrongLimit){
				if(tryAgain) tryAgain.visible = true;
			}else{
				resetButtonTween.restart();
				incorrect.visible = true;
				disableQuiz();
				pass();
			}
		}*/

		function disableQuiz(){
			submit.visible = false;
			sls.mouseEnabled = false;
		}

		function pass(){
			_this.dispatchEvent(Page.COUNT_PERCENT);
			_this.dispatchEvent(Page.HANDLE_COMPLETE);
		}

		function single(e){
			if(this.custom.currentSelect === e.target) return;

			submitTween.progress()===0 && submitTween.restart();

			if(this.custom.currentSelect){
				filterObj(this.custom.currentSelect,true);
			}

			filterObj(e.target);
			this.custom.currentSelect = e.target;
		}

		function multi(e){
			submitTween.progress()===0 && submitTween.restart();
			filterObj(e.target,e.target.isSelected);
			e.target.isSelected = !e.target.isSelected;
		}

		function filterObj(obj,clear){
			if(clear){
				while(obj.filters.length > 0) obj.filters.pop();
			}else{
				obj.filters.push(cf);
			}

			obj.updateCache();
		}
	}

	p.toDrag = function(dragElements,submit,correct,incorrect,other){
		var dragger = this.addChild(new createjs.Container);
		var i, de;
		var dragTargets = [];
		var dragCount = 0;
		var submitTween;
		var _this = this;
		var resetButton = this.getObj(other.resetButton);
		var resetButtonTween = TweenLite.from(resetButton,0.5,{alpha:0,y:'+=30'});

		resetButton.on('click',resetQuiz);

		submit = this.getObj(submit);
		correct = this.getObj(correct);
		incorrect = this.getObj(incorrect);
		other.hideOnAnswer = this.getObj(other.hideOnAnswer);

		submit.on('click',function(){
			var d;
			other.hideOnAnswer.visible = false;
			for(var i=0;i<dragger.numChildren;i++){
				d = dragger.getChildAt(i);
				if(d._target!==d.brother){
					onIncorrect();
					return;
				}
			}
			onCorrect();
		});

		submitTween = TweenLite.from(submit,0.5,{alpha:0,y:'+=30'}).pause();

		for(i=0;i<dragElements.length;i++){
			de = dragElements[i];
			de.drag = this.getObj(de.drag);
			de.target = this.getObj(de.target);

			dragger.addChild(de.drag);
			de.drag._target = de.target;
			de.drag.ox = de.drag.x;
			de.drag.oy = de.drag.y;
			dragTargets.push(de.target);
		}

		dragger.cursor = 'pointer';
		dragger.on('mousedown',drag);
		dragger.on('pressmove',drag);
		dragger.on('pressup',drag);

		this.on('added',resetQuiz);

		function resetQuiz(){
			var d;
			resetButtonTween.seek(0).pause();
			other.hideOnAnswer.visible = true;
			submit.visible = true;
			submitTween.seek(0).pause();
			dragger.mouseEnabled = true;
			correct.visible = incorrect.visible = false;
			dragCount = 0;
			for(var i=0;i<dragTargets.length;i++){
				dragTargets[i].brother = null;
			}

			for(var i=0;i<dragger.numChildren;i++){
				d = dragger.getChildAt(i);
				d.x = d.ox;
				d.y = d.oy;
				d.brother = null;
			}			
		}

		function onCorrect(){
			effectSound('right');
			correct.visible = true;
			pass();
			disableQuiz();
		}


		function onIncorrect(){
			effectSound('wrong');
			incorrect.visible = true;
			resetButtonTween.restart();
			disableQuiz();
			// pass();
		}

/*		function onIncorrect(){
			effectSound('wrong');
			incorrect.visible = true;
			resetButtonTween.restart();
			disableQuiz();
			pass();
		}*/

		function disableQuiz(){
			submit.visible = false;
			dragger.mouseEnabled = false;
		}

		function pass(){
			_this.dispatchEvent(Page.COUNT_PERCENT);
			_this.dispatchEvent(Page.HANDLE_COMPLETE);
		}

		function drag(e){
			var dt;

			if(e.type==='pressup'){
				for(var i=0;i<dragTargets.length;i++){
					dt = dragTargets[i];
					if(Math.abs(dt.x - e.localX)<dt.getBounds().width/2 && Math.abs(dt.y - e.localY)<dt.getBounds().height/2){
						if(dt.brother){
							dt.brother.x = dt.brother.ox;
							dt.brother.y = dt.brother.oy;
							dt.brother.brother = null;
							submitTween.progress() > 0 && submitTween.seek(0).pause();
							dragCount --;
						}

						e.target.x = dt.x;
						e.target.y = dt.y;
						e.target.brother = dt;
						dt.brother = e.target;
						dragCount ++;
						dragCount === dragTargets.length && submitTween.restart();
						return;
					}
				}

				submitTween.progress() > 0 && submitTween.seek(0).pause();
				e.target.x = e.target.ox;
				e.target.y = e.target.oy;

				return;
			}

			if(e.type==='mousedown'){
				dragger.setChildIndex(e.target,dragger.numChildren-1);
				if(e.target.brother){
					e.target.brother.brother = null;
					dragCount --;
				} 
				e.target.brother = null;
			}
			e.target.set({x:e.localX,y:e.localY});
		}

	}

	p.getObj = function(arg){
		return typeof(arg)==='string'? this.getInstance(arg):arg;
	}

	p.addCaption = function(caps){
		 var _cap;
		 var tl = new TimelineLite;
		 var caption = new captionText;

		 caption.x = 650;
		 caption.y = 593;

		 for(var i=0;i<caps.length;i++){
		 	_cap = caps[i];

		 	if(typeof(_cap)==='number'){
		 		tl.set(caption,{text:''},_cap);
		 	}else{
			 	tl.set(caption,{text:_cap[1]},_cap[0]);
		 	}
		 }

		 tl.pause();

		 this.addChild(caption);
		 this.custom.captionTimeline = tl;
		 this.custom.captionText = caption;
	}

	p.pauseCaption = function(mode){
		if(!this.custom.captionTimeline) return;
		let func = mode==='resume'? 'resume':'pause';
		this.custom.captionTimeline[func]();
		this.custom.captionTimeline_en[func]();
	}

	p.addEnglishCaption = function(caps){
		 var _cap;
		 var tl = new TimelineLite;
		 var caption = new captionText('','TimesNewRoman');

		 caption.x = 650;
		 caption.y = 620;

		 for(var i=0;i<caps.length;i++){
		 	_cap = caps[i];

		 	if(typeof(_cap)==='number'){
		 		tl.set(caption,{text:''},_cap);
		 	}else{
			 	tl.set(caption,{text:_cap[1]},_cap[0]);
		 	}
		 }

		 tl.pause();

		 this.addChild(caption);
		 this.custom.captionTimeline_en = tl;
		 this.custom.captionText_en = caption;
	}

	function hideObj(timeline,obj, duration,mode,at){
		mode = typeof(mode)==='string'? preferAnimate(mode):mode;
		timeline.to(obj,duration || projectData.duration,mode,at);
	}

	Page = createjs.promote(page,'Container');
})();

(function(){
	var size = 20, font = 'Arial', color = 'black';
	var allCaptions = [];

	function caption(text,_font){
		text = text || '';
		this.text_constructor(text,size.toString() + 'px ' + (_font || font),color);
		this.textAlign = 'center';
		this.textBaseline = 'middle';

		allCaptions.push(this);
	}

	caption.showOrHide = function(show){
		for(var i=0;i<allCaptions.length;i++){
			allCaptions[i].visible = show;
		}
	}

	var p = createjs.extend(caption,createjs.Text);

	captionText = createjs.promote(caption,'text');
})();

function orderAnimate(objs,tweens,opts){
	opts = opts || {};
	var tl = opts.tween || new TimelineLite;
	var mode;
	var at;

	for(var i=0;i<objs.length;i++){
		tw = tweens[i] || tw;
		if(typeof(tw)==='string'){
			mode = tw;
			tw = undefined;
		}else if(typeof(tw)==='object'){
			mode = tw.mode || mode;
			at = tw.at;
			delete tw.mode;
		}
		tl.from(objs[i],projectData.duration,preferAnimate(mode,tw),at);
	};
	tl.stop();
	return tl;
}

function preferAnimate(str,opts){
	opts = opts || {};
	var an = {
		scaleOut:{scaleX:2,scaleY:2},
		scaleIn:{scaleX:0,scaleY:0},
		floatLeft:{x:'-=50'},
		floatRight:{x:'+=50'},
		floatTop:{y:'-=50'},
		floatBottom:{y:'+=50'},
		fade:{alpha:0}
	};
	if(!opts.nofade) an[str].alpha = 0;
	if(opts.delay) an[str].delay = opts.delay;

	return an[str];
}