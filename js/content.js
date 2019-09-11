function buildPages(e){
	var dura = projectData.duration;
	var sprite = e.target.getSprite('SpriteImages',true);
	Page.setLoader(e.target);
	Page.setSprite(sprite);
	Page.setMainShower(projectData.shower);
	projectData.container.addChildAt(sprite.contentBg.set({regX:0,regY:0}),0);
	projectData.shower.mask = new createjs.Shape(new createjs.Graphics().r(0,0,projectData.width,projectData.height));

	var submitAttr = {x:940,y:485,cursor:'pointer'};

	// 

	(function(){
		var p = new Page(1);
		var arr = [];

		p.createElement([
				{type:'img',name:'p1bg',noCenter:true},
				{statement:{addToArray:arr}},
				{type:'img',name:'p1fadongji',attr:{x:263,y:293}},
				{type:'img',name:'p1title',attr:{x:836,y:268}},
				{type:'img',name:'p1start',attr:{x:736,y:451,cursor:'pointer'},on:['click',Page.nextPage]},
				{name:'p1tiptime',attr:{x:1207,y:630},enprops:{x:1000}}
			]);

		p.custom.tween = orderAnimate(arr,['scaleOut','floatTop','floatBottom']);
		p.custom.audio = '1';
		p.custom.mainTween = p.custom.tween;

		p.addCaption([0,[0.5,'你好，欢迎来到《质量意识-过程及产品审核》课程！'],5.3]);
		p.addEnglishCaption([0,[0.5,'Hello！ Welcome to lesson 2'],
			[2,'of series course in quality awareness, “Process and Product Audit”.'],
			5.3]);

	})();

	(function(){
		var p = new Page(2);

		var inst = p.createElement([
				// {name:'uibg',noCenter:true},
				{statement:{x:311,noCenter:true}},
				{name:'p2board',attr:{x:644,y:313},noCenter:false,tween:{showMode:'floatBottom'}},
				{name:'p2t1',attr:{y:218},tween:{showMode:'floatBottom',showAt:1.6}},
				{name:'p2t2',attr:{y:290},tween:{showMode:'floatBottom',showAt:4}},
				{name:'p2t3',attr:{y:363},tween:{showMode:'floatBottom',showAt:6.8}}
			], new TimelineLite);
		p.custom.audio = '2';

		p.addCaption([
			[0.1,'通过本课程的学习，你可以复述出过程的概念'],
			[4,'能够描述出过程审核的目的'],
			[6.8,'还能够复述出产品审核的要点'],
			9.3]);

		p.addEnglishCaption([
			[0.1,'Through this course, you can retell the concept of the process,'],
			[4,'describe the purpose of process audit,'],
			[6.8,'and be able to retell the key points of product audit.'],
			9.3]);

	})();

	(function() {
		var p = new Page(3);

		var arr = [];
		p.createElement([
				{statement:{addToArray:arr}},
				{name:'s3_bg',attr:{x:376,y:324}},
				{name:'s3_title',attr:{x:678,y:154}},
				{name:'s3_t1',attr:{x:866,y:261}},
				{name:'s3_t2',attr:{x:868,y:357}},
				{name:'s3_t3',attr:{x:868,y:452}}
			]);

		p.custom.audio = '3';
		p.custom.tween = orderAnimate(arr,[
				'scaleOut',
				'floatRight',
				{mode:'floatRight',at:2.9},
				{at:9.1},
				{at:14.7}
			]);

		p.custom.mainTween = p.custom.tween;

		p.addCaption([
			[0.1,'上一节，我们学习了质量管理体系，我们追求有竞争优势的质量'],
			[5.4,'实施零缺陷战略，超越顾客期望'],
			[9.1,'以先进的技术，科学的管理和持续改进作为质量的保障'],
			[14.7,'以节能环保的产品，绿色生产作为创建和谐社会的责任'],
			19.9]);

		p.addEnglishCaption([
			[0.1,'In last lesson，we learn quality management system.'],
			[5.4,'We pursue the quality with competitive advantage, implement zero-defect strategy ,beyond customer expectations'],
			[9.1,'With advanced technology, scientific management and continuous improvement as the guarantee of quality.'],
			[14.7,'Keep energy conservation and environment protection products,'],
			[17.4,'green production as a responsibility to create a harmonious society.'],
			19.9]);

	})();

	(function() {
		var p = new Page(4);
		var arr = [];
		var arr1 = [];
		var fade = preferAnimate('fade');

		var inst = p.createElement([
				{statement:{addToArray:arr,encenter:true}},
				{name:'s4_wenhao',attr:{x:372,y:254}},
				{name:'s4_sym1',attr:{x:365,y:280}},
				{name:'s4_gaijin',attr:{x:365,y:466}},
				{name:'s4_person',attr:{x:900,y:340}},
				{name:'s4_xuyao',attr:{x:754,y:200}},
				{statement:{addToArray:arr1,encenter:true}},
				{name:'s4_sym2',attr:{x:365,y:280}},
				{name:'s4_guke',attr:{x:365,y:467}},
				{name:'s4_bujius',attr:{x:753,y:200}}
			]);

		var tl = orderAnimate(arr,[
				{mode:'fade',at:0},null,null,{mode:'floatRight',at:4}
			]);
		tl.pause();

		tl.to([arr[1],arr[2]],dura,preferAnimate('fade'),7)
			.from([arr1[0],arr1[1]],dura,preferAnimate('fade'))
			.to(arr[4],dura,preferAnimate('fade'),10.5)
			.from(arr1[2],dura,preferAnimate('fade'));

		p.custom.audio = '4';
		p.custom.mainTween = tl;

		p.addCaption([
			[0.3,'那么，如何做到持续改呢？'],
			[4,'没错，需要定期收集顾客的反馈。'],
			[7.2,'那你的顾客反馈来自哪里呢？'],
			[10.7,'顾客反馈啊？不就是主机厂OEM的反馈嘛！'],	15]);

		p.addEnglishCaption([
			[0.3,'So how do you we ensure continuous improvement?'],
			[4,'Yes, customer feedback needs to be collected regularly.'],
			[7.2,'So where does your customer feedback come from?'],
			[10.7,'Customer feedback? Isn’t it the OEM feedback ?'],15]);		
	})();

	(function() {
		var p = new Page(5);
		var arr1 = [], arr2 = [];
		var inst = p.createElement([
				{name:'s5_title',attr:{x:655,y:82},instance:'title'},
				{statement:{addToArray:arr1}},
				{name:'s5_o1',attr:{x:251,y:297}},
				{name:'s5_o2',attr:{x:592,y:297}},
				{name:'s5_person',attr:{x:982,y:431}},
				{name:'s5_wenhao',attr:{x:855,y:225}},
				{name:'s5_budeng',attr:{x:421,y:264}},
				{statement:{addToArray:arr2}},
				{name:'s5_shuru',attr:{x:240,y:331}},
				{name:'s5_zhuanhuan',attr:{x:449,y:331}},
				{name:'s5_shuchu',attr:{x:661,y:331}},
				{name:'s5_ziyuan',attr:{x:449,y:441}},
				{name:'s5_kongzhi',attr:{x:449,y:218}},
				{name:'s5_fankui',attr:{x:437,y:479},encenter:true},
				{name:'s5_guoc',attr:{x:855,y:225}}
			]);

		var tl = orderAnimate(arr1,[
			{mode:'floatLeft',at:0},'floatRight','floatRight','floatRight','fade',{mode:'scaleOut',at:1}]);

		tl.to([arr1[0],arr1[1],arr1[4]],dura,{alpha:0},11)
			.from(arr2[0],dura,preferAnimate('floatLeft'),11.5)
			.from(arr2[1],dura,preferAnimate('floatLeft'),12.5)
			.from(arr2[2],dura,preferAnimate('floatLeft'),13.4)
			.from([arr2[3],arr2[4],arr2[5]],dura,{alpha:0})
			.set(arr1[3],{alpha:0})
			.to(arr1[3],dura,{alpha:0})
			.from(arr2[6],dura,{alpha:0},'-=0.5');

		tl.pause();
		p.custom.mainTween = tl;
		p.custom.audio = '5';

		p.addCaption([
			[0.2,'当然不完全是'],
			[1.7,'看来，你对“过程”的概念还不了解。'],
			[4.7,'如同一个装配线'],
			[6.4,'从开始的缸体上线，到最后经过测试合格的整台发动机下线'],
			[11.6,'有输入、有转换、有输出，而这就是一个过程'],
			16.5]);

		p.addEnglishCaption([
			[0.2,'Not exactly!'],
			[1.7,'It seems that you are not familiar with the concept of process.'],
			[4.7,'Taking an assembly line for example,'],
			[6.4,'from the beginning of the cylinder block on-line, to the final test of the entire engine off-line,'],
			[11.6,'it includes inputs, conversion, output, which is a process.'],
			16.5]);

	})();

	(function() {
		var p = new Page(6);

		p.createElement([
				{name:'s6_title',attr:{x:655,y:82},tween:{showMode:'floatTop'}},
				{name:'s6_1',attr:{x:296,y:303},tween:{showMode:'floatBottom'}},
				{name:'s6_2',attr:{x:467,y:303},tween:{showMode:'floatLeft'}},
				{name:'s6_3',attr:{x:638,y:303},tween:{showMode:'floatBottom'}},
				{name:'s6_4',attr:{x:1045,y:303},tween:{showMode:'floatBottom'}},
				{name:'s6_5',attr:{x:1045,y:438},tween:{showMode:'floatBottom'},encenter:true},
				{name:'s6_6',attr:{x:840,y:347},tween:{showMode:'floatLeft',showAt:4.4}},
				{name:'s6_7',attr:{x:840,y:275},tween:{showMode:'floatRight',showAt:8.5}}
			],new TimelineLite);

		p.custom.audio = '6';

		p.addCaption([
			[0.2,'所以，对你而言，不但主机厂是你的顾客'],
			[4.1,'你的下一道工序，也是你的顾客，是你的内部顾客'],
			[8.5,'下一道工序给你的反馈，也是顾客反馈'],
			12.5]);

		p.addEnglishCaption([
			[0.2,'Therefore, for you, not only the original equipment manufacturer is your customer,'],
			[4.7,'the following process next to you is also your customer which is your internal customer.'],
			[9,' Feedback from your next process is also customer feedback.'],
			12.5]);
	})();

	(function() {
		var p = new Page(7);

		p.createElement([
				{name:'s7_title0',attr:{x:655,y:82},tween:{showMode:'floatTop'}},
				{name:'s7_person',attr:{x:1056,y:387},tween:{showMode:'floatRight'}},
				{name:'s7_title',attr:{x:488,y:196},tween:{showMode:'floatTop'}},
				{name:'s7_content',attr:{x:483,y:406},tween:{showMode:'floatBottom'}}
			],new TimelineLite);

		p.custom.audio = '7';

		p.addCaption([
			[0.4,'明确了你的顾客，接下来就是想办法让你的顾客满意'],
			[4.3,'如何实现？'],
			[6.4,'通过过程管理来实现'],
			8]);

		p.addEnglishCaption([
			[0.4,'Since you have identified your customers, the next step is to find ways to keep your customers satisfied.'],
			[4.3,'How?'],
			[6.4,'Through process management.'],
			8]);

	})();

	(function() {
		var p = new Page(8,false);
		var count;
		var inst = p.createElement([
				{name:'s8_title',attr:{x:656,y:82},tween:{showMode:'floatTop'}},
				{name:'s8_content',attr:{x:596,y:356},tween:{showMode:'floatLeft'},encenter:true},
				{type:'container',instance:'con',tween:{showMode:'floatRight'},attr:{cursor:'pointer'},on:['click',onclick]},
				{name:'s8_click1',attr:{x:1108,y:208},addTo:'con',instance:'click1',createHitArea:true,encenter:true},
				{name:'s8_click2',attr:{x:1108,y:490},addTo:'con',instance:'click2',createHitArea:true,encenter:true},
				{name:'s8_click1show',attr:{x:880,y:209,alpha:0},instance:'clickshow1'},
				{name:'s8_click2show',attr:{x:880,y:491,alpha:0},instance:'clickshow2'}
			],new TimelineLite);

		p.custom.reset = function(){
			count = 0;
			inst.click1.mouseEnabled = inst.click2.mouseEnabled = true;
			inst.clickshow1.alpha = inst.clickshow2.alpha = 0;			
		}

		inst.click1.show = inst.clickshow1;
		inst.click2.show = inst.clickshow2;

		p.custom.audio = '8';

		function onclick(e){
			TweenLite.to(e.target.show,dura,{alpha:1});
			e.target.mouseEnabled = false;
			count ++;
			if(count===2){
				p.dispatchEvent(Page.COUNT_PERCENT);
				p.dispatchEvent(Page.HANDLE_COMPLETE);
			}
		}

		p.addCaption([
			[0.3,'通常，过程管理就是管理过程的有效性和过程的效率'],
			5.5]);

		p.addEnglishCaption([
			[0.3,'In general, process management is about managing the effectiveness and efficiency of processes.'],
			5.5]);

	})();

	(function() {
		var p = new Page(9);
		var inst = p.createElement([
				{type:'container',instance:'con'},
				{name:'s9_title',attr:{x:655,y:82},tween:{showMode:'floatTop'}},
				{statement:{addTo:'con'}},
				{name:'s9_person',attr:{x:1055,y:406},tween:{showMode:'floatRight'}},
				{name:'s9_tab1',attr:{x:455,y:188},tween:{showMode:'fade'}},
				{name:'s9_tab2',attr:{x:455,y:272},tween:{showMode:'floatTop',showAt:2.5}},
				{name:'s9_brac1',attr:{x:455,y:350},tween:{showMode:'floatTop',showAt:4}},
				{name:'s9_tab3',attr:{x:236,y:404},tween:{showMode:'scaleOut',showAt:4.5}},
				{name:'s9_tab4',attr:{x:455,y:404},tween:{showMode:'scaleOut',showAt:7.1}},
				{name:'s9_tab5',attr:{x:686,y:404},tween:{showMode:'scaleOut',showAt:'+=1'}},
				{name:'s9_brac2',attr:{x:455,y:459},tween:{showMode:'floatTop',showAt:10}},
				{name:'s9_tab6',attr:{x:455,y:512},tween:{showMode:'scaleOut',showAt:12}},
				{type:'statementOff'},
				// {name:'s9_title',attr:{x:655,y:81},tween:{showMode:'floatRight',showAt:28,hideObj:{obj:'con',mode:'fade',at:28}}},
				{name:'s9_map',attr:{x:670,y:346},encenter:true,tween:{showMode:'floatLeft',showAt:28,hideObj:{obj:'con',mode:'fade',at:28}}}
			],new TimelineLite);

		p.custom.audio = '9';

		p.addCaption([
			[0.5,'而过程管理的最终目的是消除过程中的浪费'],
			[4.1,'比如生产线运行过程中的停台、物料等待等都是效率的损失'],
			[10.2,'这些损失对过程来说是不增值的'],
			[13.8,'对购买这台发动机的顾客来说不愿意为这部分浪费去付钱'],
			[19.1,'而过程的输出结果是让顾客满意'],
			[22.1,'因此生产商就要尽量让生产过程是增值过程'],
			[27.7,'所以我们提出了零缺陷战略'],
			[30.8,'争取让整个过程的各步骤都不产生缺陷'],
			34.5]);

		p.addEnglishCaption([
			[0.5,'The ultimate goal of process management is to eliminate waste in the process.'],
			[4.1,'For example, the stop of the production line and the material waiting are all efficiency losses,'],
			[10.2,' which are not value-added for the process,'],
			[13.8,'and those customers who buy the engine are not willing to pay for the waste.'],
			[19.1,'The output of the process is to satisfy the customer,'],
			[22.1,'so the manufacturer should try its best to make sure the production process is a value-added process.'],
			[27.7,'So, we have come up with a zero- defect strategy,'],
			[30.8,'trying to make sure each step of  the whole process has no defects.'],
			34.5]);

	})();

	(function() {
		var p = new Page(10);

		var inst = p.createElement([
				{name:'s10_title',attr:{x:655,y:81},tween:{showMode:'floatRight'}},
				{type:'container',instance:'con'},
				{statement:{addTo:'con'}},
				{name:'s10_person',attr:{x:1055,y:406},tween:{showMode:'floatRight'}},
				{name:'s10_txt1',attr:{x:456,y:169},tween:{showMode:'floatTop',showAt:3}},
				{name:'s10_tab1',attr:{x:449,y:246},tween:{showMode:'scaleOut',showAt:12}},
				{name:'s10_ar1',attr:{x:376,y:297},tween:{showMode:'floatTop',showAt:13.5}},
				{name:'s10_tab2',attr:{x:317,y:345},tween:{showMode:'scaleOut'}},
				{name:'s10_ar2',attr:{x:516,y:297},tween:{showMode:'floatTop',showAt:15.2}},
				{name:'s10_tab3',attr:{x:581,y:345},tween:{showMode:'scaleOut'}},
				{name:'s10_tab4',attr:{x:452,y:410},tween:{showMode:'scaleOut',showAt:16.5}},
				{name:'s10_ar3',attr:{x:493,y:462},tween:{showMode:'floatTop'}},
				{name:'s10_tab5',attr:{x:444,y:515},tween:{showMode:'floatBottom'}},
				{type:'statementOff'},
				{name:'s10_subtitle',attr:{x:940,y:173},tween:{hideObj:{obj:'con',mode:'scaleOut',at:19},showMode:'floatRight'}},
				{name:'s10_map',attr:{x:498,y:357},tween:{showMode:'scaleIn',showAt:20.1}},
				{name:'s10_t1',attr:{x:1003,y:217},tween:{showMode:'floatRight'}},
				{name:'s10_t2',attr:{x:1023,y:289},tween:{showMode:'floatRight',showAt:23.3}},
				{name:'s10_t3',attr:{x:1023,y:395},tween:{showMode:'floatRight',showAt:31}},
			],new TimelineLite);

		inst.con.x = inst.con.regX = inst.con.getBounds().width/2;
		inst.con.y = inst.con.regY = inst.con.getBounds().height/2;

		p.custom.audio = '10';

		p.addCaption([
			[0.4,'当然，过程管理离不开审核'],
			[3.1,'过程审核是指对所规定产品的开发和实现过程及其有效性进行公正分析与评价的一种方法'],
			[12,'过程审核的目的是检查受评估过程/过程步骤与要求和规范是否一致'],
			[19.3,'若发现有偏差'],
			[20.8,'则应作为审核发现进行记录'],
			[23.4,'并基于受审核组织内部或供应链内的产品风险或过程风险进行评价'],
			[31.1,'如果审核发现表明会产生预期的不符合要求的产品'],
			[35.8,'评价就必须考虑因此导致的风险'],
			39.4]);

		p.addEnglishCaption([
			[0.4,'Of course, process management also involves audit.'],
			[3.1,'Process audit is a method of fair analysis and evaluation of the development and implementation process'],
			[7.4,'and its effectiveness of specified products.'],
			[12,'The purpose of a process audit is to check'],
			[13.9,'that the assessed process/process steps are consistent with requirements and specifications.'],
			[19.3,'Deviations should be recorded as audit findings and evaluated based on product or process risks'],
			[23.4,'within the audited organization or within the supply chain.'],
			[31.1,'If audit finds that an expected nonconforming product will be produced,'],
			[35.8,'the evaluation must take into account the risks that may result in.'],
			39.4]);

	})();

	(function(){
		var p = new Page(11,false);

		p.createElement([
				{name:'s11_bg',attr:{x:655,y:318}},
				{name:'s11_bg1',attr:{x:416,y:305}},
				{name:'s11_c1',attr:{x:702,y:184,regX:0},instance:'c1',hascache:true},
				{name:'s11_c2',attr:{x:702,y:245,regX:0},instance:'c2',hascache:true},
				{name:'s11_c3',attr:{x:702,y:307,regX:0},instance:'c3',hascache:true},
				{name:'s11_c4',attr:{x:702,y:368,regX:0},instance:'c4',hascache:true,enprops:{y:380}},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'s11_wrong',attr:{x:569,y:507},instance:'wrong',encenter:true},
				{name:'s11_right',attr:{x:553,y:507},instance:'right',encenter:true},
				{name:'s11_tryagain',attr:{x:510,y:507},instance:'tryagain',encenter:true},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			],new TimelineLite);

		p.toSelectQuiz({
			options:['c1','c2','c3','c4'],
			correctAnswer:3,
		},'submit','right','wrong',{wrongLimit:2,tryAgain:'tryagain',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});
		p.custom.audio = '11';
		
		p.addCaption([
			[0.4,'为了让顾客满意，我们需要尝试从顾客角度来审视产品'],
			[5.6,'你觉得，产品审核是什么呢？'],
			8]);

		p.addEnglishCaption([
			[0.4,"In order to satisfy the customer, we need to try to examine the product from the customer's perspective."],
			[5.6,'What do you think a product audit is?'],
			8]);

	})();

	(function(){
		var p = new Page(12);

		p.createElement([
				{name:'s12_person',attr:{x:833,y:422},tween:{showMode:'fade'}},
				{name:'s12_text',attr:{x:500,y:193},tween:{showMode:'scaleIn'}}
			],new TimelineLite);

		p.custom.audio = '12';

		p.addCaption([
			[0.2,'产品审核是从顾客的角度对产品进行独立评估的管理工具'],
			[5.3,'并且保障避免产品和货物缺损的情况出现'],
			8.5]);

		p.addEnglishCaption([
			[0.2,"Product audit is a management tool that independently evaluates products from the customer's perspective"],
			[5.3,"and ensures avoiding product defects."],
			8.5]);
	})();

	(function(){
		var p = new Page(13,false);

		p.createElement([
				{name:'s13_bg',attr:{x:650,y:321}},
				{name:'s13_bg2',attr:{x:429,y:304}},
				{name:'drag_face1',attr:{x:783,y:238},instance:'face1'},
				{name:'drag_face2',attr:{x:910,y:238},instance:'face2'},
				{name:'drag_tip',attr:{x:853,y:350},instance:'tip'},
				{name:'drag_target',attr:{x:315,y:497},instance:'t1'},
				{name:'drag_target',attr:{x:539,y:497},instance:'t2'},
				{name:'s13_right',attr:{x:908,y:298},instance:'right',encenter:true},
				{name:'s13_wrong',attr:{x:911,y:298},instance:'wrong',encenter:true},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			]);

		p.toDrag([{drag:'face1',target:'t1'},{drag:'face2',target:'t2'}],
				'submit','right','wrong',{hideOnAnswer:'tip',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});
		p.custom.audio = '13';
		p.addCaption([
			[0.4,'为了加强审核能力，下面，我们来做一个过程及产品的缺陷识别练习'],
			5.5]);

		p.addEnglishCaption([
			[0.4,'In order to strengthen our audit ability, now, let’s do a process and product defect identification practice.'],
			5.5]);
	})();

	(function(){
		var p = new Page(14,false);

		p.createElement([
				{name:'s14_bg',attr:{x:650,y:321}},
				{name:'s14_bg1',attr:{x:504,y:275}},
				{name:'drag_face1',attr:{x:923,y:238},instance:'face1'},
				{name:'drag_face2',attr:{x:1050,y:238},instance:'face2'},
				{name:'drag_tip',attr:{x:993,y:350},instance:'tip',enprops:{x:980}},
				{name:'drag_target',attr:{x:343,y:456},instance:'t1'},
				{name:'drag_target',attr:{x:665,y:456},instance:'t2'},
				{name:'s14_right',attr:{x:996,y:241},instance:'right',enprops:{x:980}},
				{name:'s14_wrong',attr:{x:996,y:241},instance:'wrong',enprops:{x:980}},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			]);

		p.toDrag([
				{drag:'face1',target:'t1'},
				{drag:'face2',target:'t2'}
			],'submit','right','wrong',{hideOnAnswer:'tip',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});

	})();

	(function(){
		var p = new Page(15,false);

		p.createElement([
				{name:'s15_bg',attr:{x:650,y:321}},
				{name:'s15_bg1',attr:{x:504,y:275}},
				{name:'drag_face1',attr:{x:923,y:238},instance:'face1'},
				{name:'drag_face2',attr:{x:1050,y:238},instance:'face2'},
				{name:'drag_tip',attr:{x:993,y:350},instance:'tip'},
				{name:'drag_target',attr:{x:343,y:456},instance:'t1'},
				{name:'drag_target',attr:{x:665,y:456},instance:'t2'},
				{name:'s15_right',attr:{x:996,y:259},instance:'right',encenter:true},
				{name:'s15_wrong',attr:{x:996,y:259},instance:'wrong',encenter:true},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			]);

		p.toDrag([
				{drag:'face1',target:'t1'},
				{drag:'face2',target:'t2'}
			],'submit','right','wrong',{hideOnAnswer:'tip',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});

	})();

	(function(){
		var p = new Page(16,false);

		p.createElement([
				{name:'s16_bg',attr:{x:650,y:321}},
				{name:'s16_bg1',attr:{x:504,y:275}},
				{name:'drag_face1',attr:{x:923,y:238},instance:'face1'},
				{name:'drag_face2',attr:{x:1050,y:238},instance:'face2'},
				{name:'drag_tip',attr:{x:993,y:350},instance:'tip'},
				{name:'drag_target',attr:{x:343,y:456},instance:'t1'},
				{name:'drag_target',attr:{x:665,y:456},instance:'t2'},
				{name:'s16_right',attr:{x:996,y:223},instance:'right',enprops:{x:955}},
				{name:'s16_wrong',attr:{x:996,y:223},instance:'wrong',enprops:{x:970}},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			]);

		p.toDrag([
				{drag:'face1',target:'t1'},
				{drag:'face2',target:'t2'}
			],'submit','right','wrong',{hideOnAnswer:'tip',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});
	})();

	(function(){
		var p = new Page(17,false);

		p.createElement([
				{name:'s17_bg',attr:{x:650,y:321}},
				{name:'s17_bg1',attr:{x:428,y:275}},
				{name:'drag_face1',attr:{x:783,y:238},instance:'face1'},
				{name:'drag_face2',attr:{x:910,y:238},instance:'face2'},
				{name:'drag_tip',attr:{x:853,y:350},instance:'tip'},
				{name:'drag_target',attr:{x:305,y:497},instance:'t1'},
				{name:'drag_target',attr:{x:539,y:497},instance:'t2'},
				{name:'s17_right',attr:{x:908,y:265},instance:'right',encenter:true},
				{name:'s17_wrong',attr:{x:911,y:265},instance:'wrong',encenter:true},
				{name:'submit',attr:submitAttr,instance:'submit'},
				{name:'resetQuiz',attr:submitAttr,instance:'resetquiz'}
			]);

		p.toDrag([
				{drag:'face1',target:'t2'},
				{drag:'face2',target:'t1'}
			],'submit','right','wrong',{hideOnAnswer:'tip',resetButton:'resetquiz'});

		p.custom.mainTween = new TimelineLite().from(p,0.5,{alpha:0});
	})();

	(function(){
		var p = new Page(18);
		var showTween;
		var inst = p.createElement([
				{type:'container',instance:'images',attr:{cursor:'pointer'},on:['click',clickImgs]},
				{statement:{addTo:'images',encenter:true}},
				{name:'s18_img1',attr:{x:313,y:275,imgid:1}},
				{name:'s18_img2',attr:{x:430,y:275,imgid:2}},
				{name:'s18_img3',attr:{x:1001,y:275,imgid:3}},
				{name:'s18_img4',attr:{x:880,y:275,imgid:4}},
				{name:'s18_img5',attr:{x:653,y:275,imgid:5}},
				{name:'s18_tip',attr:{x:640,y:519,mouseEnabled:false}},

				{type:'container',instance:'showImgs',attr:{x:648,y:321},addTo:p},
				{statement:{addTo:'showImgs',encenter:true}},
				{name:'s18_show1',instance:'s1'},
				{name:'s18_show2',instance:'s2'},
				{name:'s18_show3',instance:'s3'},
				{name:'s18_show4',instance:'s4'},
				{name:'s18_show5',instance:'s5'},
				{name:'s18_close',attr:{cursor:'pointer',x:386,y:-211},instance:'close',on:['click',closeShow]}
			]);

		showTween = TweenLite.from(inst.showImgs,0.7,{scale:0,ease:Back.easeOut,visible:true}).pause();

		function clickImgs(e){
			e.currentTarget.visible = false;
			while(inst.showImgs.numChildren>1) inst.showImgs.removeChildAt(0);
			inst.showImgs.addChildAt(inst['s'+e.target.imgid],0);
			inst.close.visible = true;
			showTween.restart();
		}

		function closeShow(){
			inst.close.visible = false;
			inst.showImgs.visible = false;
			inst.images.visible = true;
		}

		p.custom.mainTween = new TimelineLite().set(inst.close,{visible:false}).set(inst.showImgs,{visible:false}).set(inst.images,{visible:true})
								.from(p,0.5,{alpha:0});

		p.custom.audio = '18';

		p.addCaption([
			[0.2,'本节，我们从“过程”的概念入手'],
			[2.7,'了解了过程审核的目的和基本方法'],
			[6,'通过过程及产品审核中缺陷识别的练习'],
			[9.5,'来掌握审核过程中的要点'],
			12]);

		p.addEnglishCaption([
			[0.2,'In this lesson, we start with the concept of "process"'],
			[2.7,' to understand the purpose and basic methods of process audit.'],
			[6,'We also try to master the key points of audit process'],
			[9.5,' through defect identification practice in process and product audit.'],
			12]);	
	})();

	(function(){
		var p = new Page(19);

		p.createElement([
				{name:'s19_1',attr:{x:384,y:488},tween:{showMode:'floatBottom'}},
				{name:'s19_2',attr:{x:384,y:342},tween:{showMode:'floatBottom',showAt:3.7}},
				{name:'s19_3',attr:{x:384,y:155},tween:{showMode:'floatBottom',showAt:4.5}},
				{name:'s19_4',attr:{x:771,y:478},tween:{showMode:'floatLeft',showAt:6}},
				{name:'s19_5',attr:{x:680,y:342},tween:{showMode:'floatLeft',showAt:8.2}},
				{name:'s19_6',attr:{x:558,y:155},tween:{showMode:'floatLeft',showAt:14.8}},
				{name:'s19_7',attr:{x:1011,y:281},tween:{showMode:'floatBottom',showAt:20}}
			], new TimelineLite);

		p.custom.audio = '19';

		p.addCaption([
			[0.3,'但贯穿始终的还是质量管理体系、过程及产品之间的关系'],
			[6,'通过标准化的流程（体系）来规范生产过程'],
			[9.8,'从而保证生产过程的稳定'],
			[12.4,'而稳定的生产过程又能保证产品质量的合格'],
			[16.5,'因为产品是过程的输出，产品质量的合格才能最终保证顾客满意度的提升'],
			23.5]);

		p.addEnglishCaption([
			[0.3,'At the same time, it is the relationship'],
			[1.8,'between quality management system, process and products that runs through the whole lesson.'],
			[6,' We standardize the production process through a standardized system to ensure its stability,'],
			[9.8,'and the stable production process can ensure the product quality.'],
			[12.4,'Since products are the output of the process,'],
			[16.5,'the qualified product quality can finally ensure the improvement of customer satisfaction.'],
			23.5]);

	})();

	(function(){
		var p = new Page(20);

		p.createElement([
				{name:'s20_1',attr:{x:650,y:280},tween:{showMode:'scaleOut'},encenter:true,enprops:{x:670}}
			],new TimelineLite);

		p.custom.audio = '20';

		p.addCaption([
			[0.3,'感谢你的宝贵时间，希望本课程对你有所帮助！'],
			4.3]);

		p.addEnglishCaption([
			[0.3,'Thank you for your learning and we hope this course is helpful for you!'],
			4.3]);		
	})();

	// Page.gotoPage(18);
	// Page.gotoPage(Page.end());
	// 创建UI
	createUI(projectData.container);
	createPercent(projectData.container);
	createMenu(projectData.container);
	createTipStep(projectData.container);
	Page.hideUI();
	chooseLang();

	function chooseLang(){
		var langCon = projectData.container.addChild(new createjs.Container);
		var chooser = langCon.addChild(new createjs.Container);
		var ch = sprite['lang_ch'], en = sprite['lang_en'];
		var tip = sprite['lang_tip'];
		var tween;

		ch.y = en.y = 230;
		ch.x = 473;
		en.x = 826;
		ch.language = 'ch';
		en.language = 'en';

		tip.x = 650;
		tip.y = 434;
		tween = TweenMax.from(tip,1,{scale:0,alpha:0,repeat:-1,repeatDelay:0.5});

		TweenMax.staggerFrom([ch,en],0.75,{alpha:0,y:'-=30'},0.5);

		new createjs.ButtonHelper(ch,'lang_ch','lang_ch_over');
		new createjs.ButtonHelper(en,'lang_en','lang_en_over');

		chooser.cursor = 'pointer';
		chooser.on('click',function(e){
			convertEn.switchLang(e.target.language);
			langCon.parent.removeChild(langCon);
			langCon.removeAllChildren();
			chooser.removeAllChildren();
			chooser.removeAllEventListeners();

			projectData.langButton.gotoAndStop(e.target===ch? 'UI_English':'UI_English_gray');

			effectSound('click');
			tween.kill();
			playBgm();
			Page.hideUI(true);
			tipStep();
		});

		chooser.addChild(ch,en);
		langCon.addChild(tip,sprite['lang_tiptext'].set({x:650,y:526}));

		langCon.addChild(e.target.getImage('firstpage.jpg')).set({cursor:'pointer'}).on('mousedown',function(e){
			e.target.parent.removeChild(e.target);
		},null,true);
	}

	function createTipStep(con){
		let page = new Page('tipstep');
		let msk = new createjs.Shape(new createjs.Graphics().f('#525D7C').r(0,0,1300,640));
		let count = 1;
		msk.on('click',function(){});

		page.addChild(msk);
		con.addChildAt(page,1);
		page.visible = false;

		// 6次提示
		page.createElement([
				{statement:{x:85,regX:0,visible:false}},
				{type:sprite.firsttip1,attr:{y:89},instance:'tip1'},
				{type:sprite.firsttip2,attr:{y:160},instance:'tip2'},
				{type:sprite.firsttip3,attr:{y:240},instance:'tip3'},
				{type:sprite.firsttip4,attr:{y:311},instance:'tip4'},
				{type:sprite.firsttip5,attr:{y:385},instance:'tip5'},
				{type:sprite.firsttip6,attr:{y:570},instance:'tip6'},
				{type:sprite.firsttip7,attr:{y:570,x:1194},instance:'tip7'},
				{type:sprite.firstcontinue,attr:{x:516,cursor:'pointer',y:89,visible:true},instance:'btn',on:[['mouseover',onover],['mouseout',onover],['click',goon]]}
			]);

		function onover(e){
			e.target.gotoAndStop(e.type === 'mouseover'? e.target.currentAnimation + '_down':e.target.currentAnimation.replace('_down',''));
		}

		function goon(){
			effectSound('click');

			if(count === 6){
				page.parent.removeChild(page);

				for(let i=0;i<page.numChildren;i++){
					page.children[i].removeAllEventListeners();
				}

				Page.getUI().mouseEnabled = true;
				page.removeAllChildren();
				Page.gotoDefaultPage();
				return;
			}

			sprite['firsttip' + count].visible = false;
			count ++;
			sprite['firsttip' + count].visible = true;
			page.getInstance('btn').y = sprite['firsttip' + count].y;
			if(count === 6){
				page.getInstance('btn').x = page.getInstance('tip7').getTransformedBounds().x - 200;
				sprite.firsttip7.visible = true;
			}
		}
	}

	function tipStep(){
		let ft = Page.getFirstTip();
		let count = 1;
		ft.visible = true;
		ft.getInstance('tip7').regX = ft.getInstance('tip7').getBounds().width;
		ft.getInstance('tip1').visible = true;
		Page.getUI().mouseEnabled = false;

		// Page.gotoDefaultPage();
	}
}