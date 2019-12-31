(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(40),c=a.n(o),s=a(9),i=a.n(s),l=a(12),u=a(1),m=a(2),d=a(5),p=a(3),h=a(4),f=a(13),v=a.n(f),b=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"onFormSubmit",value:function(e){e.preventDefault()}},{key:"renderForm",value:function(){var e=this,t=this.props.fromValues.map((function(e){var t="".concat(v.a.startCase(e.type)," - ").concat(e.name),a=e.type?t:e.name;return r.a.createElement("option",{value:a},a)})),a=this.props.toValues.map((function(e){var t="".concat(v.a.startCase(e.type)," - ").concat(e.name),a=e.type?t:e.name;return r.a.createElement("option",{value:a},a)}));return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.onFormSubmit,className:"ui form"},r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"Amount"),r.a.createElement("div",{className:"ui right labeled input"},r.a.createElement("label",{for:"amount",className:"ui label"},"VND"),r.a.createElement("input",{type:"number",placeholder:"Amount",value:this.props.amount,onChange:function(t){return e.props.amountOnChange(t)}}),r.a.createElement("div",{className:"ui basic label"},"000"))),r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"From"),r.a.createElement("select",{className:"ui dropdown",value:this.props.from,onChange:function(t){return e.props.fromOnChange(t)}},r.a.createElement("option",{value:""}),t)),r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"To"),r.a.createElement("select",{className:"ui fluid dropdown",value:this.props.to,onChange:function(t){return e.props.toOnChange(t)}},r.a.createElement("option",{value:""}),a))),r.a.createElement("button",{className:"ui primary button",onClick:this.props.onRecord},"Record"))}},{key:"render",value:function(){return r.a.createElement("div",{className:"ui raised segment"},r.a.createElement("button",{onClick:this.props.changeRecordMode,className:"ui button"},"Record Mode"),!0===this.props.recordMode?this.renderForm():"")}}]),t}(r.a.Component),g=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={currentTime:new Date},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"formatNumber",value:function(e){return e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}},{key:"strROC",value:function(){return"Income"===this.props.cardType?"+".concat(this.formatNumber(this.props.roc)," VND/month"):"Expense"===this.props.cardType?"-sum VND/month":"Asset"===this.props.cardType?"+".concat(this.formatNumber((this.props.balance*this.props.meanGrowth/12).toFixed(0))," VND/month"):void 0}},{key:"strBalance",value:function(){return"Income"===this.props.cardType?r.a.createElement("div",null,"".concat(this.formatNumber((this.props.roc/30/846e5*(new Date-this.props.effectiveDate)).toFixed(0))," VND")):"Expense"===this.props.cardType?r.a.createElement("div",null,"MTD sum VND"):"Asset"===this.props.cardType?r.a.createElement("div",null,"".concat(this.formatNumber(this.props.balance)," + \n            ").concat(this.formatNumber((this.props.balance*this.props.meanGrowth/365/86400/1e3*(new Date-this.props.startDate)).toFixed(0))," VND")):void 0}},{key:"renderButtons",value:function(){var e=this;return"Income"===this.props.cardType?r.a.createElement("div",{className:"extra content",onClick:function(){return e.props.fromOnChange(e.props.name)}},r.a.createElement("div",{className:"ui two buttons"},r.a.createElement("div",{className:"ui basic green button"},"From"),r.a.createElement("div",{className:"ui basic button"}))):"Expense"===this.props.cardType?r.a.createElement("div",{className:"extra content",onClick:function(){return e.props.toOnChange(e.props.name)}},r.a.createElement("div",{className:"ui two buttons"},r.a.createElement("div",{className:"ui basic button"}),r.a.createElement("div",{className:"ui basic red button"},"To"))):"Asset"===this.props.cardType?r.a.createElement("div",{className:"extra content"},r.a.createElement("div",{className:"ui two buttons"},r.a.createElement("div",{className:"ui basic red button",onClick:function(){return e.props.fromOnChange(e.props.name)}},"From"),r.a.createElement("div",{className:"ui basic green button",onClick:function(){return e.props.toOnChange(e.props.name)}},"To"))):void 0}},{key:"render",value:function(){return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"header"},this.props.name),r.a.createElement("div",{className:"meta"},this.strROC()),r.a.createElement("div",{className:"description"},this.strBalance())),!0===this.props.recordMode?this.renderButtons():"")}}]),t}(r.a.Component),O=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=((new Date).getMonth(),(new Date).getFullYear(),this.props.data.map((function(t){return r.a.createElement(g,{cardType:"Income",name:t.name,roc:t.roc,effectiveDate:new Date(t.effectiveDate),recordMode:e.props.recordMode,fromOnChange:e.props.fromOnChange,toOnChange:e.props.toOnChange})})));return r.a.createElement("div",null,r.a.createElement("h2",null,"Income"),r.a.createElement("div",{className:"ui one cards"},t))}}]),t}(r.a.Component),C=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props.data.map((function(t){return r.a.createElement(g,{cardType:"Expense",name:t.name,effectiveDate:new Date(t.effectiveDate),recordMode:e.props.recordMode,fromOnChange:e.props.fromOnChange,toOnChange:e.props.toOnChange})}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Expense"),r.a.createElement("div",{className:"ui two cards"},t))}}]),t}(r.a.Component),E=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props.data.map((function(t){return r.a.createElement(g,{cardType:"Asset",name:"".concat(v.a.startCase(t.type)," - ").concat(t.name),balance:t.balance,meanGrowth:t.meanGrowth,startDate:t.effectiveDate,term:t.term,termUnit:t.termUnit,recordMode:e.props.recordMode,fromOnChange:e.props.fromOnChange,toOnChange:e.props.toOnChange})}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Assets"),r.a.createElement("div",{className:"ui two cards"},t))}}]),t}(r.a.Component),y=function(e){function t(e){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.data.map((function(e){return r.a.createElement("div",{className:"ui row"},r.a.createElement("div",{className:"ui column"},e.description),r.a.createElement("div",{className:"ui column"},e.from),r.a.createElement("div",{className:"ui column"},e.to),r.a.createElement("div",{className:"ui column"},e.amount))}));return r.a.createElement("div",null,r.a.createElement("h3",null,"Transactions"),r.a.createElement("div",{className:"ui stackable four column vertically divided grid container"},r.a.createElement("div",{className:"ui row"},r.a.createElement("div",{className:"ui column"},"Description"),r.a.createElement("div",{className:"ui column"},"From"),r.a.createElement("div",{className:"ui column"},"To"),r.a.createElement("div",{className:"ui column"},"Amount")),e))}}]),t}(r.a.Component),w=a(17),N=a(7),D=a(8),j=a.n(D),k=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).createChart=a.createChart.bind(Object(w.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.createChart(this.props.data)}},{key:"componentDidUpdate",value:function(){this.createChart(this.props.data)}},{key:"createChart",value:function(e){var t=this.node,a=Object(N.h)(t),n=function(e){return e.month},r=50,o=100,c=900-o-50,s=600-r-80,i=Object(N.g)().domain(Object(N.d)(e,n)).range([0,c]).nice(),l=Object(N.f)().domain([1e8,6e8]).range([s,0]).nice(),u=Object(N.e)().x((function(e){return i(n(e))})).y((function(e){return l(function(e){return e.mean}(e))})).curve(N.c),m=Object(N.e)().x((function(e){return i(n(e))})).y((function(e){return l(function(e){return e.best}(e))})).curve(N.c),d=Object(N.e)().x((function(e){return i(n(e))})).y((function(e){return l(function(e){return e.worst}(e))})).curve(N.c),p=a.append("g").attr("transform","translate(".concat(o,",").concat(r,")")),h=Object(N.a)(i).tickSize(-s).tickPadding(15),f=Object(N.b)(l).tickSize(-c).tickPadding(10),v=p.append("g").call(f);v.selectAll(".domain").remove(),v.append("text").attr("class","axis-label").attr("y",-60).attr("x",-s/2).attr("fill","black").attr("transform","rotate(-90)").attr("text-anchor","middle").text("");var b=p.append("g").call(h).attr("transform","translate(0,".concat(s,")"));b.select(".domain").remove(),b.append("text").attr("class","axis-label").attr("y",80).attr("x",c/2).attr("fill","black").text("Month"),p.append("path").attr("class","line-path").attr("d",u(e)).attr("style","fill:none;stroke:maroon;stroke-width:3;stroke-linejoin:round"),p.append("path").attr("class","line-path").attr("d",m(e)).attr("style","fill:none;stroke:maroon;stroke-width:0.5;stroke-linejoin:round"),p.append("path").attr("class","line-path").attr("d",d(e)).attr("style","fill:none;stroke:maroon;stroke-width:0.5;stroke-linejoin:round")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h2",{onClick:this.props.getChartDataToState},"Chart test"),r.a.createElement("svg",{ref:function(t){return e.node=t},width:900,height:600}))}}]),t}(r.a.Component),x=a(41),M=function(e,t){var a=new Date(e);return a.setDate(a.getDate()+t),a},T=function(e,t){var a;return a=12*(t.getFullYear()-e.getFullYear()),a-=e.getMonth()+1,(a+=t.getMonth())<=0?0:a},S=function(e,t){var a=[],n=1,r=0,o=1,c=1,s=1,i=1;"saving"===e.type|"bond investment"===e.type?(n=new Date(M(new Date(e.effectiveDate),16).setDate(1)),r=T(n,new Date)+1,o=n,c=function(t){return(1-e.defaultProbability)*Math.pow(1+e.meanGrowth/12,t)},s=function(t){return Math.pow(1+e.meanGrowth/12,t)},i=function(t){return(1-e.defaultProbability-2*Math.sqrt((1-e.defaultProbability)*e.defaultProbability))*Math.pow(1+e.meanGrowth/12,t)}):"cash"===e.type?(o=n=new Date,r=0,c=function(e){return 1},s=function(e){return 1},i=function(e){return 1}):"stock investment"===e.type?(n=new Date(M(new Date(e.effectiveDate),16).setDate(1)),r=T(n,new Date)+1,o=n,c=function(e){return Math.pow(1.007686,e)},s=function(e){return c(e)+Math.log1p(.095588*e)},i=function(e){return c(e)-Math.log1p(.0423*e)}):"toy"===e.type&&(n=new Date(M(new Date(e.effectiveDate),16).setDate(1)),r=T(n,new Date)+1,o=n,c=function(e){return Math.pow(.975,e)},s=function(e){return Math.pow(.98,e)},i=function(e){return Math.pow(.97,e)});for(var l=0;l<12*t;l++)a[l]={i:l,period:l+r,month:new Date(o.setMonth(o.getMonth()+1)),meanFactor:c(l+r),bestFactor:s(l+r),worstFactor:i(l+r),mean:c(l+r)*e.balance,best:s(l+r)*e.balance,worst:i(l+r)*e.balance};return a},F=function(){var e=Object(l.a)(i.a.mark((function e(){var t,a,n,r,o,c,s,l,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("/api/v1/cards?card=asset");case 2:for(t=e.sent,a=t.data.data.docs,n=a.map((function(e){return S(e,5)})),r=[],o=0;o<n[0].length;o++){for(c=0,s=0,l=0,u=0;u<n.length;u++)c+=n[u][o].mean,s+=n[u][o].best,l+=n[u][o].worst;r.push({period:n[0][o].period,month:n[0][o].month,mean:c,best:s,worst:l})}return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).changeRecordMode=function(){e.setState({recordMode:!e.state.recordMode}),console.log(new Date(x[0].income[0].effectiveDate))},e.amountOnChange=function(t){e.setState({amount:t.target.value})},e.fromOnChange=function(t){try{e.setState({from:t.target.value})}catch(a){e.setState({from:t})}},e.toOnChange=function(t){try{e.setState({to:t.target.value})}catch(a){e.setState({to:t})}},e.onRecord=function(){j.a.post("/api/v1/transactions",{farm:"5de608e532c37a25186e3931",from:e.state.from,to:e.state.to,amount:e.state.amount})},e.getChartDataToState=Object(l.a)(i.a.mark((function t(){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,F();case 2:a=t.sent,e.setState({chartData:a}),console.log(e.state);case 5:case"end":return t.stop()}}),t)}))),e.updateTime=function(){e.setState({currentTime:new Date})},e.state={recordMode:!1,currentTime:new Date,amount:null,from:"",to:"",chartData:[],incomeCards:[],expenseCards:[],assetCards:[],transactions:[]},console.log(e.state),e.getCards(),e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"getCards",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t,a,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("/api/v1/cards?card=income");case 2:return t=e.sent,e.next=5,j.a.get("/api/v1/cards?card=expense");case 5:return a=e.sent,e.next=8,j.a.get("/api/v1/cards?card=asset");case 8:return n=e.sent,e.next=11,j.a.get("/api/v1/transactions");case 11:r=e.sent,this.setState({incomeCards:t.data.data.docs,expenseCards:a.data.data.docs,assetCards:n.data.data.docs,transactions:r.data.data.docs});case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.interval=setInterval(this.updateTime,200)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return r.a.createElement("div",{className:"ui container"},r.a.createElement("div",{className:"ui two column stackable grid"},r.a.createElement("div",{className:"column"},r.a.createElement(b,{recordMode:this.state.recordMode,changeRecordMode:this.changeRecordMode,amount:this.state.amount,from:this.state.from,to:this.state.to,amountOnChange:this.amountOnChange,fromOnChange:this.fromOnChange,toOnChange:this.toOnChange,onRecord:this.onRecord,fromValues:this.state.incomeCards.concat(this.state.assetCards),toValues:this.state.expenseCards.concat(this.state.assetCards)})),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"ui stacked segment",style:{overflow:"auto",maxHeight:400}},r.a.createElement(y,{data:this.state.transactions})))),r.a.createElement("div",{className:"ui three column stackable grid"},r.a.createElement("div",{className:"three wide column"},r.a.createElement(O,{data:this.state.incomeCards,recordMode:this.state.recordMode,fromOnChange:this.fromOnChange,toOnChange:this.toOnChange})),r.a.createElement("div",{className:"six wide column"},r.a.createElement(C,{data:this.state.expenseCards,recordMode:this.state.recordMode,fromOnChange:this.fromOnChange,toOnChange:this.toOnChange})),r.a.createElement("div",{className:"six wide column"},r.a.createElement(E,{data:this.state.assetCards,recordMode:this.state.recordMode,fromOnChange:this.fromOnChange,toOnChange:this.toOnChange}))),r.a.createElement(k,{getChartDataToState:this.getChartDataToState,data:this.state.chartData,size:[500,500]}))}}]),t}(r.a.Component);c.a.render(r.a.createElement(V,null),document.getElementById("root"))},41:function(e){e.exports=JSON.parse('[{"book":"ididid","user":"ididid","income":[{"name":"Job Salary","roc":40500000,"effectiveDate":1572282000000},{"name":"Job Bonus","roc":5000000,"effectiveDate":1572282000000},{"name":"Other","roc":1000000,"effectiveDate":1572282000000}],"expense":[{"name":"Food - Essential"},{"name":"Food - Luxury"},{"name":"Clothes"},{"name":"Transport"}],"asset":[{"type":"cash","name":"Cash","balance":2600000,"meanGrowth":0},{"type":"cash","name":"Vietcombank","balance":1130000,"meanGrowth":0.01},{"type":"saving","name":"VIB","balance":55000000,"effectiveDate":1572282000000,"meanGrowth":0.054,"term":1,"termUnit":"month"},{"type":"saving","name":"VCSC Certificate Deposit","balance":20000000,"effectiveDate":1572282000000,"meanGrowth":0.102,"term":2,"termUnit":"year"},{"type":"investment","name":"VN Stock","balance":110000000},{"type":"toy","name":"Car","balance":522000000}],"transaction":[{"eventTime":1572282000000,"from":"Income","to":"Vietcombank","amount":1000,"description":"abc"}]}]')},84:function(e,t,a){e.exports=a(109)}},[[84,1,2]]]);
//# sourceMappingURL=main.75195209.chunk.js.map