export interface MailService {
  sendEmail(params: EmailParams): Promise<MailResponse>;
}

export interface EmailParams {
  to: string;
  from: string;
  fromName: string;
  subject: string;
  html: string;
}

export interface MailResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ContactParams {
  name: string;
  email: string;
  message: string;
  to: string;
  captchaToken: string;
}

export interface CaptchaImageResponse {
  success: boolean;
  data?: {
    captchaId: string;
    bgUrl: string;
    puzzleUrl: string;
  };
  message?: string;
}

export interface CaptchaVerifyResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export class LocalMailService implements MailService {
  async sendEmail(params: EmailParams): Promise<MailResponse> {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: params.to,
          from: params.from,
          fromName: params.fromName,
          subject: params.subject,
          html: params.html,
        }),
      });

      const data = await response.json();

      if (response.ok && data.result === true) {
        return {
          success: true,
          message: '邮件发送成功',
          data,
        };
      } else {
        return {
          success: false,
          message: data.message || '邮件发送失败',
          data,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '网络错误',
      };
    }
  }
}

export class MockMailService implements MailService {
  async sendEmail(params: EmailParams): Promise<MailResponse> {
    console.log('Mock邮件发送:', params);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      message: '测试模式：邮件已发送（模拟）',
      data: params,
    };
  }
}

export const mailServiceFactory = (type: 'local' | 'mock' = 'local'): MailService => {
  switch (type) {
    case 'local':
      return new LocalMailService();
    case 'mock':
      return new MockMailService();
    default:
      return new LocalMailService();
  }
};

export async function fetchCaptchaImage(): Promise<CaptchaImageResponse> {
  try {
    const response = await fetch('/api/captcha/image');
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '获取验证码失败',
    };
  }
}

export async function verifyCaptcha(
  captchaId: string,
  data: { x: number; y: number; duration: number; trail: [number, number][] }
): Promise<CaptchaVerifyResponse> {
  try {
    const response = await fetch('/api/captcha/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ captchaId, ...data }),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '验证请求失败',
    };
  }
}

export async function sendContactMessage(params: ContactParams): Promise<MailResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '发送失败',
    };
  }
}
