/**
 * Módulo de Gerenciamento de Saves com Dexie.js (IndexedDB)
 * 
 * Arquitetura assíncrona, modular e desacoplada para persistência de estado de jogos.
 * Suporta múltiplos slots, metadados, validação de integridade criptográfica (SHA-256),
 * tratamento de cota de disco e exportação/importação segura via JSON.
 */

import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4/dist/modern/dexie.mjs';

/**
 * Constantes e Configurações do Sistema de Saves
 */
export const SAVE_SCHEMA_VERSION = 1;
export const STANDARD_SLOTS = ['autosave', 'slot_1', 'slot_2', 'slot_3'];

/**
 * Utilitário: Calcula hash SHA-256 de um objeto para verificação de integridade contra corrupção.
 * @param {object} data Objeto serializável
 * @returns {Promise<string>} Hash hexadecimal SHA-256
 */
async function computeDataChecksum(data) {
  const jsonString = JSON.stringify(data);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(jsonString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Utilitário: Formatação de data/hora no padrão local
 * @param {number|Date} timestamp 
 * @returns {string}
 */
function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date(timestamp));
}

/**
 * Classe principal do banco de dados Dexie
 */
class GameSaveDatabase extends Dexie {
  constructor() {
    super('GameSaveDatabase');

    // Definição das tabelas e índices
    this.version(SAVE_SCHEMA_VERSION).stores({
      saves: '&slotId, updatedAt, title'
    });

    this.saves = this.table('saves');
  }
}

/**
 * Gerenciador de Saves de Alto Nível
 */
export class SaveManager {
  /**
   * @param {string} [dbName] Nome opcional do banco para instâncias isoladas
   */
  constructor() {
    this.db = new GameSaveDatabase();
  }

  /**
   * Valida a estrutura básica do estado do jogo antes de persistir.
   * @private
   * @param {object} gameState
   */
  _validateGameState(gameState) {
    if (!gameState || typeof gameState !== 'object') {
      throw new Error('Falha de validação: gameState deve ser um objeto válido não-nulo.');
    }
  }

  /**
   * Salva ou sobrescreve o estado do jogo em um slot específico.
   * 
   * @param {string} slotId Identificador único do slot (ex: 'slot_1', 'autosave')
   * @param {object} gameState Objeto contendo o estado do jogo
   * @param {object} [metadata={}] Metadados adicionais (título, preview em base64, notas)
   * @returns {Promise<object>} Registro completo persistido
   */
  async saveToSlot(slotId, gameState, metadata = {}) {
    if (!slotId || typeof slotId !== 'string') {
      throw new Error('slotId inválido: Deve ser uma string identificadora.');
    }

    this._validateGameState(gameState);

    const now = Date.now();
    const checksum = await computeDataChecksum(gameState);

    // Constrói resumo padrão caso não informado
    const defaultSummary = gameState.player
      ? `${gameState.player.name || 'Jogador'} (Nvl ${gameState.player.level || 1}) - ${gameState.currentScene || 'Início'}`
      : `Cena: ${gameState.currentScene || 'Início'}`;

    const defaultTitle = slotId === 'autosave'
      ? 'Salvamento Automático'
      : `Slot ${slotId.replace('slot_', '')}`;

    const saveRecord = {
      slotId,
      title: metadata.title || defaultTitle,
      summary: metadata.summary || defaultSummary,
      preview: metadata.preview || null, // Base64 de imagem/screenshot ou null
      updatedAt: now,
      updatedAtFormatted: formatTimestamp(now),
      schemaVersion: SAVE_SCHEMA_VERSION,
      checksum,
      gameState,
      metadata: {
        ...metadata,
        clientTimestamp: now,
        userAgent: navigator.userAgent
      }
    };

    try {
      await this.db.saves.put(saveRecord);
      return saveRecord;
    } catch (error) {
      // Tratamento específico de estouro de cota de armazenamento no navegador
      if (error.name === 'QuotaExceededError' || error.inner?.name === 'QuotaExceededError') {
        throw new Error('Espaço em disco insuficiente: A cota de armazenamento do navegador foi excedida.');
      }
      throw new Error(`Falha ao salvar no slot "${slotId}": ${error.message}`);
    }
  }

  /**
   * Carrega e valida os dados de um slot existente.
   * 
   * @param {string} slotId Identificador do slot
   * @returns {Promise<object>} Objeto contendo gameState e metadados
   */
  async loadFromSlot(slotId) {
    if (!slotId) {
      throw new Error('slotId é obrigatório para carregar.');
    }

    try {
      const record = await this.db.saves.get(slotId);

      if (!record) {
        throw new Error(`Nenhum save encontrado no slot "${slotId}".`);
      }

      // Validação de integridade via checksum
      if (record.checksum && record.gameState) {
        const currentChecksum = await computeDataChecksum(record.gameState);
        if (currentChecksum !== record.checksum) {
          throw new Error(`Corrupção de dados detectada no slot "${slotId}": Checksum divergente.`);
        }
      }

      return record;
    } catch (error) {
      throw new Error(`Erro ao carregar o slot "${slotId}": ${error.message}`);
    }
  }

  /**
   * Remove permanentemente os dados de um slot.
   * 
   * @param {string} slotId Identificador do slot
   * @returns {Promise<boolean>} Retorna true se a operação foi executada
   */
  async deleteSlot(slotId) {
    if (!slotId) {
      throw new Error('slotId é obrigatório para exclusão.');
    }

    try {
      await this.db.saves.delete(slotId);
      return true;
    } catch (error) {
      throw new Error(`Falha ao deletar o slot "${slotId}": ${error.message}`);
    }
  }

