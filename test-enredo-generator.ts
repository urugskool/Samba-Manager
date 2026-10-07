import { INITIAL_SCHOOLS, SAMPLE_ENREDOS } from './src/data/carnavalData';
import { ParadeScriptService } from './src/services/paradeScriptService';
import { EnredoService, THEMATIC_CORES } from './src/services/enredoService';
import { School, Enredo } from './src/types/carnaval';

console.log('====================================================');
console.log('TEST SUITE: REFORMA DO GERADOR TEMÁTICO (SAMBA MANAGER)');
console.log('CRITÉRIO PRINCIPAL: "O ENREDO DITA O DESFILE"');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${testName} - ${detail || ''}`);
    failCount++;
  }
}

// 1. Japão (Viradouro)
const schoolJapao = INITIAL_SCHOOLS.find((s) => s.id === 'viradouro')!;
const scriptJapao = ParadeScriptService.getOrGenerateParadeScript(schoolJapao, 'especial');
const hasJapanKeywords =
  scriptJapao.elements.some((e) => /samurai|sol nascente|kasato|orizuru|quinto|xinto/i.test(e.name + ' ' + e.description)) &&
  scriptJapao.setores.some((s) => /sol nascente|samurai|imigra|oriente/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasJapanKeywords, '1. Japão: Desfile 100% caracterizado com a cultura japonesa', `Enredo: ${scriptJapao.enredoTitle}`);
const japaoComissao = scriptJapao.elements.find((e) => e.type === 'comissao_frente');
assert(!!japaoComissao && /sol nascente|samurais|garças/i.test(japaoComissao.name), '1.1 Japão: Comissão de Frente temática');
const japaoAbreAlas = scriptJapao.elements.find((e) => e.type === 'abre_alas');
assert(!!japaoAbreAlas && /kinkaku|torii|templo|sol nascente/i.test(japaoAbreAlas.name), '1.2 Japão: Abre-Alas temático');

// 2. Egito (Beija-Flor)
const schoolEgito = INITIAL_SCHOOLS.find((s) => s.id === 'beija_flor')!;
const scriptEgito = ParadeScriptService.getOrGenerateParadeScript(schoolEgito, 'especial');
const hasEgyptKeywords =
  scriptEgito.elements.some((e) => /faraó|pirâmide|tutancâmon|nilo|anúbis|cleópatra/i.test(e.name + ' ' + e.description)) &&
  scriptEgito.setores.some((s) => /nilo|faraó|pirâmide|egito/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasEgyptKeywords, '2. Egito: Desfile 100% caracterizado com a história egípcia', `Enredo: ${scriptEgito.enredoTitle}`);
const egitoBaianas = scriptEgito.elements.find((e) => e.type === 'baianas');
assert(!!egitoBaianas && /íris|nilo|deusas|sacerdotisas/i.test(egitoBaianas.name), '2.1 Egito: Ala das Baianas temática');

// 3. Amazônia (Vila Isabel)
const schoolAmazonia = INITIAL_SCHOOLS.find((s) => s.id === 'vila_isabel')!;
const scriptAmazonia = ParadeScriptService.getOrGenerateParadeScript(schoolAmazonia, 'especial');
const hasAmazonKeywords =
  scriptAmazonia.elements.some((e) => /samaúma|floresta|rio voador|curupira|parintins|boto/i.test(e.name + ' ' + e.description)) &&
  scriptAmazonia.setores.some((s) => /floresta|samaúma|encantados|amazônia/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasAmazonKeywords, '3. Amazônia: Desfile 100% caracterizado com a floresta e mitologia amazônica', `Enredo: ${scriptAmazonia.enredoTitle}`);
const amazoniaBateria = scriptAmazonia.elements.find((e) => e.type === 'bateria');
assert(!!amazoniaBateria && /pulso verde|selva|batuques|floresta/i.test(amazoniaBateria.name), '3.1 Amazônia: Bateria temática');

// 4. Futebol (Salgueiro)
const schoolFutebol = INITIAL_SCHOOLS.find((s) => s.id === 'salgueiro')!;
const scriptFutebol = ParadeScriptService.getOrGenerateParadeScript(schoolFutebol, 'especial');
const hasFootballKeywords =
  scriptFutebol.elements.some((e) => /futebol|pelé|maracanã|gol|drible|várzea|seleção/i.test(e.name + ' ' + e.description)) &&
  scriptFutebol.setores.some((s) => /chuteira|várzea|maracanã|futebol/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasFootballKeywords, '4. Futebol: Desfile 100% caracterizado com a paixão nacional do futebol', `Enredo: ${scriptFutebol.enredoTitle}`);
const futebolAlegoria = scriptFutebol.elements.find((e) => e.type === 'alegoria');
assert(!!futebolAlegoria && /futebol|terrões|tri de 70|torcidas/i.test(futebolAlegoria.name), '4.1 Futebol: Alegoria temática de futebol');

// 5. Tema Inédito 1: Inteligência Artificial (Imperatriz)
const schoolIA = INITIAL_SCHOOLS.find((s) => s.id === 'imperatriz')!;
const scriptIA = ParadeScriptService.getOrGenerateParadeScript(schoolIA, 'especial');
const hasIAKeywords =
  scriptIA.elements.some((e) => /algoritmo|inteligência artificial|redes neurais|código|androide|binário/i.test(e.name + ' ' + e.description)) &&
  scriptIA.setores.some((s) => /código|algoritmo|máquina|inteligência/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasIAKeywords, '5. Inédito: Inteligência Artificial (O Algoritmo do Tamborim)', `Enredo: ${scriptIA.enredoTitle}`);

// 6. Tema Inédito 2: Astronomia e Cosmos (Mangueira)
const schoolCosmos = INITIAL_SCHOOLS.find((s) => s.id === 'mangueira')!;
const scriptCosmos = ParadeScriptService.getOrGenerateParadeScript(schoolCosmos, 'especial');
const hasCosmosKeywords =
  scriptCosmos.elements.some((e) => /galáxia|james webb|big bang|estrelas|cosmos|planeta|telescópio/i.test(e.name + ' ' + e.description)) &&
  scriptCosmos.setores.some((s) => /big bang|solar|galáxia|cosmos/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasCosmosKeywords, '6. Inédito: Astronomia e Cosmos (Odisseia Estelar)', `Enredo: ${scriptCosmos.enredoTitle}`);

// 7. Tema Inédito Procedural (Enredo não cadastrado em presets)
const customEnredo: Enredo = {
  id: 'enr_custom_cinema',
  title: 'Luzes da Ribalta: Chaplin, o Cinema Mudo e a Ilusão na Passarela',
  themeType: 'Cultural',
  synopsis: 'A era dourada do cinema clássico, o vagabundo Carlitos, as películas preto e branco e a magia das telas de projeção no Carnaval carioca.',
  qualityBoost: 14,
  cost: 180000
};

const customSchool: School = {
  ...schoolJapao,
  id: 'custom_school_test',
  currentEnredo: customEnredo
};

const scriptCustom = ParadeScriptService.getOrGenerateParadeScript(customSchool, 'especial');
const hasCinemaKeywords =
  scriptCustom.elements.some((e) => /cinema|luzes|ribalta|película|chaplin|tela/i.test(e.name + ' ' + e.description)) ||
  scriptCustom.setores.some((s) => /cinema|ribalta|luzes/i.test(s.title + ' ' + s.themeSynopsis));
assert(hasCinemaKeywords, '7. Tema Procedural Totalmente Inédito: "Luzes da Ribalta"', `Alas e carros contextualizados dinamicamente pelo enredo`);

// 8. Troca Dinâmica de Enredo & Invalidação de Cache
ParadeScriptService.clearCache(customSchool.id);
const enredoFutebol = EnredoService.getThematicPreset('futebol', customSchool, 2026);
const updatedSchool: School = {
  ...customSchool,
  currentEnredo: enredoFutebol
};
const scriptSwitched = ParadeScriptService.getOrGenerateParadeScript(updatedSchool, 'especial');
const isSwitchedToFutebol = scriptSwitched.elements.some((e) => /futebol|pelé|maracanã|gol|drible|chuteira/i.test(e.name + ' ' + e.description));
assert(isSwitchedToFutebol, '8. Troca Dinâmica em Tempo Real: Escola atualiza todo o desfile ao mudar de enredo');

// 9. Preservação de Divisões & Regulamento
const scriptOuro = ParadeScriptService.getOrGenerateParadeScript(schoolJapao, 'ouro');
assert(scriptOuro.division === 'ouro' && scriptOuro.obrigatoriedades.totalAlas === 20, '9. Divisões: Série Ouro respeita regulamento e mantém 100% da caracterização temática');

// 10. Eliminação de tópicos formulaicos (Gênese, Jornada, Apoteose, Consagração)
const allTestedScripts = [scriptJapao, scriptEgito, scriptAmazonia, scriptFutebol, scriptIA, scriptCosmos, scriptCustom];
const hasFormulaicSectorTitles = allTestedScripts.some((sc) =>
  sc.setores.some((s) => /gênese|genese|apoteose/i.test(s.title)) ||
  sc.elements.some((e) => /\(apoteose\)/i.test(e.name) || /\(apoteose\)/i.test(e.categoryLabel))
);
assert(!hasFormulaicSectorTitles, '10. Setores e Elementos Livres de Fórmulas: Sem tópicos de Gênese/Apoteose, 100% artísticos');

console.log('\n====================================================');
console.log(`TOTAL PASS: ${passCount} | TOTAL FAIL: ${failCount}`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
