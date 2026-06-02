function renderDRE() {

    const mes = document.getElementById("mes").value;

    const tabela = document.getElementById("dreTable");
    tabela.innerHTML = "";

    baseDRE
        .filter(item => item.mes == mes)
        .forEach(item => {

            const delta = item.real - item.orc;
            const perc = (item.real / item.orc) * 100;
            const deltaAA = item.real - item.aa;
            const percAA = (item.real / item.aa) * 100;

            const cor = delta >= 0 ? "pos" : "neg";

            tabela.innerHTML += `
                <tr class="n${item.nivel}" onclick="abrirDetalhe('${item.linha}')">
                    <td>${item.linha}</td>
                    <td>${item.real}</td>
                    <td>${item.orc}</td>
                    <td class="${cor}">${delta}</td>
                    <td>${perc.toFixed(1)}%</td>
                    <td>${deltaAA}</td>
                    <td>${percAA.toFixed(1)}%</td>
                </tr>
            `;
        });
}

function abrirDetalhe(linha) {
    localStorage.setItem("linhaSelecionada", linha);
    window.location.href = "detalhes.html";
}

renderDRE();
``
