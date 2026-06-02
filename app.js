function fmt(n){if(n===0)return'0';var a=Math.abs(n),s=n<0?'-':'';if(a>=1e6)return s+(a/1e6).toFixed(1)+'M';if(a>=1e3)return s+(a/1e3).toFixed(0)+'K';return s+a.toFixed(0);}
function pct(a,b){if(!b||b===0)return'-';return((a/b)*100).toFixed(1)+'%';}
function vc(n){return n>=0?'val-pos':'val-neg';}
function tc(p){return p>=100?'green':p>=90?'yellow':'red';}

var ES={};
function isE(l){return ES[l]!==false;}
function togE(l){ES[l]=!isE(l);renderDRE();}
function isV(i,a){if(!i.pai)return true;var p=a.find(function(x){return x.linha===i.pai;});if(!p)return true;if(!isE(p.linha))return false;return isV(p,a);}
function hasC(l,a){return a.some(function(x){return x.pai===l;});}

function renderDRE(){
var el=document.getElementById('mesFiltro');if(!el)return;
var m=parseInt(el.value);
var d=DRE.filter(function(x){return x.mes===m;}).sort(function(a,b){return a.ordem-b.ordem;});
var tb=document.getElementById('dreBody');if(!tb)return;
tb.innerHTML='';
d.forEach(function(i){
if(!isV(i,d))return;
var dt=i.real-i.orc,dA=i.acumR-i.acumO,dAA=i.real-i.aa;
var c='n'+i.nivel;if(i.sub)c+=' sub';if(i.tot)c+=' total-final';
var sp='';if(i.sep)sp='<tr class="sep-row"><td colspan="12"></td></tr>';
var ic='';
if(hasC(i.linha,d)){var arrow=isE(i.linha)?'\u25BC':'\u25B6';ic='<span class="expand-icon" onclick="event.stopPropagation();togE(\''+i.linha.replace(/'/g,"\\'")+'\')">' +arrow+'</span> ';}
var ln=i.linha.replace(/'/g,"\\'");
tb.innerHTML+=sp+
'<tr class="'+c+'" onclick="abrirDet(\''+ln+'\')">'+
'<td>'+ic+i.linha+'</td>'+
'<td>'+fmt(i.aa)+'</td>'+
'<td>'+fmt(i.real)+'</td>'+
'<td>'+fmt(i.orc)+'</td>'+
'<td class="'+vc(dt)+'">'+fmt(dt)+'</td>'+
'<td>'+pct(i.real,i.orc)+'</td>'+
'<td class="'+vc(dAA)+'">'+fmt(dAA)+'</td>'+
'<td>'+pct(i.real,i.aa)+'</td>'+
'<td>'+fmt(i.acumR)+'</td>'+
'<td>'+fmt(i.acumO)+'</td>'+
'<td class="'+vc(dA)+'">'+fmt(dA)+'</td>'+
'<td>'+pct(i.acumR,i.acumO)+'</td></tr>';
});
}

function abrirDet(l){localStorage.setItem('detL',l);location.href='detalhe.html';}

function renderDetalhe(){
var l=localStorage.getItem('detL')||'EBITDA';
var d5=DRE.find(function(x){return x.linha===l&&x.mes===5;})||{real:0,orc:0,aa:0};
var d4=DRE.find(function(x){return x.linha===l&&x.mes===4;})||{real:0,orc:0,aa:0};
var el=document.getElementById('detTitulo');if(el)el.textContent=l;
var dt=d5.real-d5.orc,dAA=d5.real-d5.aa;
var g=document.getElementById('detGrid');
if(g)g.innerHTML=
'<div class="detail-card"><h4>\uD83D\uDCCA Real vs Or\u00e7ado</h4>'+
'<p style="font-size:32px;font-weight:700">'+fmt(d5.real)+'</p>'+
'<p style="color:#64748b;margin:6px 0">Or\u00e7ado: '+fmt(d5.orc)+'</p>'+
'<p class="'+vc(dt)+'" style="font-size:16px">\u0394 '+fmt(dt)+' ('+pct(d5.real,d5.orc)+')</p></div>'+
'<div class="detail-card"><h4>\uD83D\uDCC8 Real vs Ano Anterior</h4>'+
'<p style="font-size:32px;font-weight:700">'+fmt(d5.real)+'</p>'+
'<p style="color:#64748b;margin:6px 0">AA: '+fmt(d5.aa)+'</p>'+
'<p class="'+vc(dAA)+'" style="font-size:16px">\u0394 '+fmt(dAA)+' ('+pct(d5.real,d5.aa)+')</p></div>';
var b=document.getElementById('miniBars');
if(b){b.innerHTML='';
var v=[d5.real*0.82,d5.real*0.88,d5.real*0.93,d4.real,d5.real*0.97,d5.real];
var mx=Math.max.apply(null,v.map(function(x){return Math.abs(x);}));
var ms=['Dez','Jan','Fev','Mar','Abr','Mai'];
v.forEach(function(x,i){
var h=Math.max(8,(Math.abs(x)/mx)*100);
var c=x>=0?'linear-gradient(180deg,#3b82f6,#60a5fa)':'linear-gradient(180deg,#ef4444,#f87171)';
b.innerHTML+='<div style="height:'+h+'%;background:'+c+'" title="'+ms[i]+': '+fmt(x)+'"></div>';
});}
var ib=document.getElementById('insightText');
if(ib){var t='\uD83E\uDD16 ';
if(dt>=0)t+=l+' superou o or\u00e7amento em '+fmt(dt)+' ('+pct(d5.real,d5.orc)+' de ader\u00eancia). ';
else t+=l+' ficou '+fmt(Math.abs(dt))+' abaixo do or\u00e7ado ('+pct(d5.real,d5.orc)+' de ader\u00eancia). ';
if(dAA>=0)t+='Crescimento de '+fmt(dAA)+' vs ano anterior ('+pct(d5.real,d5.aa)+').';
else t+='Queda de '+fmt(Math.abs(dAA))+' vs ano anterior ('+pct(d5.real,d5.aa)+').';
ib.textContent=t;}
}

function renderHome(){
var c=document.getElementById('negociosCards');if(!c)return;c.innerHTML='';
NEGOCIOS.forEach(function(n){
var tO=tc(n.percOrc),tA=n.percAA>=100?'green':'red';
c.innerHTML+='<div class="card" onclick="location.href=\'dre.html\'">'+
'<div class="card-title">'+n.nome+'</div>'+
'<div class="card-value">'+fmt(n.lucro)+'</div>'+
'<div class="card-meta"><span class="tag '+tO+'">Or\u00e7: '+n.percOrc+'%</span>'+
'<span class="tag '+tA+'">AA: '+n.percAA+'%</span></div></div>';
});
var s=NEGOCIOS[0],e;
e=document.getElementById('sumRec');if(e)e.textContent=fmt(s.receita);
e=document.getElementById('sumEbitda');if(e)e.textContent=fmt(s.ebitda);
e=document.getElementById('sumLucro');if(e)e.textContent=fmt(s.lucro);
e=document.getElementById('sumAder');if(e)e.textContent=s.percOrc+'%';
}

function renderKPIs(){
var K=[
{n:'Receita L\u00edquida',v:1158000,m:1290000},
{n:'Margem Bruta',v:15.4,m:30.2,ip:1},
{n:'EBITDA',v:148000,m:140000},
{n:'Resultado Financeiro',v:10000,m:8000},
{n:'Lucro L\u00edquido',v:110000,m:113000},
{n:'Despesas SG&A',v:95000,m:98000},
{n:'% Despesas/Receita',v:8.2,m:7.6,ip:1},
{n:'% Resultado/Receita',v:9.5,m:8.8,ip:1},
{n:'Crescimento vs AA',v:6.3,m:5.0,ip:1},
{n:'Ader\u00eancia Or\u00e7amento',v:89.8,m:100,ip:1}
];
var g=document.getElementById('kpiGrid');if(!g)return;g.innerHTML='';
K.forEach(function(k){
var pf=Math.min((k.ip?(k.v/k.m*100):(k.v/k.m*100)),120);
var bc=pf>=95?'#22c55e':pf>=80?'#f59e0b':'#ef4444';
var vs=k.ip?k.v.toFixed(1)+'%':fmt(k.v);
var ms=k.ip?k.m.toFixed(1)+'%':fmt(k.m);
g.innerHTML+='<div class="kpi-card"><div class="kpi-name">'+k.n+'</div>'+
'<div class="kpi-value">'+vs+'</div>'+
'<div class="kpi-bar"><div class="kpi-bar-fill" style="width:'+pf.toFixed(0)+'%;background:'+bc+'"></div></div>'+
'<div class="kpi-footer"><span>Meta: '+ms+'</span><span>'+pf.toFixed(0)+'%</span></div></div>';
});
}