  /**
   * Lista todos os slots padrão e personalizados, indicando ocupação e metadados.
   * Ideal para alimentar painéis de Save/Load na interface.
   * 
   * @returns {Promise<Array<object>>} Lista ordenada com status de cada slot
   */
  async getAllSlots() {
    try {
      const allRecords = await this.db.saves.toArray();
      const recordsMap = new Map(allRecords.map((r) => [r.slotId, r]));

      // Garante a presença dos slots canônicos no painel
      const standardSlotEntries = STANDARD_SLOTS.map((slotId) => {
        const record = recordsMap.get(slotId);
        recordsMap.delete(slotId);

        return {
          slotId,
          isOccupied: Boolean(record),
          title: record?.title || (slotId === 'autosave' ? 'Salvamento Automático' : `Slot ${slotId.replace('slot_', '')}`),
          updatedAt: record?.updatedAt || null,
          updatedAtFormatted: record?.updatedAtFormatted || 'Vazio',
          summary: record?.summary || 'Nenhum dado salvo',
          preview: record?.preview || null,
          schemaVersion: record?.schemaVersion || null,
          rawRecord: record || null
        };
      });

      // Adiciona slots extras/customizados caso existam no banco
      const customSlotEntries = Array.from(recordsMap.values()).map((record) => ({
        slotId: record.slotId,
        isOccupied: true,
        title: record.title || `Slot ${record.slotId}`,
        updatedAt: record.updatedAt,
        updatedAtFormatted: record.updatedAtFormatted,
        summary: record.summary || 'Save personalizado',
        preview: record.preview || null,
        schemaVersion: record.schemaVersion || null,
        rawRecord: record
      }));

      return [...standardSlotEntries, ...customSlotEntries];
    } catch (error) {
      throw new Error(`Erro ao listar slots: ${error.message}`);
    }
  }

  /**
   * Exporta os dados de um slot como arquivo .json e aciona o download local no navegador.
   * 
   * @param {string} slotId Identificador do slot a ser exportado
   * @returns {Promise<string>} Nome do arquivo baixado
   */
  async exportSlotAsJSON(slotId) {
    const record = await this.loadFromSlot(slotId);

    // Prepara payload com metadados de exportação
    const exportPayload = {
      exportVersion: 1,
      exportedAt: new Date().toISOString(),
      slotId: record.slotId,
      title: record.title,
      summary: record.summary,
      preview: record.preview,
      schemaVersion: record.schemaVersion,
      checksum: record.checksum,
      gameState: record.gameState,
      metadata: record.metadata
    };

    const jsonString = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    const safeSlotName = slotId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `save_slot_${safeSlotName}_${Date.now()}.json`;

    try {
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = fileName;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return fileName;
    } finally {
      // Libera o objeto da memória após disparo
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }
  }

  /**
   * Lê um arquivo JSON fornecido pelo usuário (via <input type="file">),
   * valida sua estrutura contra corrupção e grava no slot de destino.
   * 
   * @param {File|Blob} file Objeto File proveniente de input ou drop
   * @param {string} targetSlotId Slot onde o save será gravado
   * @returns {Promise<object>} Registro persistido
   */
  async importJSONToSlot(file, targetSlotId) {
    if (!file) {
      throw new Error('Nenhum arquivo foi selecionado para importação.');
    }

    if (!targetSlotId || typeof targetSlotId !== 'string') {
      throw new Error('targetSlotId inválido: Informe o slot de destino.');
    }

    // 1. Leitura assíncrona segura do arquivo
    let fileContent = '';
    try {
      fileContent = await file.text();
    } catch (ioError) {
      throw new Error(`Falha de I/O ao ler o arquivo: ${ioError.message}`);
    }

    // 2. Parse e validação de JSON
    let parsedData = null;
    try {
      parsedData = JSON.parse(fileContent);
    } catch (jsonError) {
      throw new Error('Arquivo corrompido ou formato inválido: O conteúdo não é um JSON válido.');
    }

    // 3. Validação da estrutura mínima exigida
    if (!parsedData || typeof parsedData !== 'object') {
      throw new Error('Arquivo inválido: Estrutura de dados corrompida.');
    }

    if (!parsedData.gameState || typeof parsedData.gameState !== 'object') {
      throw new Error('Arquivo rejeitado: O campo obrigatório "gameState" está ausente ou corrompido.');
    }

    // 4. Verificação de integridade caso contenha checksum original
    if (parsedData.checksum) {
      const computed = await computeDataChecksum(parsedData.gameState);
      if (computed !== parsedData.checksum) {
        throw new Error('Validação de integridade falhou: O estado do jogo foi modificado ou corrompido.');
      }
    }

    // 5. Preserva ou adapta metadados da importação
    const metadata = {
      ...(parsedData.metadata || {}),
      title: parsedData.title ? `${parsedData.title} (Importado)` : `Importado para Slot ${targetSlotId}`,
      summary: parsedData.summary || 'Save importado externamente',
      preview: parsedData.preview || null,
      importedAt: Date.now(),
      originalSlotId: parsedData.slotId || null
    };

    // 6. Grava no IndexedDB no slot de destino
    const savedRecord = await this.saveToSlot(targetSlotId, parsedData.gameState, metadata);
    return savedRecord;
  }
}

// Exporta instância padrão pronta para uso direto caso desejado
export const saveManager = new SaveManager();
