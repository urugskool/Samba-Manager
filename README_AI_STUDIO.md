# Samba Manager — Reforma do Gerador Temático

## Critério Principal: "O ENREDO DITA O DESFILE"

No **Samba Manager**, a concepção artística do desfile de Carnaval obedece rigorosamente ao enredo escolhido pela agremiação. Cada setor, alegoria, elemento cenográfico e ala é construído, nomeado e caracterizado em função direta da narrativa do enredo, sendo recriações e obras artísticas autênticas do tema retratado.

Não são utilizados modelos formulaicos pré-fabricados (como "gênese/origens", "jornada/desenvolvimento" ou "apoteose/consagração"): o roteiro é organicamente pesquisado e desdobrado a partir do universo histórico, cultural e poético do enredo.

---

## 1. Arquitetura Implementada

A reforma do gerador temático estrutura-se em quatro pilares principais integrados ao ecossistema existente:

1. **Base de Dados Temática Canônica (`src/data/thematicParadeDatabase.ts`)**:
   - Definições artísticas completas para os temas das agremiações:
     - **Japão**: Do Sol Nascente e deuses xintoístas aos bravos samurais, o navio Kasato Maru e a conexão nipo-brasileira.
     - **Egito**: As pirâmides de Gizé, o rio Nilo da criação, a balança de Anúbis e os faustos de Tutancâmon e Cleópatra.
     - **Amazônia**: A Samaúma sagrada, os rios voadores, os encantados (Boto, Curupira) e o festival de Parintins.
     - **Futebol**: Da várzea e bola de meia aos templos mundiais, a ginga do drible, Pelé, Garrincha e a paixão das arquibancadas.
     - **Inteligência Artificial (Tema Inédito 1)**: "O Algoritmo do Tamborim" — redes neurais, androides e a certeza de que nenhuma máquina substitui o calor humano.
     - **Astronomia & Cosmos (Tema Inédito 2)**: "Odisseia Estelar" — do Big Bang e nebulosas ao telescópio James Webb e a poeira de estrelas que baila na passarela.
   - Cada tema define Comissão de Frente, 1º e 2º Casais de Mestre-Sala e Porta-Bandeira, Abre-Alas, Tripés, Baianas, Bateria, Passistas, Alegorias intermediárias, Velha Guarda e Última Alegoria, além de 20 a 25 alas específicas categorizadas por setor.

2. **Motor do Roteiro Oficial do Desfile (`src/services/paradeScriptService.ts`)**:
   - Detecção ponderada e pontuada de palavras-chave (`detectThematicPreset`), com correspondência exata para evitar colisões entre temas.
   - Geração dinâmica contextualizada (`generateThematicPresetScript` e `extractNarrativeProfile`), respeitando a divisão regulamentar da agremiação (Grupo Especial: 28 alas, 5 alegorias; Série Ouro: 20 alas, 3 alegorias; etc.).
   - Setores puramente narrativos e artísticos, livres de rótulos formulaicos ("gênese", "jornada", "apoteose").
   - Invalidação de cache em tempo real (`clearCache`) quando a escola troca de enredo.

3. **Serviço de Enredos (`src/services/enredoService.ts`)**:
   - Núcleos temáticos de alta fidelidade integrados a `THEMATIC_CORES`.
   - Gerador procedural de temas inéditos (`generateUniqueEnredoForSchool`) para enredos criados dinamicamente ao longo das temporadas.

4. **Interface e Apresentação do Desfile**:
   - **Barracão (`src/components/BarracaoView.tsx`)**:
     - Apresenta o enredo oficial definido pela própria escola com argumento, sinopse e botão direto *Ver Roteiro Oficial do Desfile (Livro Abre-Alas)*.
   - **Modo Observador (`src/components/SpectatorSeasonOverview.tsx`)**:
     - Lista as agremiações com seus enredos definidos, permitindo abrir e inspecionar o Livro Abre-Alas de cada uma na avenida.
   - **Simulador do Desfile (`src/components/DesfileSimulator.tsx`)**:
     - Transmissão minuto a minuto com narração em tempo real dos elementos e alas temáticas geradas pelo enredo.

---

## 2. Como os Temas Estão Definidos nas Escolas

Cada escola no jogo possui seu tema próprio e definido, sem tópicos formulaicos de gênese ou apoteose, sendo cada elemento uma recriação artística autêntica:

1. **Japão — Unidos do Viradouro**:
   - *Enredo*: "O Império do Sol Nascente: O Voo das Garças de Quioto, a Honra dos Samurais e o Laço Eterno no Brasil"
   - *Setor 1*: O Arquipélago Sagrado: O Sol Nascente e os Deuses Xintoístas
   - *Setor 2*: A Era dos Samurais e o Florescer das Artes Milenares
   - *Setor 3*: A Travessia dos Oceanos: O Kasato Maru e a Fraternidade Nipo-Brasileira
   - *Setor 4*: O Japão do Futuro: A Metrópole Neon de Tóquio, Mangás e a Conexão Brasil-Japão
   - *Comissão de Frente*: A Dança dos Samurais de Quioto e o Despertar de Amaterasu
   - *Abre-Alas*: O Templo Dourado de Kinkaku-ji e o Portal Sagrado Torii
   - *Bateria*: Os Tambores Taiko do Imperador e o Trovão de Quioto

