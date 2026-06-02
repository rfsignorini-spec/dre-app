function renderDRE(){

let mes = document.getElementById("mes").value;
let tabela = document.getElementById("dre");
tabela.innerHTML="";

DRE.filter(x=>x.mes==mes).forEach(l => {

let delta = l.real - l.orc;
let perc = (l.real/l.orc)*100;
let deltaA = l.acumR - l.acumO;

let cor = delta>0 ? "pos":"neg";

tabela.innerHTML += `
<tr onclick="abrir('${l.linha}')">
<td>${l.linha}</td>
<td>${l.real}</td>
<td>${l.orc}</td>
<td class="${cor}">${delta}</td>
<td>${perc.toFixed(1)}%</td>
<td>${l.acumR}</td>
<td>${l.acumO}</td>
<td>${deltaA}</td>
</tr>
`;

});

}

function abrir(linha){
localStorage.setItem("linha",linha);
window.location.href="detalhe.html";
}

renderDRE();
