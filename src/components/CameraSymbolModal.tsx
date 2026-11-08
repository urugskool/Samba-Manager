import React, { useState, useRef, useEffect, useCallback } from 'react';
import { School } from '../types/carnaval';
import {
  Camera,
  RotateCw,
  Upload,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Shield,
  Eye,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface CameraSymbolModalProps {
  school: School;
  isOpen: boolean;
  onClose: () => void;
  onSaveSymbolPhoto: (photoDataUrl: string) => void;
  onRemoveSymbolPhoto?: () => void;
}

export const CameraSymbolModal: React.FC<CameraSymbolModalProps> = ({
  school,
  isOpen,
  onClose,
  onSaveSymbolPhoto,
  onRemoveSymbolPhoto
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  // Reproduzir som sutil de obturador de câmera com Web Audio API
  const playShutterSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Primeiro clique mecânico
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1800, now);
      osc1.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Segundo clique mecânico do espelho
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(900, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(200, now + 0.12);
      gain2.gain.setValueAtTime(0.3, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.12);
    } catch {
      // Ignorar erros de áudio caso política de autoplay bloqueie
    }
  }, []);

  // Parar a stream atual
  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  // Iniciar stream da câmera
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setCameraError(null);
    setIsProcessing(true);

    // Parar stream anterior se houver
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Acesso à câmera não suportado neste navegador. Utilize a opção de carregar imagem.');
      }

      // Checa múltiplos dispositivos de vídeo
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      } catch {
        // Ignora checagem de enumeração
      }

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: mode,
          width: { ideal: 640 },
          height: { ideal: 640 }
        }
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err: unknown) {
      console.warn('Erro ao acessar câmera:', err);
      const errorMsg =
        err instanceof Error && err.name === 'NotAllowedError'
          ? 'Permissão da câmera negada no navegador. Permita o acesso ou envie uma imagem da galeria.'
          : 'Não foi possível inicializar a câmera. Você pode usar uma foto da sua galeria ou arquivo.';
      setCameraError(errorMsg);
      setCameraActive(false);
    } finally {
      setIsProcessing(false);
    }
  }, [stream]);

  // Iniciar ou reiniciar câmera quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setCapturedPhoto(null);
      setCameraError(null);
      startCamera(facingMode);
    } else {
      stopStream();
      setCapturedPhoto(null);
    }
    return () => {
      stopStream();
    };
  }, [isOpen]);

  // Alternar entre câmera traseira e frontal
  const handleToggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capturar foto do elemento de vídeo
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    const size = 360; // Tamanho ideal quadrado otimizado para salvar no estado
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calcular recorte central quadrado
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 480;
    const minDim = Math.min(videoWidth, videoHeight);
    const startX = (videoWidth - minDim) / 2;
    const startY = (videoHeight - minDim) / 2;

    // Se estiver usando câmera frontal, espelhar para selfie natural
    if (facingMode === 'user') {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, size, size);

    playShutterSound();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setCapturedPhoto(dataUrl);
    stopStream();
  };

  // Carregar foto de arquivo local (galeria / explorador)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 360;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const minDim = Math.min(img.width, img.height);
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        playShutterSound();
        setCapturedPhoto(dataUrl);
        stopStream();
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Confirmar e salvar a foto no estado da agremiação
  const handleConfirmPhoto = () => {
    if (!capturedPhoto) return;
    onSaveSymbolPhoto(capturedPhoto);
    onClose();
  };

  // Descartar captura e reabrir câmera
  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera(facingMode);
  };

  if (!isOpen) return null;

  const schoolColor = school.colors.primary || '#3b82f6';
  const schoolBorder = school.colors.border || school.colors.secondary || '#eab308';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div
          className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${schoolColor}33 0%, rgba(15,23,42,0.95) 100%)`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-md shrink-0"
              style={{
                backgroundColor: `${schoolColor}25`,
                borderColor: schoolBorder
              }}
            >
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Identidade do Pavilhão
                </span>
                <span className="text-xs text-slate-400">· Câmera Oficial</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {cleanSchoolName(school)}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Instruções */}
          <div className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-slate-800 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Defina o Símbolo Oficial da Agremiação</span>
              <p className="text-slate-400 mt-0.5">
                Aponte a câmera para o pavilhão, brasão, flâmula ou objeto símbolo da sua escola de samba. A imagem será salva no registro oficial do seu clube.
              </p>
            </div>
          </div>

          {/* ÁREA DE CAPTURA / PREVIEW */}
          <div className="relative aspect-square max-w-[340px] mx-auto rounded-3xl overflow-hidden bg-black border-2 border-slate-700 shadow-inner flex items-center justify-center">
            {/* 1. MODO PREVIEW DA FOTO TIRADA */}
            {capturedPhoto ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950">
                <div
                  className="w-56 h-56 rounded-full overflow-hidden border-4 shadow-2xl relative"
                  style={{
                    borderColor: schoolBorder,
                    boxShadow: `0 0 30px ${schoolColor}60`
                  }}
                >
                  <img
                    src={capturedPhoto}
                    alt="Símbolo Capturado"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-2 ring-inset ring-white/20 rounded-full pointer-events-none" />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Foto pronta para registro oficial
                  </span>
                  <p className="text-[10px] text-slate-400">
                    O símbolo atual "{school.symbol}" receberá esta imagem oficial.
                  </p>
                </div>
              </div>
            ) : cameraActive ? (
              /* 2. MODO CÂMERA AO VIVO */
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />

                {/* Máscara de enquadramento circular para símbolo oficial */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div
                    className="w-60 h-60 rounded-full border-2 border-dashed border-amber-400/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] animate-pulse"
                    style={{
                      borderColor: schoolBorder
                    }}
                  />
                  {/* Mira central */}
                  <div className="absolute w-6 h-6 border-t-2 border-l-2 border-white/60 -mt-3 -ml-3" />
                  <div className="absolute w-6 h-6 border-t-2 border-r-2 border-white/60 -mt-3 ml-3" />
                  <div className="absolute w-6 h-6 border-b-2 border-l-2 border-white/60 mt-3 -ml-3" />
                  <div className="absolute w-6 h-6 border-b-2 border-r-2 border-white/60 mt-3 ml-3" />
                </div>

                <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                  <span className="text-[11px] font-semibold text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Enquadre o brasão ou pavilhão no círculo
                  </span>
                </div>
              </div>
            ) : (
              /* 3. MODO CARREGANDO OU SEM CÂMERA */
              <div className="p-6 text-center space-y-3">
                {cameraError ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-rose-200">{cameraError}</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer inline-flex items-center gap-2 shadow-lg"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Selecionar da Galeria / Arquivo</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs text-slate-400">Iniciando câmera do aparelho...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Símbolo atual cadastrado da escola */}
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {school.customSymbolPhoto ? (
                <img
                  src={school.customSymbolPhoto}
                  alt={school.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg border border-slate-700">
                  {school.symbol.slice(0, 2) || '🦅'}
                </div>
              )}
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Símbolo Oficial Atual
                </span>
                <span className="text-xs font-bold text-white">
                  {school.symbol} {school.customSymbolPhoto ? '(Foto Ativa)' : '(Padrão)'}
                </span>
                {school.customSymbolDate && (
                  <span className="text-[10px] text-slate-500 block">
                    Atualizado em {school.customSymbolDate}
                  </span>
                )}
              </div>
            </div>

            {school.customSymbolPhoto && onRemoveSymbolPhoto && !capturedPhoto && (
              <button
                onClick={() => {
                  if (confirm('Deseja remover a foto e restaurar o símbolo original da escola?')) {
                    onRemoveSymbolPhoto();
                    onClose();
                  }
                }}
                className="text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-500/30 transition cursor-pointer font-semibold"
              >
                Restaurar Padrão
              </button>
            )}
          </div>
        </div>

        {/* Footer com botões de ação */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          {capturedPhoto ? (
            /* Botões do modo revisão */
            <>
              <button
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tirar Outra Foto</span>
              </button>

              <button
                onClick={handleConfirmPhoto}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Confirmar como Símbolo Oficial</span>
              </button>
            </>
          ) : (
            /* Botões do modo câmera */
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                  title="Carregar foto da galeria ou arquivo"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Galeria</span>
                </button>

                {cameraActive && hasMultipleCameras && (
                  <button
                    type="button"
                    onClick={handleToggleFacingMode}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs transition cursor-pointer"
                    title="Alternar entre câmera frontal e traseira"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleCapturePhoto}
                  disabled={!cameraActive || isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capturar Foto</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
