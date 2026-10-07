import React, { useState } from 'react';
import { School, StaffMember, SchoolAttributes } from '../types/carnaval';
import { EnredoService } from '../services/enredoService';
import {
  Sparkles,
  Shield,
  Palette,
  Building2,
  MapPin,
  Calendar,
  Flag,
  Award,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Info,
  Layers,
  Crown,
  HelpCircle
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface SchoolCreationEditorProps {
  currentYear: number;
  onConfirmCreation: (newSchool: School, managerName: string) => void;
  onCancel?: () => void;
}

// Bairros tradicionais do Rio de Janeiro categorizados por Zonas
const RIO_NEIGHBORHOODS_BY_ZONE: Record<string, string[]> = {
  'Zona Norte': [
    'Madureira',
    'Tijuca',
    'Ramos',
    'Parada de Lucas',
    'Vila Isabel',
    'Olaria',
    'Rocha Miranda',
    'Engenho de Dentro',
    'Méier',
    'Penha',
    'Bonsucesso',
    'Pavuna',
    'Irajá',
    'Vaz Lobo',
    'Vicente de Carvalho',
    'Cascadura',
    'Pilares',
    'Andaraí',
    'Grajaú',
    'Maracanã',
    'Mangueira'
  ],
  'Zona Sul': [
    'Botafogo',
    'Copacabana',
    'Catete',
    'Laranjeiras',
    'Ipanema',
    'Leblon',
    'Leme',
    'Glória',
    'Flamengo',
    'Rocinha',
    'Vidigal',
    'Urca'
  ],
  'Centro & Região Portuária': [
    'São Cristóvão',
    'Saúde',
    'Gamboa',
    'Santo Cristo',
    'Estácio',
    'Lapa',
    'Santa Teresa',
    'Centro',
    'Cidade Nova'
  ],
  'Zona Oeste': [
    'Bangu',
    'Padre Miguel',
    'Campo Grande',
    'Santa Cruz',
    'Realengo',
    'Jacarepaguá',
    'Taquara',
    'Curicica',
    'Anil',
    'Freguesia',
    'Recreio dos Bandeirantes',
    'Barra da Tijuca',
    'Pedra de Guaratiba'
  ],
  'Ilha do Governador': [
    'Ilha do Governador',
    'Ribeira',
    'Cocotá',
    'Cacuia',
    'Freguesia (Ilha)',
    'Jardim Guanabara'
  ]
};

// Cidades de fora do Rio sugeridas
const SUGGESTED_EXTERNAL_CITIES = [
  'Niterói - RJ',
  'Duque de Caxias - RJ',
  'São Gonçalo - RJ',
  'Maricá - RJ',
  'Nova Iguaçu - RJ',
  'Petrópolis - RJ',
  'Cabo Frio - RJ',
  'Campos dos Goytacazes - RJ',
  'São Paulo - SP',
  'Santos - SP',
  'Campinas - SP',
  'Salvador - BA',
  'Recife - PE',
  'Florianópolis - SC',
  'Porto Alegre - RS',
  'Belo Horizonte - MG',
  'Juiz de Fora - MG',
  'Belém - PA',
  'Manaus - AM',
  'Brasília - DF'
];

// Presets de cores populares do carnaval
interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Azul e Branco', primary: '#1d4ed8', secondary: '#ffffff', accent: '#60a5fa', text: '#ffffff', border: '#93c5fd' },
  { name: 'Verde e Rosa', primary: '#15803d', secondary: '#db2777', accent: '#f472b6', text: '#ffffff', border: '#22c55e' },
  { name: 'Vermelho e Branco', primary: '#dc2626', secondary: '#ffffff', accent: '#ef4444', text: '#ffffff', border: '#f87171' },
  { name: 'Verde e Branco', primary: '#15803d', secondary: '#ffffff', accent: '#22c55e', text: '#ffffff', border: '#4ade80' },
  { name: 'Azul e Amarelo Ouro', primary: '#1e40af', secondary: '#eab308', accent: '#fde047', text: '#ffffff', border: '#facc15' },
  { name: 'Preto e Ouro', primary: '#0f172a', secondary: '#f59e0b', accent: '#fbbf24', text: '#ffffff', border: '#d97706' },
  { name: 'Roxo e Amarelo', primary: '#7e22ce', secondary: '#facc15', accent: '#fbbf24', text: '#ffffff', border: '#a855f7' },
  { name: 'Vermelho, Preto e Branco', primary: '#b91c1c', secondary: '#09090b', accent: '#ffffff', text: '#ffffff', border: '#ef4444' },
  { name: 'Azul Turquesa e Coral', primary: '#0284c7', secondary: '#f97316', accent: '#fb923c', text: '#ffffff', border: '#38bdf8' },
  { name: 'Bordeaux e Dourado', primary: '#881337', secondary: '#d97706', accent: '#fbbf24', text: '#ffffff', border: '#be123c' }
];

