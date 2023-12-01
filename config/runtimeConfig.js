import { strapi_url } from "./strapi";
export const runtimeConfig = {
  MAILHOST: process.env.EMAIL_SMTP_HOST,
  MAILPORT: process.env.EMAIL_SMTP_PORT,
  MAILUSER: process.env.EMAIL_SMTP_USER,
  MAILPASS: process.env.EMAIL_SMTP_PASS,
  CONTACTMAIL: process.env.EMAIL_ADDRESS_FROM,
  BETTERUPTIMETOKEN: process.env.BETTERUPTIMETOKEN,
  BETTERUPTIMEPAGES: process.env.BETTERUPTIMEPAGES,
  APPSTORE_KEY_ID: process.env.APPSTORE_KEY_ID,
  APPSTORE_ISSUER_ID: process.env.APPSTORE_ISSUER_ID,
  INDEXING: process.env.INDEXING,
  public: {
    strapi: strapi_url,
    INDEXING: process.env.INDEXING,
  }
}