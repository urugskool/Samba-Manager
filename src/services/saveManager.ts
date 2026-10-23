/**
 * Módulo de Persistência com Dexie.js (IndexedDB)
 * 
 * Gerencia múltiplos slots de salvamento, metadados, validação criptográfica SHA-256
 * contra corrupção de dados, tratamento de cota de disco e I/O de arquivos JSON.
 */

import Dexie, { Table } from 'dexie';

export const SAVE_SCHEMA_VERSION = 1;

export const STANDARD_SLOTS = [
  { id: 'autosave', label: 'Auto-save', isAuto: true },
  { id: 'slot_1', label: 'Slot 1', isAuto: false },
  { id: 'slot_2', label: 'Slot 2', isAuto: false },
  { id: 'slot_3', label: 'Slot 3', isAuto: false }
] as const;

export type StandardSlotId = typeof STANDARD_SLOTS[number]['id'];

export interface SaveMetadata {
  title?: string;
  summary?: string;
  preview?: string | null;
  clientTimestamp?: number;
  userAgent?: string;
  seasonYear?: number;
  schoolName?: string;
  divisionName?: string;
  [key: string]: any;
}

export interface SaveRecord {
  slotId: string;
  title: string;
  summary: string;
  preview: string | null;
  updatedAt: number;
  updatedAtFormatted: string;
  schemaVersion: number;
  checksum: string;
  gameState: any;
  metadata: SaveMetadata;
}

export interface SaveSlotInfo {
  slotId: string;
  label: string;
  isAuto: boolean;
  isOccupied: boolean;
  title: string;
  updatedAt: number | null;
  updatedAtFormatted: string;
  summary: string;
  preview: string | null;
  schemaVersion: number | null;
  rawRecord: SaveRecord | null;
}

/**
 * Utilitário: Calcula hash SHA-256 do gameState para garantir integridade contra corrupção.
 */
