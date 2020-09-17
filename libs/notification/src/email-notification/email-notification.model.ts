export interface EmailNotificationModel {
  templateId: string;
  language: 'en' | 'ru';
  to: string; // Email to
  templateData: any;
}
