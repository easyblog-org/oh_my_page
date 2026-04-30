import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import CaptchaModal from '@/components/CaptchaModal';
import { sendContactMessage } from '@/services/mailService';

interface ContactFormProps {
  toEmail: string;
}

const RATE_LIMIT_MS = 60000;

export default function ContactForm({ toEmail }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const formRef = useRef(form);
  formRef.current = form;

  const checkRateLimit = useCallback(() => {
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    if (lastSubmitTime) {
      const elapsed = Date.now() - parseInt(lastSubmitTime);
      if (elapsed < RATE_LIMIT_MS) {
        const remaining = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
        toast.error(`请勿频繁提交，请 ${remaining} 秒后再试`);
        return false;
      }
    }
    return true;
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.name || !form.email || !form.message) {
        toast.error('请填写完整信息');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        toast.error('请输入有效的邮箱地址');
        return;
      }

      if (!checkRateLimit()) return;

      setCaptchaVisible(true);
    },
    [form, checkRateLimit]
  );

  const handleCaptchaVerified = useCallback(
    async (token: string) => {
      setSending(true);
      setCaptchaVisible(false);

      const currentForm = formRef.current;

      try {
        const response = await sendContactMessage({
          name: currentForm.name,
          email: currentForm.email,
          message: currentForm.message,
          to: toEmail,
          captchaToken: token,
        });

        if (response.success) {
          toast.success('发送成功！我会尽快回复您。');
          setForm({ name: '', email: '', message: '' });
          localStorage.setItem('lastSubmitTime', Date.now().toString());
        } else {
          toast.error(response.message || '发送失败，请稍后重试');
        }
      } catch {
        toast.error('发送失败，请稍后重试');
      } finally {
        setSending(false);
      }
    },
    [toEmail]
  );

  const handleCaptchaClose = useCallback(() => {
    if (sending) return;
    setCaptchaVisible(false);
  }, [sending]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="您的称呼"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full bg-[rgba(15,23,42,0.6)] border border-[rgba(59,130,246,0.2)] rounded-lg px-4 py-3 text-white placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors duration-200"
          disabled={sending}
        />
        <input
          type="email"
          placeholder="您的邮箱"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full bg-[rgba(15,23,42,0.6)] border border-[rgba(59,130,246,0.2)] rounded-lg px-4 py-3 text-white placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors duration-200"
          disabled={sending}
        />
        <textarea
          placeholder="您的消息"
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          rows={5}
          className="w-full bg-[rgba(15,23,42,0.6)] border border-[rgba(59,130,246,0.2)] rounded-lg px-4 py-3 text-white placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors duration-200 resize-none"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-[#3b82f6] text-white px-8 py-3 rounded-lg hover:bg-[#2563eb] transition-all duration-200 ease-out hover:scale-[1.02] border-none cursor-pointer text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {sending ? '发送中...' : '发送消息'}
        </button>
      </form>

      <CaptchaModal
        visible={captchaVisible}
        onClose={handleCaptchaClose}
        onVerified={handleCaptchaVerified}
        verifying={sending}
      />
    </>
  );
}
