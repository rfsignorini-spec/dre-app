const DRE = [];

function gerarMes(mes, fator) {
var linhas = [
{linha:"Receita Bruta",nivel:1,ordem:1,pai:null,real:1282000*fator,orc:1400000*fator,aa:1200000*fator,sub:false,tot:false,sep:false},
{linha:"Deduções de Vendas",nivel:2,ordem:2,pai:"Receita Bruta",real:-124000*fator,orc:-110000*fator,aa:-110000*fator,sub:false,tot:false,sep:false},
{linha:"Receita Líquida",nivel:1,ordem:3,pai:null,real:1158000*fator,orc:1290000*fator,aa:1090000*fator,sub:true,tot:false,sep:false},
{linha:"Custo Variável",nivel:2,ordem:4,pai:"Receita Líquida",real:-980000*fator,orc:-900000*fator,aa:-900000*fator,sub:false,tot:false,sep:false},
{linha:"Lucro Bruto",nivel:1,ordem:5,pai:null,real:178000*fator,orc:390000*fator,aa:190000*fator,sub:true,tot:false,sep:true},

{linha:"Despesas Variáveis",nivel:1,ordem:6,pai:null,real:-46000*fator,orc:-45000*fator,aa:-40000*fator,sub:false,tot:false,sep:true},
{linha:"Despesas com Comissões",nivel:2,ordem:7,pai:"Despesas Variáveis",real:-32000*fator,orc:-30000*fator,aa:-28000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Comissões (-)",nivel:3,ordem:8,pai:"Despesas com Comissões",real:-32000*fator,orc:-30000*fator,aa:-28000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas com Vendas",nivel:2,ordem:9,pai:"Despesas Variáveis",real:-14000*fator,orc:-15000*fator,aa:-12000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Vendas (-)",nivel:3,ordem:10,pai:"Despesas com Vendas",real:-10000*fator,orc:-11000*fator,aa:-9000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Marketing (-)",nivel:3,ordem:11,pai:"Despesas com Vendas",real:-4000*fator,orc:-4000*fator,aa:-3000*fator,sub:false,tot:false,sep:false},
{linha:"Margem de Contribuição",nivel:1,ordem:12,pai:null,real:132000*fator,orc:345000*fator,aa:150000*fator,sub:true,tot:false,sep:true},

{linha:"Despesas Totais",nivel:1,ordem:13,pai:null,real:-95000*fator,orc:-98000*fator,aa:-88000*fator,sub:false,tot:false,sep:true},
{linha:"Despesas Fixas",nivel:2,ordem:14,pai:"Despesas Totais",real:-70000*fator,orc:-73000*fator,aa:-65000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas com Pessoal",nivel:3,ordem:15,pai:"Despesas Fixas",real:-45000*fator,orc:-48000*fator,aa:-42000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Salários e Encargos (-)",nivel:4,ordem:16,pai:"Despesas com Pessoal",real:-30000*fator,orc:-32000*fator,aa:-28000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Benefícios (-)",nivel:4,ordem:17,pai:"Despesas com Pessoal",real:-12000*fator,orc:-11000*fator,aa:-10000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Treinamento (-)",nivel:4,ordem:18,pai:"Despesas com Pessoal",real:-3000*fator,orc:-5000*fator,aa:-4000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas Gerais e Administrativas",nivel:3,ordem:19,pai:"Despesas Fixas",real:-25000*fator,orc:-25000*fator,aa:-23000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Serviços de Terceiros (-)",nivel:4,ordem:20,pai:"Despesas Gerais e Administrativas",real:-8000*fator,orc:-7000*fator,aa:-7000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Aluguéis (-)",nivel:4,ordem:21,pai:"Despesas Gerais e Administrativas",real:-4000*fator,orc:-4000*fator,aa:-3500*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Informática e Telecom (-)",nivel:4,ordem:22,pai:"Despesas Gerais e Administrativas",real:-5000*fator,orc:-5500*fator,aa:-4800*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Despesas Gerais (-)",nivel:4,ordem:23,pai:"Despesas Gerais e Administrativas",real:-3000*fator,orc:-3500*fator,aa:-3000*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Assuntos Institucionais e Legais (-)",nivel:4,ordem:24,pai:"Despesas Gerais e Administrativas",real:-2000*fator,orc:-2000*fator,aa:-1800*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Viagens (-)",nivel:4,ordem:25,pai:"Despesas Gerais e Administrativas",real:-1500*fator,orc:-1800*fator,aa:-1500*fator,sub:false,tot:false,sep:false},
{linha:"Pacote Utilidades (-)",nivel:4,ordem:26,pai:"Despesas Gerais e Administrativas",real:-1500*fator,orc:-1200*fator,aa:-1400*fator,sub:false,tot:false,sep:false},
{linha:"Recuperação de Despesas",nivel:2,ordem:27,pai:"Despesas Totais",real:5000*fator,orc:4000*fator,aa:3000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas Compartilhadas",nivel:2,ordem:28,pai:"Despesas Totais",real:-18000*fator,orc:-15000*fator,aa:-14000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas CSC",nivel:3,ordem:29,pai:"Despesas Compartilhadas",real:-10000*fator,orc:-8000*fator,aa:-7000*fator,sub:false,tot:false,sep:false},
{linha:"Despesas Corporativo",nivel:3,ordem:30,pai:"Despesas Compartilhadas",real:-8000*fator,orc:-7000*fator,aa:-7000*fator,sub:false,tot:false,sep:false},
{linha:"Provisões",nivel:2,ordem:31,pai:"Despesas Totais",real:-9000*fator,orc:-7000*fator,aa:-6000*fator,sub:false,tot:false,sep:false},
{linha:"Provisões Inadimplência",nivel:3,ordem:32,pai:"Provisões",real:-4000*fator,orc:-3000*fator,aa:-2500*fator,sub:false,tot:false,sep:false},
{linha:"Provisões Jurídicas",nivel:3,ordem:33,pai:"Provisões",real:-2000*fator,orc:-2000*fator,aa:-1500*fator,sub:false,tot:false,sep:false},
{linha:"BNDU",nivel:3,ordem:34,pai:"Provisões",real:-500*fator,orc:-500*fator,aa:-400*fator,sub:false,tot:false,sep:false},
{linha:"Provisões Contencioso",nivel:3,ordem:35,pai:"Provisões",real:-1500*fator,orc:-800*fator,aa:-1000*fator,sub:false,tot:false,sep:false},
{linha:"Provisões Perda de Estoque",nivel:3,ordem:36,pai:"Provisões",real:-500*fator,orc:-400*fator,aa:-300*fator,sub:false,tot:false,sep:false},
{linha:"Provisões Administrativas",nivel:3,ordem:37,pai:"Provisões",real:-500*fator,orc:-300*fator,aa:-300*fator,sub:false,tot:false,sep:false},
{linha:"PPR",nivel:2,ordem:38,pai:"Despesas Totais",real:-8000*fator,orc:-9000*fator,aa:-7000*fator,sub:false,tot:false,sep:false},
{linha:"PPR Unidade",nivel:3,ordem:39,pai:"PPR",real:-4000*fator,orc:-5000*fator,aa:-3500*fator,sub:false,tot:false,sep:false},
{linha:"PPR CSC",nivel:3,ordem:40,pai:"PPR",real:-2500*fator,orc:-2500*fator,aa:-2000*fator,sub:false,tot:false,sep:false},
{linha:"PPR Corporativo",nivel:3,ordem:41,pai:"PPR",real:-1500*fator,orc:-1500*fator,aa:-1500*fator,sub:false,tot:false,sep:false},
{linha:"Outros Resultados",nivel:2,ordem:42,pai:"Despesas Totais",real:5000*fator,orc:2000*fator,aa:3000*fator,sub:false,tot:false,sep:false},

{linha:"EBITDA",nivel:1,ordem:43,pai:null,real:148000*fator,orc:140000*fator,aa:95000*fator,sub:true,tot:false,sep:true},

{linha:"Depreciação e Amortização",nivel:1,ordem:44,pai:null,real:-12000*fator,orc:-15000*fator,aa:-10000*fator,sub:false,tot:false,sep:true},
{linha:"DPA Negócio",nivel:2,ordem:45,pai:"Depreciação e Amortização",real:-10000*fator,orc:-12000*fator,aa:-8000*fator,sub:false,tot:false,sep:false},
{linha:"DPA Áreas Compartilhadas",nivel:2,ordem:46,pai:"Depreciação e Amortização",real:-2000*fator,orc:-3000*fator,aa:-2000*fator,sub:false,tot:false,sep:false},
{linha:"EBIT",nivel:1,ordem:47,pai:null,real:136000*fator,orc:125000*fator,aa:85000*fator,sub:true,tot:false,sep:true},

{linha:"Resultado Financeiro",nivel:1,ordem:48,pai:null,real:10000*fator,orc:8000*fator,aa:5000*fator,sub:false,tot:false,sep:true},
{linha:"RF Outros Efeitos Contábeis",nivel:2,ordem:49,pai:"Resultado Financeiro",real:-3000*fator,orc:-2000*fator,aa:-2000*fator,sub:false,tot:false,sep:false},
{linha:"RF Caixa Líquido",nivel:2,ordem:50,pai:"Resultado Financeiro",real:13000*fator,orc:10000*fator,aa:7000*fator,sub:false,tot:false,sep:false},
{linha:"Imposto de Renda e Contribuição Social",nivel:1,ordem:51,pai:null,real:-26000*fator,orc:-20000*fator,aa:-18000*fator,sub:false,tot:false,sep:false},

{linha:"Lucro Líquido sem Equivalência",nivel:1,ordem:52,pai:null,real:120000*fator,orc:113000*fator,aa:72000*fator,sub:true,tot:false,sep:true},
{linha:"Equivalência",nivel:1,ordem:53,pai:null,real:-5000*fator,orc:0,aa:0,sub:false,tot:false,sep:true},
{linha:"Lucro Líquido com Equivalência",nivel:1,ordem:54,pai:null,real:115000*fator,orc:113000*fator,aa:72000*fator,sub:true,tot:false,sep:true},
{linha:"Outros Resultados Não Recorrentes",nivel:1,ordem:55,pai:null,real:-5000*fator,orc:0,aa:-3000*fator,sub:false,tot:false,sep:true},
{linha:"Lucro Líquido Total",nivel:1,ordem:56,pai:null,real:110000*fator,orc:113000*fator,aa:69000*fator,sub:false,tot:true,sep:true}
];

linhas.forEach(function(l){
    DRE.push({
        linha:l.linha, nivel:l.nivel, ordem:l.ordem, pai:l.pai, mes:mes,
        real:Math.round(l.real), orc:Math.round(l.orc), aa:Math.round(l.aa),
        acumR:Math.round(l.real*mes), acumO:Math.round(l.orc*mes), acumAA:Math.round(l.aa*mes),
        sub:l.sub, tot:l.tot, sep:l.sep
    });
});
}

gerarMes(4, 0.97);
gerarMes(5, 1.0);

var NEGOCIOS = [
{nome:"Consolidado",receita:1158000,ebitda:148000,lucro:110000,percOrc:89.8,percAA:106.3},
{nome:"Banco",receita:320000,ebitda:85000,lucro:62000,percOrc:95.2,percAA:112.1},
{nome:"Locação",receita:180000,ebitda:42000,lucro:28000,percOrc:91.5,percAA:108.7},
{nome:"Consórcio",receita:250000,ebitda:55000,lucro:38000,percOrc:88.3,percAA:115.2},
{nome:"Corretora",receita:85000,ebitda:18000,lucro:12000,percOrc:93.1,percAA:104.5},
{nome:"Automóveis",receita:420000,ebitda:32000,lucro:18000,percOrc:86.5,percAA:98.2},
{nome:"Veículos Comerciais",receita:280000,ebitda:22000,lucro:14000,percOrc:92.0,percAA:110.5},
{nome:"Holding",receita:45000,ebitda:-8000,lucro:-12000,percOrc:78.0,percAA:85.0}
];
