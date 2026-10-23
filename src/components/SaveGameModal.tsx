import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  saveManager,
  SaveSlotInfo,
  SaveRecord,
  SaveMetadata,
  STANDARD_SLOTS
} from '../services/saveManager';
import {
  Save,
  Download,
  Upload,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileJson,
  Sparkles,
  HardDrive,
  ShieldCheck,
  RefreshCw,
  FolderOpen,
  Calendar,
  AlertTriangle,
  FileUp,
  Eye,
  Check
} from 'lucide-react';

export interface SaveGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGameState: any;
  onLoadGame: (loadedState: any, saveRecord?: SaveRecord) => void;
  currentMetadata?: SaveMetadata;
}

export const SaveGameModal: React.FC<SaveGameModalProps> = ({
  isOpen,
  onClose,
  currentGameState,
  onLoadGame,
  currentMetadata = {}
}) => {
  const [slots, setSlots] = useState<SaveSlotInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeActionSlot, setActiveActionSlot] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    text: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  // Estados de confirmação
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'overwrite' | 'delete' | 'load';
    slotId: string;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // Edição de título ao salvar
  const [editingTitleSlot, setEditingTitleSlot] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState<string>('');

  // Inspeção de detalhes do save
  const [inspectRecord, setInspectRecord] = useState<SaveRecord | null>(null);

  // Referência do input de arquivo para importação
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetImportSlotRef = useRef<string | null>(null);

  // Carrega e atualiza a lista de slots do IndexedDB
  const refreshSlots = useCallback(async () => {
    setIsLoading(true);
    try {
      const allSlots = await saveManager.getAllSlots();
      setSlots(allSlots);
    } catch (error: any) {
      setFeedback({
        text: `Erro ao acessar o banco IndexedDB: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshSlots();
      setFeedback(null);
      setInspectRecord(null);
      setConfirmDialog(null);
    }
  }, [isOpen, refreshSlots]);

  // Tecla ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (inspectRecord) {
          setInspectRecord(null);
        } else if (confirmDialog) {
          setConfirmDialog(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inspectRecord, confirmDialog, onClose]);

  if (!isOpen) return null;

  // Ação: Salvar no Slot
  const executeSave = async (slotId: string, customSlotTitle?: string) => {
    setActiveActionSlot(slotId);
    try {
      const meta: SaveMetadata = {
        ...currentMetadata,
        title: customSlotTitle || (slotId === 'autosave' ? 'Salvamento Automático' : `Slot ${slotId.replace('slot_', '')}`)
      };

      await saveManager.saveToSlot(slotId, currentGameState, meta);
      setFeedback({
        text: `Jogo salvo com sucesso no ${slotId === 'autosave' ? 'Auto-save' : slotId.replace('slot_', 'Slot ')}!`,
        type: 'success'
      });
      setEditingTitleSlot(null);
      await refreshSlots();
    } catch (error: any) {
      setFeedback({
        text: error.message || 'Falha ao salvar os dados no navegador.',
        type: 'error'
      });
    } finally {
      setActiveActionSlot(null);
    }
  };

  const handleRequestSave = (slot: SaveSlotInfo) => {
    if (slot.isOccupied) {
      setConfirmDialog({
        isOpen: true,
        type: 'overwrite',
        slotId: slot.slotId,
        title: `Sobrescrever ${slot.title}?`,
        description: `Os dados anteriores (${slot.updatedAtFormatted} • ${slot.summary}) serão substituídos permanentemente pelo estado atual do jogo.`,
        onConfirm: async () => {
          setConfirmDialog(null);
          await executeSave(slot.slotId);
        }
      });
    } else {
      executeSave(slot.slotId);
    }
  };

  // Ação: Carregar do Slot
  const handleRequestLoad = (slot: SaveSlotInfo) => {
    if (!slot.isOccupied || !slot.rawRecord) {
      setFeedback({ text: 'O slot selecionado está vazio.', type: 'warning' });
      return;
    }

    setConfirmDialog({
      isOpen: true,
      type: 'load',
      slotId: slot.slotId,
      title: `Carregar ${slot.title}?`,
      description: `Todo o progresso atual não salvo será substituído pelos dados salvos em ${slot.updatedAtFormatted}.`,
      onConfirm: async () => {
        setConfirmDialog(null);
        setActiveActionSlot(slot.slotId);
        try {
          const loadedRecord = await saveManager.loadFromSlot(slot.slotId);
          onLoadGame(loadedRecord.gameState, loadedRecord);
          setFeedback({
            text: `Save "${loadedRecord.title}" carregado com sucesso!`,
            type: 'success'
          });
          setTimeout(() => {
            onClose();
          }, 800);
        } catch (error: any) {
          setFeedback({
            text: `Erro ao carregar save: ${error.message}`,
            type: 'error'
          });
        } finally {
          setActiveActionSlot(null);
        }
      }
    });
  };

  // Ação: Excluir Slot
  const handleRequestDelete = (slot: SaveSlotInfo) => {
    if (!slot.isOccupied) return;

    setConfirmDialog({
      isOpen: true,
      type: 'delete',
      slotId: slot.slotId,
      title: `Excluir dados do ${slot.title}?`,
      description: 'Esta ação removerá permanentemente o save do armazenamento local do navegador.',
      onConfirm: async () => {
        setConfirmDialog(null);
        setActiveActionSlot(slot.slotId);
        try {
          await saveManager.deleteSlot(slot.slotId);
          setFeedback({
            text: `Slot "${slot.title}" foi limpo com sucesso.`,
            type: 'info'
          });
          await refreshSlots();
        } catch (error: any) {
          setFeedback({
            text: `Erro ao excluir: ${error.message}`,
            type: 'error'
          });
        } finally {
          setActiveActionSlot(null);
        }
      }
    });
  };

  // Ação: Exportar Slot como JSON
  const handleExportSlot = async (slotId: string) => {
    setActiveActionSlot(slotId);
    try {
      const fileName = await saveManager.exportSlotAsJSON(slotId);
      setFeedback({
        text: `Arquivo "${fileName}" baixado com sucesso!`,
        type: 'success'
      });
    } catch (error: any) {
      setFeedback({
        text: `Falha na exportação: ${error.message}`,
        type: 'error'
      });
    } finally {
      setActiveActionSlot(null);
    }
  };

  // Ação: Importar JSON para o Slot
  const handleTriggerImport = (slotId: string) => {
    targetImportSlotRef.current = slotId;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetSlotId = targetImportSlotRef.current;

    if (!file || !targetSlotId) return;

    setIsLoading(true);
    try {
      const importedRecord = await saveManager.importJSONToSlot(file, targetSlotId);
      setFeedback({
        text: `Arquivo importado com sucesso para "${importedRecord.title}"!`,
        type: 'success'
      });
      await refreshSlots();
    } catch (error: any) {
      setFeedback({
        text: `Falha na importação: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
      targetImportSlotRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Input de arquivo invisível para importação */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Caixa do Modal */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-wide">
                  Gerenciador de Saves
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  IndexedDB
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                4 slots persistentes no navegador com suporte a download e restauração de arquivos .json
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshSlots}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700/60 disabled:opacity-50"
              title="Recarregar slots"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700/60"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            className={`px-5 py-3 border-b text-xs flex items-center justify-between gap-3 ${
              feedback.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                : feedback.type === 'error'
                ? 'bg-rose-950/60 border-rose-800/60 text-rose-300'
                : feedback.type === 'warning'
                ? 'bg-amber-950/60 border-amber-800/60 text-amber-300'
                : 'bg-blue-950/60 border-blue-800/60 text-blue-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
              {feedback.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
              {feedback.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />}
              {feedback.type === 'info' && <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />}
              <span>{feedback.text}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-slate-400 hover:text-white text-xs underline cursor-pointer"
            >
              Dispensar
            </button>
          </div>
        )}

        {/* Corpo: Grade dos 4 Slots */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((slot) => {
              const isBusy = activeActionSlot === slot.slotId;
              const isAuto = slot.isAuto;

              return (
                <div
                  key={slot.slotId}
                  className={`relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 ${
                    slot.isOccupied
                      ? isAuto
                        ? 'bg-slate-950/70 border-amber-500/40 shadow-sm shadow-amber-500/5'
                        : 'bg-slate-950/70 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/40 border-dashed border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Cabeçalho do Card */}
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            slot.isOccupied
                              ? isAuto
                                ? 'bg-amber-400 shadow-sm shadow-amber-400/50'
                                : 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                              : 'bg-slate-600'
                          }`}
                        />
                        <span className="font-bold text-sm text-white flex items-center gap-1.5">
                          {slot.title}
                          {isAuto && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Automático
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            slot.isOccupied
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-800/60 border-slate-700 text-slate-400'
                          }`}
                        >
                          {slot.isOccupied ? 'Gravado' : 'Livre'}
                        </span>

                        {slot.isOccupied && slot.rawRecord?.checksum && (
                          <span
                            className="p-1 text-slate-500 hover:text-emerald-400 transition"
                            title={`Integridade SHA-256 Verificada: ${slot.rawRecord.checksum.slice(0, 8)}...`}
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadados & Resumo */}
                    <div className="py-3 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>Data:</span>
                        <span className="font-mono text-slate-200">
                          {slot.updatedAtFormatted}
                        </span>
                      </div>

                      <div className="flex items-start gap-1.5 text-slate-300">
                        <FolderOpen className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed text-slate-300">
                          {slot.summary}
                        </span>
                      </div>

                      {/* Modo edição de título para personalização */}
                      {editingTitleSlot === slot.slotId && (
                        <div className="pt-2 flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Nome personalizado do save..."
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                          />
                          <button
                            onClick={() => executeSave(slot.slotId, customTitle.trim() || undefined)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            OK
                          </button>
                          <button
                            onClick={() => setEditingTitleSlot(null)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ações do Card */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    {/* Botão Salvar */}
                    <button
                      onClick={() => handleRequestSave(slot)}
                      disabled={isBusy}
                      className="flex-1 min-w-[70px] px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Salvar o estado atual do jogo neste slot"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{slot.isOccupied ? 'Sobrescrever' : 'Salvar'}</span>
                    </button>

                    {/* Botão Carregar */}
                    <button
                      onClick={() => handleRequestLoad(slot)}
                      disabled={!slot.isOccupied || isBusy}
                      className="flex-1 min-w-[70px] px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Carregar estado do jogo deste slot"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Carregar</span>
                    </button>

                    {/* Botão Exportar JSON */}
                    <button
                      onClick={() => handleExportSlot(slot.slotId)}
                      disabled={!slot.isOccupied || isBusy}
                      className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Exportar arquivo .json para download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {/* Botão Importar JSON */}
                    <button
                      onClick={() => handleTriggerImport(slot.slotId)}
                      disabled={isBusy}
                      className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                      title="Importar arquivo .json para este slot"
                    >
                      <Upload className="w-3.5 h-3.5" />
                    </button>

                    {/* Botão Inspecionar Detalhes */}
                    {slot.isOccupied && (
                      <button
                        onClick={() => setInspectRecord(slot.rawRecord)}
                        className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                        title="Inspecionar dados e integridade"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Botão Excluir */}
                    {slot.isOccupied && (
                      <button
                        onClick={() => handleRequestDelete(slot)}
                        disabled={isBusy}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg border border-rose-500/30 transition cursor-pointer"
                        title="Excluir save deste slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dica de Utilização e Backup */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Backup e Portabilidade entre Navegadores
              </p>
              <p className="mt-0.5 leading-relaxed text-[11px] text-slate-400">
                Os dados são salvos localmente via <strong>IndexedDB (Dexie.js)</strong>. Use o botão de <strong>Exportar (.json)</strong> em qualquer slot para salvar um backup seguro em seu computador ou transferir seu progresso para outro computador/navegador usando o botão <strong>Importar (.json)</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé com Informações do Estado Atual */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Jogo Ativo: <strong className="text-slate-200">{currentMetadata.title || 'Temporada em Andamento'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTriggerImport('slot_1')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition flex items-center gap-1.5 cursor-pointer text-xs border border-slate-700"
            >
              <FileUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Importar Arquivo Externo</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold transition cursor-pointer text-xs border border-slate-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Modal Secundário: Confirmação de Sobrescrita / Exclusão / Carga */}
      {confirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl border ${
                  confirmDialog.type === 'delete'
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    : confirmDialog.type === 'overwrite'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                }`}
              >
                {confirmDialog.type === 'delete' && <Trash2 className="w-5 h-5" />}
                {confirmDialog.type === 'overwrite' && <AlertTriangle className="w-5 h-5" />}
                {confirmDialog.type === 'load' && <FolderOpen className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-bold text-white">
                {confirmDialog.title}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {confirmDialog.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer ${
                  confirmDialog.type === 'delete'
                    ? 'bg-rose-600 hover:bg-rose-500'
                    : confirmDialog.type === 'overwrite'
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Secundário: Inspecionar Dados e Checksum */}
      {inspectRecord && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Metadados do Save ({inspectRecord.slotId})
                </h3>
              </div>
              <button
                onClick={() => setInspectRecord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 text-xs custom-scrollbar">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div><strong>Título:</strong> {inspectRecord.title}</div>
                <div><strong>Data:</strong> {inspectRecord.updatedAtFormatted}</div>
                <div><strong>Resumo:</strong> {inspectRecord.summary}</div>
                <div><strong>Versão do Schema:</strong> v{inspectRecord.schemaVersion}</div>
                <div className="text-[11px] font-mono break-all text-slate-400">
                  <strong>SHA-256 Checksum:</strong> {inspectRecord.checksum}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-300">Amostra do Estado Salvo:</span>
                <pre className="mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-blue-300 max-h-48 overflow-y-auto custom-scrollbar">
                  {JSON.stringify(inspectRecord.gameState, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setInspectRecord(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Fechar Inspeção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
