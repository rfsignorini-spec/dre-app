function fmt(n){
    if(n===0)return'0';
    var abs=Math.abs(n);var s=n<0?'-':'';
    if(abs>=1000000)return s+(abs/1000000).toFixed(1)+'M';
    if(abs>=1000)return s+(abs/1000).toFixed(0)+'K';
    return s+abs.toFixed(0);
}
function pct(a,b){if(!b||b===0)return'-';return((a/b)*100).toFixed(1)+'%';}
function vc(n){return n>=0?'val-pos':'val-neg';}
function tc(p){return p>=100?'green':p>=90?'yellow':'red';}

var expandedState={};
function isExp(l){return expandedState[l]!==false;}
function toggleExp(l){expandedState[l]=!isExp(l);renderDRE();}
function isVis(item,all){
    if(!item.pai)return true;
    var p=all.find(function(x){return x.linha===item.pai;});
    if(!p)return true;
    if(!isExp(p.linha))return false;
    return isVis(p,all);
}
function hasCh(l,all){return all.some(function(x){return x.pai===l;});}

function renderDRE(){
    var el=document.getElementById('mesFiltro');if(!el)return;
    var m=parseInt(el.value);
    var dados=DRE.filter(function(d){return d.mes===m;}).sort(function(a,b){return a.ordem-b.ordem;});
    var tb=document.getElementById('dreBody');if(!tb)return;
    tb.innerHTML='';
    dados.forEach(function(d){
        if(!isVis(d,dados))return;
        var delta=d.real-d.orc;var dA=d.acumR-d.acumO;var dAA=d.real-d.aa;
        var cls='n'+d.nivel;
        if(d.sub)cls+=' sub';if(d.tot)cls+=' total-final';
        var sep='';if(d.sep)sep='<tr class="sep-row"><td colspan="12"></td></tr>';
        var ico='';
        if(hasCh(d.linha,dados)){
            var i=isExp(d.linha)?'▼':'▶';
            ico='<span class="expand-icon" onclick="event.stopPropagation();toggleExp(\''+d.linha+'\')">'+i+'</span> ';
        }
        tb.innerHTML+=sep+
        '<tr class="'+cls+'" onclick="abrirDet(\''+d.linha.replace(/'/g,"\\'")+'\')">' +
        '<td>'+ico+d.linha+'</td>'+
        '<td>'+fmt(d.aa)+'</td>'+
        '<td>'+fmt(d.real)+'</td>'+
        '<td>'+fmt(d.orc)+'</td>'+
        '<td class="'+vc(delta)+'">'+fmt(delta)+'</td>'+
        '<td>'+pct(d.real,d.orc)+'</td>'+
        '<td class="'+vc(dAA)+'">'+fmt(dAA)+'</td>'+
        '<td>'+pct(d.real,d.aa)+'</td>'+
        '<td>'+fmt(d.acumR)+'</td>'+
        '<td>'+fmt(d.acumO)+'</td>'+
        '<td class="'+vc(dA)+'">'+fmt(dA)+'</td>'+
        '<td>'+pct(d.acumR,d.acumO)+'</td></tr>';
    });
}

function abrirDet(l){localStorage.setItem('detLinha',l);location.href='detalhe.html';}

function renderDetalhe(){
    var l=localStorage.getItem('detLinha')||'EBITDA';
    var d5=DRE.find(function(x){return x.linha===l&&x.mes===5;});
    var d4=DRE.find(function(x){return x.linha===l&&x.mes===4;});
    if(!d5)d5={real:0,orc:0,aa:0};if(!d4)d4={real:0,orc:0,aa:0};
    var el=document.getElementById('detTitulo');if(el)el.textContent=l;
    var delta=d5.real-d5.orc;var dAA=d5.real-d5.aa;
    var g=document.getElementById('detGrid');
    if(g)g.innerHTML=
    '<div class="detail-card"><h4>Real vs Orçado</h4>'+
    '<p style="font-size:28px;font-weight:700">'+fmt(d5.real)+'</p>'+
    '<p style="color:#64748b">Orçado: '+fmt(d5.orc)+'</p>'+
    '<p class="'+vc(delta)+'">Δ '+fmt(delta)+' ('+pct(d5.real,d5.orc)+')</p></div>'+
    '<div class="detail-card"><h4>Real vs Ano Anterior</h4>'+
    '<p style="font-size:28px;font-weight:700">'+fmt(d5.real)+'</p>'+
    '<p style="color:#64748b">AA: '+fmt(d5.aa)+'</p>'+
    '<p class="'+vc(dAA)+'">Δ '+fmt(dAA)+' ('+pct(d5.real,d5.aa)+')</p></div>';
    var bars=document.getElementById('miniBars');
    if(bars){
        bars.innerHTML='';
        var vals=[d5.real*0.85,d5.real*0.9,d5.real*0.95,d4.real,d5.real*0.98,d5.real];
        var mx=Math.max.apply(null,vals.map(function(v){return Math.abs(v);}));
        vals.forEach(function(v){
            var h=Math.max(5,(Math.abs(v)/mx)*100);
            var c=v>=0?'#3b82f6':'#ef4444';
            bars.innerHTML+='<div style="height:'+h+'%;background:'+c+'"></div>';
        });
    }
    var ib=document.getElementById('insightText');
    if(ib){
        var t='🤖 ';
        if(delta>=0)t+=l+' superou o orçamento em '+fmt(delta)+' ('+pct(d5.real,d5.orc)+' de aderência). ';
        else t+=l+' ficou '+fmt(Math.abs(delta))+' abaixo do orçado ('+pct(d5.real,d5.orc)+' de aderência). ';
        if(dAA>=0)t+='Crescimento de '+fmt(dAA)+' vs ano anterior ('+pct(d5.real,d5.aa)+').';
        else t+='Queda de '+fmt(Math.abs(dAA))+' vs ano anterior ('+pct(d5.real,d5.aa)+').';
        ib.textContent=t;
    }
}

function renderHome(){
    var c=document.getElementById('negociosCards');if(!c)return;c.innerHTML='';
    NEGOCIOS.forEach(function(n){
        var tO=tc(n.percOrc);var tA=n.percAA>=100?'green':'red';
        c.innerHTML+='<div class="card" onclick="location.href=\'dre.html\'">'+
        '<div class="card-title">'+n.nome+'</div>'+
        '<div class="card-value">'+fmt(n.lucro)+'</div>'+
        '<div class="card-meta"><span class="tag '+tO+'">Orç: '+n.percOrc+'%</span>'+
        '<span class="tag '+tA+'">AA: '+n.percAA+'%</span></div></div>';
    });
    var s=NEGOCIOS[0];
    var e;
    e=document.getElementById('sumRec');if(e)e.textContent=fmt(s.receita);
    e=document.getElementById('sumEbitda');if(e)e.textContent=fmt(s.ebitda);
    e=document.getElementById('sumLucro');if(e)e.textContent=fmt(s.lucro);
    e=document.getElementById('sumAder');if(e)e.textContent=s.percOrc+'%';
}

function renderKPIs(){
    var kpis=[
        {nome:'Receita Líquida',valor:1158000,meta:1290000},
        {nome:'Margem Bruta',valor:15.4,meta:30.2,isP:true},
        {nome:'EBITDA',valor:148000,meta:140000},
        {nome:'Resultado Financeiro',valor:10000,meta:8000},
        {nome:'Lucro Líquido',valor:110000,meta:113000},
        {nome:'Despesas SG&A',valor:95000,meta:98000},
        {nome:'% Despesas/Receita',valor:8.2,meta:7.6,isP:true},
        {nome:'% Resultado/Receita',valor:9.5,meta:8.8,isP:true},
        {nome:'Crescimento vs AA',valor:6.3,meta:5.0,isP:true},
        {nome:'Aderência Orçamento',valor:89.8,meta:100,isP:true}
    ];
    var g=document.getElementById('kpiGrid');if(!g)return;g.innerHTML='';
    kpis.forEach(function(k){
        var pf=Math.min(k.isP?(k.valor/k.meta*100):(k.valor/k.meta*100),120);
        var bc=pf>=95?'#22c55e':pf>=80?'#f59e0b':'#ef4444';
        var vs=k.isP?k.valor.toFixed(1)+'%':fmt(k.valor);
        var ms=k.isP?k.meta.toFixed(1)+'%':fmt(k.meta);
        g.innerHTML+='<div class="kpi-card"><div class="kpi-name">'+k.nome+'</div>'+
        '<div class="kpi-value">'+vs+'</div>'+
        '<div class="kpi-bar"><div class="kpi-bar-fill" style="width:'+pf.toFixed(0)+'%;background:'+bc+'"></div></div>'+
        '<div class="kpi-footer"><span>Meta: '+ms+'</span><span>'+pf.toFixed(0)+'%</span></div></div>';
    });
}
