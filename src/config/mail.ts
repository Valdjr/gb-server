interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: { from: { email: string; name: string } };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'valdir@valdjr.com.br',
      name: 'Valdir',
    },
  },
} as IMailConfig;