export async function computeDataChecksum(data: any): Promise<string> {
  const jsonString = JSON.stringify(data);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(jsonString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Formatação de timestamp no padrão local brasileiro
 */
export function formatSaveTimestamp(timestamp: number | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date(timestamp));
}

/**
 * Banco IndexedDB do Dexie
 */
export class GameSaveDatabase extends Dexie {
  saves!: Table<SaveRecord, string>;

  constructor() {
    super('GameSaveDatabase');

    this.version(SAVE_SCHEMA_VERSION).stores({
      saves: '&slotId, updatedAt, title'
    });
  }
}

/**
 * Classe SaveManager desacoplada e assíncrona
 */
export class SaveManager {
  private db: GameSaveDatabase;

  constructor() {
    this.db = new GameSaveDatabase();
  }

  /**
   * Valida se o estado do jogo é um objeto serializável válido.
   */
  private validateGameState(gameState: any): void {
    if (!gameState || typeof gameState !== 'object') {
      throw new Error('Falha de validação: gameState deve ser um objeto válido não-nulo.');
    }
  }

  /**
   * Salva ou sobrescreve o estado no banco de dados.
   */
  async saveToSlot(slotId: string, gameState: any, metadata: SaveMetadata = {}): Promise<SaveRecord> {
    if (!slotId || typeof slotId !== 'string') {
      throw new Error('slotId inválido: Deve ser uma string identificadora.');
    }

    this.validateGameState(gameState);

    const now = Date.now();
    const checksum = await computeDataChecksum(gameState);

    // Gera resumo legível automático baseado nas informações do jogo ou metadados
    let defaultSummary = 'Jogo Salvo';
    if (metadata.summary) {
      defaultSummary = metadata.summary;
    } else if (metadata.schoolName) {
      defaultSummary = `${metadata.schoolName} (${metadata.divisionName || 'Carnaval'}) • ${metadata.seasonYear || '2027'}`;
    } else if (gameState.player) {
      defaultSummary = `${gameState.player.name || 'Jogador'} (Nvl ${gameState.player.level || 1}) - ${gameState.currentScene || 'Início'}`;
    } else if (gameState.currentYear) {
      defaultSummary = `Temporada ${gameState.currentYear} - Mês: ${gameState.currentSeasonMonth || 'Março'}`;
    }

    const defaultTitle = slotId === 'autosave'
      ? 'Salvamento Automático'
      : `Slot ${slotId.replace('slot_', '')}`;

    const saveRecord: SaveRecord = {
      slotId,
      title: metadata.title || defaultTitle,
      summary: defaultSummary,
      preview: metadata.preview || null,
      updatedAt: now,
      updatedAtFormatted: formatSaveTimestamp(now),
      schemaVersion: SAVE_SCHEMA_VERSION,
      checksum,
      gameState,
      metadata: {
        ...metadata,
        clientTimestamp: now,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node/SSR'
      }
    };

    try {
      await this.db.saves.put(saveRecord);
      return saveRecord;
    } catch (error: any) {
      if (error?.name === 'QuotaExceededError' || error?.inner?.name === 'QuotaExceededError') {
        throw new Error('Espaço em disco insuficiente: A cota de armazenamento do navegador foi excedida.');
      }
      throw new Error(`Falha ao salvar no slot "${slotId}": ${error?.message || error}`);
    }
  }

  /**
   * Carrega os dados de um slot com validação de integridade.
   */
  async loadFromSlot(slotId: string): Promise<SaveRecord> {
    if (!slotId) {
      throw new Error('slotId é obrigatório para carregar.');
    }

    try {
      const record = await this.db.saves.get(slotId);

      if (!record) {
        throw new Error(`Nenhum save encontrado no slot "${slotId}".`);
      }

      // Validação de integridade do payload
      if (record.checksum && record.gameState) {
        const currentChecksum = await computeDataChecksum(record.gameState);
        if (currentChecksum !== record.checksum) {
          throw new Error(`Corrupção de integridade detectada no slot "${slotId}": Checksum divergente.`);
        }
      }

      return record;
    } catch (error: any) {
      throw new Error(`Erro ao carregar o slot "${slotId}": ${error?.message || error}`);
    }
  }

  /**
   * Remove permanentemente os dados de um slot.
   */
  async deleteSlot(slotId: string): Promise<boolean> {
    if (!slotId) {
      throw new Error('slotId é obrigatório para exclusão.');
    }

    try {
      await this.db.saves.delete(slotId);
      return true;
    } catch (error: any) {
      throw new Error(`Falha ao excluir o slot "${slotId}": ${error?.message || error}`);
    }
  }

  /**
   * Retorna os 4 slots principais (Auto-save, Slot 1, Slot 2, Slot 3) com status e metadados.
   */
  async getAllSlots(): Promise<SaveSlotInfo[]> {
    try {
      const allRecords = await this.db.saves.toArray();
      const recordsMap = new Map<string, SaveRecord>(allRecords.map((r) => [r.slotId, r]));

      return STANDARD_SLOTS.map((def) => {
        const record = recordsMap.get(def.id);

        return {
          slotId: def.id,
          label: def.label,
          isAuto: def.isAuto,
          isOccupied: Boolean(record),
          title: record?.title || (def.isAuto ? 'Salvamento Automático' : `Slot ${def.id.replace('slot_', '')}`),
          updatedAt: record?.updatedAt || null,
          updatedAtFormatted: record?.updatedAtFormatted || 'Vazio',
          summary: record?.summary || (def.isAuto ? 'Nenhum auto-save registrado' : 'Slot livre para gravação'),
          preview: record?.preview || null,
          schemaVersion: record?.schemaVersion || null,
          rawRecord: record || null
        };
      });
    } catch (error: any) {
      throw new Error(`Erro ao listar slots: ${error?.message || error}`);
    }
  }

  /**
   * Exporta os dados do slot como arquivo .json e aciona o download local via Blob.
   */
  async exportSlotAsJSON(slotId: string): Promise<string> {
    const record = await this.loadFromSlot(slotId);

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
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    }
  }

  /**
   * Lê um arquivo JSON fornecido, valida sua estrutura e integridade, e grava no slot especificado.
   */
  async importJSONToSlot(file: File | Blob, targetSlotId: string): Promise<SaveRecord> {
    if (!file) {
      throw new Error('Nenhum arquivo foi selecionado.');
    }

    if (!targetSlotId || typeof targetSlotId !== 'string') {
      throw new Error('targetSlotId inválido: Informe o slot de destino.');
    }

    // 1. Leitura de I/O
    let fileContent = '';
    try {
      fileContent = await file.text();
    } catch (ioError: any) {
      throw new Error(`Falha de I/O ao ler o arquivo: ${ioError?.message || ioError}`);
    }

    // 2. Parse JSON
    let parsedData: any = null;
    try {
      parsedData = JSON.parse(fileContent);
    } catch {
      throw new Error('Formato inválido: O arquivo enviado não é um JSON válido.');
    }

    // 3. Validação de estrutura
    if (!parsedData || typeof parsedData !== 'object') {
      throw new Error('Arquivo corrompido: Estrutura inválida.');
    }

    if (!parsedData.gameState || typeof parsedData.gameState !== 'object') {
      throw new Error('Arquivo rejeitado: O campo obrigatório "gameState" está ausente ou corrompido.');
    }

    // 4. Verificação de integridade
    if (parsedData.checksum) {
      const computed = await computeDataChecksum(parsedData.gameState);
      if (computed !== parsedData.checksum) {
        throw new Error('Integridade comprometida: O estado do jogo foi adulterado ou corrompido.');
      }
    }

    // 5. Normalização de metadados
    const metadata: SaveMetadata = {
      ...(parsedData.metadata || {}),
      title: parsedData.title ? `${parsedData.title} (Importado)` : `Importado no ${targetSlotId}`,
      summary: parsedData.summary || 'Save importado de arquivo externo',
      preview: parsedData.preview || null,
      importedAt: Date.now(),
      originalSlotId: parsedData.slotId || null
    };

    // 6. Grava no Dexie
    const savedRecord = await this.saveToSlot(targetSlotId, parsedData.gameState, metadata);
    return savedRecord;
  }
}

export const saveManager = new SaveManager();