2. **Egito — Beija-Flor de Nilópolis**:
   - *Enredo*: "Os Mistérios de Tutancâmon: O Rio Nilo da Criação, a Balança de Anúbis e a Luz Eterna das Pirâmides"
   - *Setor 1*: O Nilo Sagrado e o Panteão dos Deuses Primordiais
   - *Setor 2*: Os Mistérios da Eternidade: As Pirâmides de Gizé e o Livro dos Mortos
   - *Setor 3*: A Idade de Ouro dos Faraós e a Tumba Dourada de Tutancâmon
   - *Setor 4*: O Esplendor de Cleópatra em Alexandria e o Legado Eterno
   - *Comissão de Frente*: O Julgamento da Alma: A Balança de Anúbis e os Guardiões do Sarcófago
   - *Abre-Alas*: O Alvorecer de Gizé: A Esfinge Dourada e o Templo Solar de Rá
   - *Baianas*: As Sacerdotisas de Ísis e as Águas Abençoadas do Nilo

3. **Amazônia — Unidos de Vila Isabel**:
   - *Enredo*: "Amazônia, o Coração Verde da Terra: A Samaúma Sagrada, o Canto dos Encantados e o Grito da Floresta Viva"
   - *Setor 1*: O Manto Sagrado da Floresta: A Samaúma Cósmica e os Povos Originários
   - *Setor 2*: O Reino das Águas Doces e os Encantados dos Igarapés
   - *Setor 3*: A Ópera Cabocla de Parintins: O Folclore que Faz a Selva Cantar
   - *Setor 4*: Os Rios Voadores e o Clamor Planetário: A Salvação do Pulmão do Mundo
   - *Comissão de Frente*: O Alerta dos Encantados e a Fúria Protetora do Curupira
   - *Abre-Alas*: A Grande Árvore da Vida: A Samaúma Ancestral e o Portal das Águas
   - *Bateria*: Os Guardiões do Pulso Verde e os Batuques da Selva

4. **Futebol — Acadêmicos do Salgueiro**:
   - *Enredo*: "A Pátria de Chuteiras: Da Bola de Meia ao Maracanã, o Samba no Pé e a Emoção Sagrada do Gol"
   - *Setor 1*: O Futebol Moleque: Da Várzea e Chão Batido à Dança do Drible
   - *Setor 2*: A Era de Ouro e os Deuses da Pelota: Pelé, Garrincha e Marta
   - *Setor 3*: O Templo Sagrado do Maracanã e o Amor Eterno das Torcidas
   - *Setor 4*: A Glória Eterna do Brasil Canarinho: O Grito de Campeão na Sapucaí
   - *Comissão de Frente*: A Mágica da Pelota: O Drible que Fez o Mundo Parar
   - *Abre-Alas*: O Templo Sagrado do Maracanã e a Catedral do Gol
   - *Carro 2*: Dos Terrões da Periferia aos Palcos do Mundo

5. **Temas Inéditos**:
   - **Inteligência Artificial — Imperatriz Leopoldinense**:
     - *Enredo*: "O Algoritmo do Tamborim: Pode a Máquina Ter Alma? A Inteligência Artificial diante da Ginga do Samba"
     - *Setor 1*: A Aurora Digital: Os Primeiros Códigos e a Criação das Máquinas
     - *Setor 2*: A Metrópole Quântica: A Inteligência das Redes e o Big Data
     - *Setor 3*: O Dilema da Consciência: Pode o Algoritmo Ter Alma e Sambar?
     - *Setor 4*: A Vitória da Emoção: A Tecnologia a Serviço da Arte e do Amor Humano
     - *Comissão de Frente*: O Despertar da Consciência: O Encontro do Ciborgue com a Ginga Humana
     - *Bateria*: Os Ritmistas Cibernéticos e o Tamborim de Nanotecnologia
   - **Astronomia & Cosmos — Estação Primeira de Mangueira**:
     - *Enredo*: "Odisseia Estelar: A Dança das Galáxias, o Pálido Ponto Azul e o Voo do Samba pelo Infinito"
     - *Setor 1*: O Big Bang e o Nascimento da Luz: O Despertar do Universo
     - *Setor 2*: O Sistema Solar e a Sinfonia das Órbitas Planetárias
     - *Setor 3*: Os Olhos da Humanidade: De Galileu aos Telescópios James Webb
     - *Setor 4*: O Pálido Ponto Azul: Somos Poeira de Estrelas na Passarela do Infinito
     - *Comissão de Frente*: O Big Bang Primordial e a Dança das Partículas de Luz
     - *Abre-Alas*: O Observatório James Webb e o Olhar Infravermelho do Cosmos
     - *Alas*: O Vácuo Quântico, O Sol Astro Rei, Saturno e os Anéis Majestosos, etc.

---

## 3. Testes Automatizados

Para executar o test suite de verificação do gerador temático:
```bash
npm run test
```
O teste valida:
- Reconhecimento de presets para todos os temas canônicos.
- Presença de setores e elementos específicos em cada desfile.
- Geração dinâmica para enredos procedurais inéditos.
- Invalidação de cache após troca de enredo.
- Fidelidade regulamentar em múltiplas divisões (Especial, Ouro, etc.).
- Ausência de termos formulaicos de gênese e apoteose.
