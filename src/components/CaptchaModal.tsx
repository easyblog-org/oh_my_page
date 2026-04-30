import { useRef, useEffect, useCallback } from 'react';
import SliderCaptcha, { type ActionType, type VerifyParam } from 'rc-slider-captcha';
import { fetchCaptchaImage, verifyCaptcha } from '@/services/mailService';

interface CaptchaModalProps {
  visible: boolean;
  onClose: () => void;
  onVerified: (token: string) => void;
  verifying: boolean;
}

export default function CaptchaModal({ visible, onClose, onVerified, verifying }: CaptchaModalProps) {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const captchaIdRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleRequest = useCallback(async () => {
    const result = await fetchCaptchaImage();
    if (result.success && result.data) {
      captchaIdRef.current = result.data.captchaId;
      return {
        bgUrl: result.data.bgUrl,
        puzzleUrl: result.data.puzzleUrl,
      };
    }
    throw new Error(result.message || '获取验证码失败');
  }, []);

  const handleVerify = useCallback(
    async (data: VerifyParam) => {
      if (!captchaIdRef.current) {
        return Promise.reject(new Error('验证码ID缺失'));
      }

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const result = await verifyCaptcha(captchaIdRef.current, {
        x: data.x,
        y: data.y,
        duration: data.duration,
        trail: data.trail,
      });

      if (result.success && result.token) {
        onVerified(result.token);
        return Promise.resolve();
      }
      return Promise.reject(new Error(result.message || '验证失败'));
    },
    [onVerified]
  );

  useEffect(() => {
    if (visible) {
      captchaIdRef.current = '';
      setTimeout(() => {
        actionRef.current?.refresh(true);
      }, 100);
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && !verifying) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative z-10 w-[90%] max-w-[400px] rounded-2xl border border-[rgba(59,130,246,0.2)] p-5 md:p-6"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">安全验证</h3>
          <button
            onClick={onClose}
            disabled={verifying}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(59,130,246,0.1)] transition-colors duration-200 border-none cursor-pointer bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="关闭"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="captcha-wrapper">
          <SliderCaptcha
            request={handleRequest}
            onVerify={handleVerify}
            actionRef={actionRef}
            mode="embed"
            bgSize={{ width: 320, height: 160 }}
            puzzleSize={{ width: 44 }}
            autoRefreshOnError
            showRefreshIcon
            errorHoldDuration={800}
            tipText={{
              default: '向右拖动滑块填充拼图',
              loading: '加载中...',
              moving: '继续拖动...',
              verifying: '验证中...',
              success: '验证成功！',
              error: '验证失败，请重试',
              loadFailed: '加载失败，点击重试',
            }}
          />
        </div>

        <p className="mt-3 text-xs text-[#64748b] text-center">
          完成滑块验证后即可发送消息
        </p>
      </div>
    </div>
  );
}
