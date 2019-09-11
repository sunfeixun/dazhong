function createUI(_parent){
	var p = new Page('ui');
	_parent.addChild(p);

	var inst = p.createElement([
			{type:'container',instance:'buttons',attr:{cursor:'pointer'},on:[['click',uiClick],['mouseover',showDesc],['mouseout',showDesc]]},
			{type:'statement',statement:{x:50,addTo:'buttons',createHitArea:true}},
			{name:'UI_menu',attr:{y:51,funcName:'menu'},instance:'menu'},
			{name:'UI_music',attr:{y:126,funcName:'music'},instance:'music'},
			{name:'UI_book',attr:{y:202,funcName:'book'},instance:'book',},
			{name:'UI_caption',attr:{y:278,funcName:'caption'},instance:'caption'},
			{name:'UI_English',attr:{y:354,funcName:'english'},instance:'en'},
			{name:'UI_prev',attr:{y:590,funcName:'prev'},instance:'prev'},
			{name:'UI_next',attr:{y:590,x:1232,funcName:'next'},instance:'next'},
			{type:'statement',statement:{x:97,visible:false,noCenter:true}},
			{name:'UI_menu_desc',attr:{y:48},instance:'menudesc'},
			{name:'UI_music_desc',attr:{y:121},instance:'musicdesc'},
			{name:'UI_book_desc',attr:{y:197},instance:'bookdesc'},
			{name:'UI_caption_desc',attr:{y:277},instance:'captiondesc'},
			{name:'UI_English_desc',attr:{y:345},instance:'endesc'},
			{name:'UI_prev_desc',attr:{y:541},instance:'prevdesc'},
			// {name:'UI_next_desc',attr:{x:1049,y:541,regX:200},instance:'nextdesc'},
			{name:'UI_next_desc',attr:{x:1049,y:541},instance:'nextdesc',enprops:{x:1049-60}},
		]);

	inst.menu.desc = inst.menudesc;
	inst.music.desc = inst.musicdesc;
	inst.book.desc = inst.bookdesc;
	inst.prev.desc = inst.prevdesc;
	inst.next.desc = inst.nextdesc;
	inst.caption.desc = inst.captiondesc;
	inst.en.desc = inst.endesc;
	projectData.langButton = inst.en;

	p.enableNext = function(){
		inst.next.gotoAndStop('UI_next');
	}

	projectData.eventer.on('pagechange',onchange);

	function uiClick(e){
		var c_page = Page.getCurrentPage()

		switch(e.target.funcName){
			case 'next':
				e.target.currentAnimation==='UI_next' && Page.nextPage();
				break;
			case 'prev':
				e.target.currentAnimation==='UI_prev' && Page.prevPage();
				break;
			case 'menu':
				projectData.loader.pauseSound();
				Page.getMenu().visible = true;
				c_page.custom.mainTween && c_page.custom.mainTween.pause();
				c_page.pauseCaption();
				typeof(c_page.custom.pause)==='function' && c_page.custom.pause();
				break;
			case 'caption':
				captionText.showOrHide(switchGray(e.target)==='normal');
				break;
			case 'music':
				switchGray(e.target);
				playBgm();
				break;
			case 'english':
				switchGray(e.target);
				convertEn.switchLang();
				break;
		}

		function switchGray(img){
			var ca = img.currentAnimation

			if(ca.indexOf('_gray')<0){
				img.gotoAndStop(ca + '_gray');
				return 'gray';
			}else{
				img.gotoAndStop(ca.replace('_gray',''));
				return 'normal';
			}
		}
	}
	
	function showDesc(e){
		if(!e.target.desc) return;
		e.target.desc.visible = e.type === 'mouseover';
	}

	function onchange(){
		inst.prev.visible = Page.getIndex() !== 1;
		inst.next.visible = !Page.isEnd();
		inst.prev.gotoAndStop(Page.getIndex()===1? 'UI_prev_gray':'UI_prev');
		inst.next.gotoAndStop(Page.isEnd() || Page.getCurrentPage().custom.preventNext? 'UI_next_gray':'UI_next');
	}
}

function createMenu(_parent){
	var p = new Page('menu');
	var m;
	var inst = p.createElement([
			{name:'contentBg',noCenter:true,attr:{mouseEnabled:false}},
			{type:'statement',statement:{y:257}},
			{name:'menu_tab1',attr:{x:270,page:1},instance:'m1'},
			{name:'menu_tab2',attr:{x:424,page:5},instance:'m2'},
			{name:'menu_tab3',attr:{x:577,page:8},instance:'m3'},
			{name:'menu_tab4',attr:{x:731,page:10},instance:'m4'},
			{name:'menu_tab5',attr:{x:885,page:11},instance:'m5'},
			{name:'menu_tab6',attr:{x:1039,page:18},instance:'m6'},
			{name:'UI_home',attr:{x:1264,y:37,page:0},instance:'home'},
			{name:'UI_home_desc',attr:{x:1255,y:107,visible:false},instance:'homedesc'}
		]);

	inst.home.on('mouseover',onOut);
	inst.home.on('mouseout',onOut);
	p.cursor = 'pointer';
	p.on('click',onclick);
	p.visible = false;

	_parent.addChild(p);

	for(var i=1;i<=6;i++){
		m = inst['m'+i];
		m.linkedPage = Page.getPageByIndex(m.page);
		m.mouseEnabled = false;
		m.linkedPage.on('added',unLockMenu,m,true);
	}

	return p;

	function unLockMenu(){
		var anima = this.currentAnimation;
		this.mouseEnabled = true;

		anima = anima.indexOf('_en') === -1 ? anima + '_unlock':anima.replace('_en','') + '_unlock_en';

		this.gotoAndStop(anima);
		this.regX = this.getBounds().width/2;
		this.regY = this.getBounds().height/2;
	}


	function onclick(e){
		var c_page = Page.getCurrentPage();

		if(Page.gotoPage(e.target.page)!=='jump'){
			projectData.loader.resumeSound();
			c_page.custom.mainTween && c_page.custom.mainTween.resume();
			c_page.pauseCaption('resume');
			typeof(c_page.custom.resume) === 'function' && c_page.custom.resume();
		}

		e.currentTarget.visible = false;
	}

	function onOut(e){
		inst.homedesc.visible = e.type==='mouseover';
	}
}

function createPercent(_parent){
	var p = new Page('percent');
	_parent.addChild(p);

	var arr = [];
	var sumX = 12.84;
	var _t;
	var inst = p.createElement([
			{name:'UI_percent_bg',attr:{x:1109,y:45}},
			{name:'UI_percent_t',attr:{x:966,y:45,visible:false},instance:'t'},
			{type:new createjs.Text('0%','18px agencyr','white'),attr:{x:1254,y:37,textAlign:'center'},instance:'txt'}
		]);

	arr.push(inst.t);

	for(var i=1;i<20;i++){
		_t = inst.t.clone();
		_t.x =  inst.t.x + i*sumX;
		p.addChild(_t);
		arr.push(_t);
	}

	p.custom.percentTxt = inst.txt;
	p.custom.arr = arr;
}

function playBgm(){
	if(!projectData.bgm){
		projectData.bgm = createjs.Sound.play('bgm.mp3');
	}else{
		projectData.bgm.paused = !projectData.bgm.paused;
	}
}

function effectSound(str){
	var es = projectData.effectSound;

	if(!es[str]){
		es[str] = createjs.Sound.play(str + '.mp3');
		es[str].play();
	}else{
		es[str].position = 0;
		es[str].play();
	}

}