// Configuração central da API.
// Usa VITE_API_URL do .env; se não existir no build, cai para o subdomínio da API.
const FALLBACK_API_URL = "https://api.condexsistema.com.br";

export const API_URL = (import.meta.env.VITE_API_URL || FALLBACK_API_URL).replace(/\/$/, "");