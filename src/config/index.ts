export interface Config {
  backofficeApiBaseUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
