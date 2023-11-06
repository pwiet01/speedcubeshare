declare global {
  namespace App {
    interface Error {
      message?: string;
    }

    interface Locals {
      auth: import('lucia').AuthRequest;
    }

    interface PageData {
      meta?: {
        title?: string;
        disableTitleTranslation?: boolean;
        description?: string;
        keywords?: string;
      };
      layout?: {
        showTitle?: boolean;
        maxWidth?: 'small' | 'max';
      };
    }
  }

  namespace Lucia {
    type Auth = import('$lib/server/ts/lucia').Auth;

    type DatabaseUserAttributes = {
      email: string;
      username: string;
      display_name?: string;
    };
  }
}

export {};
