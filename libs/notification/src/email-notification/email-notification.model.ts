export interface EmailNotificationModel {
  templateId: string;
  language: 'en' | 'ru';
  to: string; // Email to
  templateData: any;
  from?: string;
  replay?: boolean;
  subject: string;
}

export enum EmailTemplate {
  UserInvitation = 'd-f5021dd2d91942928c6fc6f89ca98b62',
  BIMModelGenerated = 'd-7fd3901d5af1471a8414eff07b396ab1',
}