// Símbolos clássicos do samba
interface SymbolPreset {
  id: string;
  label: string;
  emoji: string;
}

const SYMBOL_PRESETS: SymbolPreset[] = [
  { id: 'aguia', label: 'Águia Altaneira', emoji: '🦅' },
  { id: 'coroa', label: 'Coroa Imperial', emoji: '👑' },
  { id: 'leao', label: 'Leão Majestoso', emoji: '🦁' },
  { id: 'tigre', label: 'Tigre Guerreiro', emoji: '🐯' },
  { id: 'estrela', label: 'Estrela Guia Radiante', emoji: '⭐' },
  { id: 'pavao', label: 'Pavão Real Místico', emoji: '🦚' },
  { id: 'pomba', label: 'Pomba Branca da Paz', emoji: '🕊️' },
  { id: 'serpente', label: 'Serpente Sagrada', emoji: '🐍' },
  { id: 'sol', label: 'Sol Dourado da Vitória', emoji: '☀️' },
  { id: 'lua', label: 'Lua de Prata dos Boêmios', emoji: '🌙' },
  { id: 'tamborim', label: 'Tamborim & Pandeiro', emoji: '🥁' },
  { id: 'mascara', label: 'Máscaras da Folia', emoji: '🎭' },
  { id: 'arco', label: 'Arco e Flecha de Oxóssi', emoji: '🏹' },
  { id: 'espada', label: 'Espadas Cruzadas de Ogum', emoji: '⚔️' },
  { id: 'ancora', label: 'Âncora dos Navegantes', emoji: '⚓' },
  { id: 'caravela', label: 'Caravela da Esperança', emoji: '⛵' },
  { id: 'cavalo', label: 'Cavalo Alado / Pégaso', emoji: '🐎' },
  { id: 'boto', label: 'Boto Encantado', emoji: '🐬' },
  { id: 'palmeira', label: 'Palmeira Imperial', emoji: '🌴' },
  { id: 'trompete', label: 'Trompete & Clarin', emoji: '🎺' },
  { id: 'flordelis', label: 'Flor de Lis Imperial', emoji: '⚜️' },
  { id: 'dragao', label: 'Dragão Alado de Fogo', emoji: '🐉' }
];

export const SchoolCreationEditor: React.FC<SchoolCreationEditorProps> = ({
  currentYear,
  onConfirmCreation,
  onCancel
}) => {
  // Identidade básica
  const [denomination, setDenomination] = useState<string>('G.R.E.S.');
  const [name, setName] = useState<string>('Estrela do Amanhã');
  const [shortName, setShortName] = useState<string>('Estrela do Amanhã');
  const [abbreviation, setAbbreviation] = useState<string>('EST');
  const [nickname, setNickname] = useState<string>('A Queridinha da Comunidade');
  const [motto, setMotto] = useState<string>('Comunidade, Raça e Coração');
  const [managerName, setManagerName] = useState<string>('Diretor Presidente');

  // Origem Territorial
  const [originType, setOriginType] = useState<'rio_bairro' | 'outra_cidade'>('rio_bairro');
  const [selectedRioZone, setSelectedRioZone] = useState<string>('Zona Norte');
  const [rioNeighborhood, setRioNeighborhood] = useState<string>('Madureira');
  const [customCityState, setCustomCityState] = useState<string>('Niterói - RJ');

  // Cores
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [primaryColor, setPrimaryColor] = useState<string>(COLOR_PRESETS[0].primary);
  const [secondaryColor, setSecondaryColor] = useState<string>(COLOR_PRESETS[0].secondary);
  const [accentColor, setAccentColor] = useState<string>(COLOR_PRESETS[0].accent);
  const [colorsDescription, setColorsDescription] = useState<string>('Azul Real e Branco Neve');

  // Símbolo
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolPreset>(SYMBOL_PRESETS[4]); // Estrela
  const [customSymbolText, setCustomSymbolText] = useState<string>('');

  // Fundação & Quadra
  const [foundationYear, setFoundationYear] = useState<number>(currentYear);
  const [foundationDate, setFoundationDate] = useState<string>(`20 de Janeiro de ${currentYear}`);
  const [quadraName, setQuadraName] = useState<string>('Palácio do Samba e da Folia');

  // Atributos de Quesitos (Base 74 + 5 pontos bônus customizáveis)
  const [bonusPoints, setBonusPoints] = useState<Record<string, number>>({
    bateria: 1,
    comissaoDeFrente: 1,
    evolucao: 0,
    harmonia: 1,
    enredo: 1,
    fantasias: 0,
    alegorias: 0,
    sambaEnredo: 1,
    mestreSalaPortaBandeira: 0
  });

  const totalBonusUsed = Object.values(bonusPoints).reduce((a, b) => a + b, 0);
  const maxBonusPoints = 5;

  const handleAdjustBonus = (key: string, delta: number) => {
    const current = bonusPoints[key] || 0;
    const nextVal = current + delta;
    if (nextVal < 0) return;
    if (delta > 0 && totalBonusUsed >= maxBonusPoints) return;
    setBonusPoints({ ...bonusPoints, [key]: nextVal });
  };

  const handlePresetSelect = (preset: ColorPreset, idx: number) => {
    setSelectedPresetIndex(idx);
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
    setColorsDescription(preset.name);
  };

  const effectiveNeighborhood =
    originType === 'rio_bairro' ? rioNeighborhood : customCityState;

  const effectiveSymbol = customSymbolText.trim()
    ? customSymbolText.trim()
    : `${selectedSymbol.emoji} ${selectedSymbol.label}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe o nome oficial da sua Escola de Samba.');
      return;
    }

    const cleanBaseName = name
      .replace(/^Grêmio Recreativo Escola de Samba\s+/i, '')
      .replace(/^G\.?R\.?E\.?S\.?\s+/i, '')
      .replace(/^Clube Carnavalesco Escola de Samba\s+/i, '')
      .replace(/^C\.?C\.?E\.?S\.?\s+/i, '')
      .trim();

    const corporateName = `${denomination} ${cleanBaseName}`;
    const schoolId = `custom_${cleanBaseName.toLowerCase().replace(/[^\w]/g, '_')}_${Date.now()}`;

    // Atributos finais (base 74 + bônus distribuído)
    const attributes: SchoolAttributes = {
      bateria: 74 + (bonusPoints.bateria || 0),
      comissaoDeFrente: 74 + (bonusPoints.comissaoDeFrente || 0),
      evolucao: 74 + (bonusPoints.evolucao || 0),
      harmonia: 74 + (bonusPoints.harmonia || 0),
      enredo: 74 + (bonusPoints.enredo || 0),
      fantasias: 74 + (bonusPoints.fantasias || 0),
      alegorias: 74 + (bonusPoints.alegorias || 0),
      sambaEnredo: 74 + (bonusPoints.sambaEnredo || 0),
      mestreSalaPortaBandeira: 74 + (bonusPoints.mestreSalaPortaBandeira || 0)
    };

    // Corpo técnico inicial qualificado para o Grupo de Avaliação
    const staff: School['staff'] = {
      carnavalesco: {
        id: `st_c_${schoolId}`,
        name: `Mestre ${cleanBaseName.split(' ')[0]}`,
        role: 'carnavalesco',
        roleName: 'Carnavalesco',
        rating: 74,
        salary: 11000,
        reputation: 'Idealizador Fundador'
      },
      mestreBateria: {
        id: `st_b_${schoolId}`,
        name: 'Mestre da Comunidade',
        role: 'mestreBateria',
        roleName: 'Mestre de Bateria',
        rating: 74,
        salary: 12000,
        reputation: 'Baque da Fundação'
      },
      harmonia: {
        id: `st_h_${schoolId}`,
        name: 'Diretor Geral de Harmonia',
        role: 'harmonia',
        roleName: 'Diretor de Harmonia',
        rating: 74,
        salary: 10000,
        reputation: 'Canto Comunitário'
      },
      mestreSalaPortaBandeira: {
        id: `st_m_${schoolId}`,
        name: '1º Casal MS e PB Fundadores',
        role: 'mestreSalaPortaBandeira',
        roleName: '1º Casal MS e PB',
        rating: 74,
        salary: 10000,
        reputation: 'Pavilhão Sagrado'
      },
      interprete: {
        id: `st_i_${schoolId}`,
        name: 'Voz Oficial da Agremiação',
        role: 'interprete',
        roleName: 'Intérprete Oficial',
        rating: 74,
        salary: 11000,
        reputation: 'Trombeta da Colina'
      },
      coreografo: {
        id: `st_cf_${schoolId}`,
        name: 'Coreógrafo da Comissão',
        role: 'coreografo',
        roleName: 'Coreógrafo Comissão',
        rating: 73,
        salary: 9000,
        reputation: 'Passo Inicial'
      }
    };

    const dummySchool: School = {
      id: schoolId,
      denomination,
      corporateName,
      name: cleanBaseName,
      shortName: shortName.trim() || cleanBaseName,
      abbreviation: abbreviation.trim().toUpperCase() || cleanBaseName.substring(0, 3).toUpperCase(),
      nickname: nickname.trim() || `A Força de ${effectiveNeighborhood}`,
      motto: motto.trim() || 'Comunidade, Raça e Samba',
      foundationYear,
      foundationDate,
      neighborhood: effectiveNeighborhood,
      originType,
      cityState: originType === 'outra_cidade' ? customCityState : 'Rio de Janeiro - RJ',
      isCustomSchool: true,
      quadraLevel: 1, // Galpão Rústico Comunitário
      quadraName: quadraName.trim() || 'Quadra da Comunidade',
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        text: '#ffffff',
        border: accentColor || '#ffffff'
      },
      colorsDescription,
      symbol: effectiveSymbol,
      division: 'avaliacao', // OBRIGATORIAMENTE GRUPO DE AVALIAÇÃO
      budget: 220000, // Orçamento inicial balanceado para a Superliga
      fanBaseMorale: 78,
      championshipsEspecial: 0,
      championshipsOuro: 0,
      championshipsPrata: 0,
      championshipsBronze: 0,
      championshipsAvaliacao: 0,
      runnerUpsEspecial: 0,
      runnerUpsOuro: 0,
      runnerUpsPrata: 0,
      runnerUpsBronze: 0,
      runnerUpsAvaliacao: 0,
      isInactive: false,
      inactive: false,
      inactiveYearsCount: 0,
      honors: {
        historicalEspecialTitles: 0,
        historicalEspecialYears: [],
        historicalEspecialRunnerUps: 0,
        historicalEspecialRunnerUpYears: [],
        historicalOuroTitles: 0,
        historicalOuroYears: [],
        historicalOuroRunnerUps: 0,
        inGameAchievements: []
      },
      attributes,
      staff,
      rehearsalLevel: 65,
      barracaoProgress: 60,
      technicalParadeDone: false
    };

    // Gera um enredo inédito, único e adaptado para a identidade desta nova escola
    const initialEnredo = EnredoService.generateUniqueEnredoForSchool(dummySchool, currentYear);
    const completeCustomSchool: School = {
      ...dummySchool,
      currentEnredo: initialEnredo
    };

    soundService.playLevelUp();
    onConfirmCreation(completeCustomSchool, managerName.trim() || 'Diretor Presidente');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Banner de Boas-Vindas ao Modo Criar Escola */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modo Carreira • Fundação de Agremiação</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Crie sua Própria Escola de Samba
          </h2>

          <p className="text-sm text-slate-200 leading-relaxed">
            Dê asas à sua imaginação e funde sua própria agremiação com pavilhão, cores, escudo e sede sob medida!
            Como manda o estatuto carnavalesco, sua escola inicia <strong>obrigatoriamente no Grupo de Avaliação</strong> da Superliga na Intendente Magalhães.
            Contrate profissionais, vá atrás de patrocínio, reforme sua quadra, organize eventos e conduza sua comunidade degrau a degrau rumo ao <strong>Grupo Especial na Marquês de Sapucaí</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Início no Grupo de Avaliação
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Orçamento Inicial de R$ 220.000
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Presença Obrigatória no Sorteio, Desfile e Apuração
            </span>
          </div>
        </div>
      </div>

      {/* Grid Principal: Formulário + Painel de Pré-visualização Ao Vivo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Formulário de Configuração (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Identidade e Denominação */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400">
              <Building2 className="w-5 h-5" />
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                1. Registro Estatutário & Nomes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Denominação Estatutária:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['G.R.E.S.', 'C.C.E.S.', 'S.R.E.S.', 'G.R.B.C.'].map((denom) => (
                    <button
                      key={denom}
                      type="button"
                      onClick={() => setDenomination(denom)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-black transition cursor-pointer border ${
                        denomination === denom
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {denom}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Sigla Oficial (Abreviação):
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value.toUpperCase())}
                  placeholder="Ex: EDA, IMPS..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold uppercase outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Nome Completo da Agremiação:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!shortName || shortName === name) setShortName(e.target.value);
                  }}
                  placeholder="Ex: Estrela do Amanhã, Imperiais da Zona Sul..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Nome Chamado / Nome Curto:
                </label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  placeholder="Ex: Estrela, Imperiais..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-semibold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Presidente / Diretor Geral:
                </label>
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Seu nome ou cargo..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-semibold outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Lema Oficial / Apelido Comunitário:
                </label>
                <input
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  placeholder="Ex: Comunidade, Raça e Coração..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-amber-200 italic outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Berço / Origem Territorial (Rio de Janeiro vs Outra Cidade) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400">
                <MapPin className="w-5 h-5" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  2. Origem Territorial & Bairro/Cidade
                </h3>
              </div>
            </div>

            {/* Toggle Tipo de Origem */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setOriginType('rio_bairro')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  originType === 'rio_bairro'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Bairro do Rio de Janeiro</span>
              </button>

              <button
                type="button"
                onClick={() => setOriginType('outra_cidade')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  originType === 'outra_cidade'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Outra Cidade / Estado</span>
              </button>
            </div>

            {originType === 'rio_bairro' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {Object.keys(RIO_NEIGHBORHOODS_BY_ZONE).map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setSelectedRioZone(zone)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition whitespace-nowrap cursor-pointer border ${
                        selectedRioZone === zone
                          ? 'bg-slate-800 text-amber-300 border-amber-500/50'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1.5">
                    Escolha o Bairro Carioca (Berço da Agremiação):
                  </label>
                  <select
                    value={rioNeighborhood}
                    onChange={(e) => setRioNeighborhood(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white font-semibold outline-none cursor-pointer"
                  >
                    {RIO_NEIGHBORHOODS_BY_ZONE[selectedRioZone].map((bairro) => (
                      <option key={bairro} value={bairro}>
                        {bairro} ({selectedRioZone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Digite a Cidade e Estado de Origem:
                  </label>
                  <input
                    type="text"
                    value={customCityState}
                    onChange={(e) => setCustomCityState(e.target.value)}
                    placeholder="Ex: Niterói - RJ, Salvador - BA, Santos - SP..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white font-bold outline-none"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Sugestões Rápidas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_EXTERNAL_CITIES.slice(0, 10).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setCustomCityState(city)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition cursor-pointer font-medium ${
                          customCityState === city
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Fundação & Quadra Social */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400">
              <Calendar className="w-5 h-5" />
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                3. Fundação & Quadra Social (Sede)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Ano de Fundação da Escola:
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 focus-within:border-amber-400 rounded-xl px-3 py-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <input
                    type="number"
                    min={1900}
                    max={currentYear + 1}
                    value={foundationYear}
                    onChange={(e) => {
                      const yr = parseInt(e.target.value) || currentYear;
                      setFoundationYear(yr);
                      setFoundationDate(`20 de Janeiro de ${yr}`);
                    }}
                    className="w-full bg-transparent text-sm text-white font-mono font-bold outline-none"
                    placeholder="Ex: 2027"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[1923, 1948, 1954, 1970, 2000, currentYear].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setFoundationYear(yr);
                        setFoundationDate(`20 de Janeiro de ${yr}`);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        foundationYear === yr
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {yr === currentYear ? `Ano Atual (${yr})` : yr}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 block mt-1.5">
                  Data estatutária: {foundationDate}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Nome da Quadra Social (Sede Comunitária):
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 focus-within:border-amber-400 rounded-xl px-3 py-2">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <input
                    type="text"
                    value={quadraName}
                    onChange={(e) => setQuadraName(e.target.value)}
                    placeholder="Ex: Palácio do Samba e da Folia..."
                    className="w-full bg-transparent text-sm text-white font-semibold outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block mt-1.5">
                  Local oficial dos ensaios de bateria, feijoadas e modernizações de patrimônio.
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Cores Oficiais e Pavilhão */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400">
              <Palette className="w-5 h-5" />
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                4. Cores Oficiais do Pavilhão
              </h3>
            </div>

            {/* Presets Rápidos */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Paletas Tradicionais do Carnaval:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {COLOR_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handlePresetSelect(preset, idx)}
                    className={`p-2 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                      selectedPresetIndex === idx
                        ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-white truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Pickers Customizados */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Cor Primária:</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setSelectedPresetIndex(-1);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full text-xs font-mono font-bold text-white bg-transparent outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Cor Secundária:</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      setSelectedPresetIndex(-1);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full text-xs font-mono font-bold text-white bg-transparent outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Cor de Acento (Borda):</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => {
                      setAccentColor(e.target.value);
                      setSelectedPresetIndex(-1);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full text-xs font-mono font-bold text-white bg-transparent outline-none uppercase"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Descrição Textual das Cores:
                </label>
                <input
                  type="text"
                  value={colorsDescription}
                  onChange={(e) => setColorsDescription(e.target.value)}
                  placeholder="Ex: Azul Pavão e Ouro Velho..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white font-semibold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Símbolo Oficial */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400">
              <Crown className="w-5 h-5" />
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                5. Símbolo Oficial do Brasão
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {SYMBOL_PRESETS.map((sym) => (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => {
                    setSelectedSymbol(sym);
                    setCustomSymbolText('');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                    selectedSymbol.id === sym.id && !customSymbolText
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl shrink-0">{sym.emoji}</span>
                  <span className="text-[11px] font-bold truncate">{sym.label}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Ou digite um Símbolo Personalizado:
              </label>
              <input
                type="text"
                value={customSymbolText}
                onChange={(e) => setCustomSymbolText(e.target.value)}
                placeholder="Ex: 🐆 Onça-Pintada Guardiã, 🌹 Rosa Encantada..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white font-semibold outline-none"
              />
            </div>
          </div>

          {/* Card 6: Vocação Técnica Inicial (Bônus de 5 pontos) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-5 h-5" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  6. Vocação Técnica Inicial (Quesitos)
                </h3>
              </div>
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  totalBonusUsed === maxBonusPoints
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                Pontos Livres: {maxBonusPoints - totalBonusUsed} de {maxBonusPoints}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Sua agremiação nasce com nota base de <strong>74 pontos</strong> nos 9 quesitos oficiais. Distribua até 5 pontos de vocação comunitária:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                { key: 'bateria', label: 'Bateria' },
                { key: 'sambaEnredo', label: 'Samba-Enredo' },
                { key: 'comissaoDeFrente', label: 'Comissão de Frente' },
                { key: 'mestreSalaPortaBandeira', label: 'Mestre-Sala e Porta-Bandeira' },
                { key: 'harmonia', label: 'Harmonia' },
                { key: 'evolucao', label: 'Evolução' },
                { key: 'enredo', label: 'Enredo' },
                { key: 'fantasias', label: 'Fantasias' },
                { key: 'alegorias', label: 'Alegorias' }
              ].map((q) => {
                const bonus = bonusPoints[q.key] || 0;
                const score = 74 + bonus;
                return (
                  <div
                    key={q.key}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 block truncate">{q.label}</span>
                      <span className="font-mono text-xs font-black text-amber-400">{score} pts</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleAdjustBonus(q.key, -1)}
                        disabled={bonus <= 0}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-mono font-bold text-xs text-white">
                        {bonus > 0 ? `+${bonus}` : '0'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdjustBonus(q.key, 1)}
                        disabled={totalBonusUsed >= maxBonusPoints}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Coluna Direita: Pré-visualização Ao Vivo da Escola (5 colunas) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flag className="w-4 h-4" />
                <span>Pavilhão Oficial & Ficha Viva</span>
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 border border-purple-500/40 uppercase">
                Grupo de Avaliação
              </span>
            </div>

            {/* Bandeira / Pavilhão Dinâmico Renderizado em Tempo Real */}
            <div
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-2 flex items-center justify-center p-4 transition-all duration-300"
              style={{
                backgroundColor: primaryColor,
                borderColor: accentColor || '#fff'
              }}
            >
              {/* Raios / Estilização do Pavilhão */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `repeating-conic-gradient(from 0deg, ${secondaryColor} 0deg 20deg, transparent 20deg 40deg)`
                }}
              />

              {/* Brasão Circular Central */}
              <div
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 shadow-2xl flex flex-col items-center justify-center text-center p-2 transition-transform hover:scale-105"
                style={{
                  backgroundColor: secondaryColor,
                  borderColor: accentColor || primaryColor
                }}
              >
                <span className="text-3xl sm:text-4xl drop-shadow-md">
                  {selectedSymbol.emoji}
                </span>
                <span
                  className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
                  style={{ color: primaryColor }}
                >
                  {abbreviation || 'SAMBA'}
                </span>
                <span className="text-[8px] font-bold text-slate-800">
                  {foundationYear}
                </span>
              </div>

              {/* Faixa decorativa com nome */}
              <div
                className="absolute bottom-2 left-2 right-2 text-center py-1 px-2 rounded-lg backdrop-blur-md shadow"
                style={{
                  backgroundColor: `${primaryColor}e6`,
                  border: `1px solid ${accentColor || '#ffffff80'}`
                }}
              >
                <div className="text-xs sm:text-sm font-black text-white truncate tracking-wide">
                  {denomination} {name || 'Sua Escola'}
                </div>
              </div>
            </div>

            {/* Informações Resumidas do Perfil */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Denominação / Registro:</span>
                <strong className="text-white font-mono">{denomination} {name}</strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Ano de Fundação:</span>
                <strong className="text-amber-400 font-mono font-black">{foundationYear} ({foundationDate})</strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Berço Comunitário:</span>
                <strong className="text-amber-300 font-bold">{effectiveNeighborhood}</strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Cores Oficiais:</span>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/40"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/40"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <span className="text-white font-semibold text-[11px]">{colorsDescription}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Símbolo Oficial:</span>
                <strong className="text-white">{effectiveSymbol}</strong>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Sede Social / Quadra:</span>
                <strong className="text-slate-200">{quadraName} (Nível 1)</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Orçamento em Caixa:</span>
                <strong className="text-emerald-400 font-mono text-sm font-black">
                  R$ 220.000
                </strong>
              </div>
            </div>

            {/* Botão de Criação Oficial */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Fundar Escola e Iniciar Carnaval {currentYear}</span>
                <ChevronRight className="w-5 h-5 text-slate-950" />
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-bold transition text-center"
                >
                  Voltar à Seleção de Modos
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
