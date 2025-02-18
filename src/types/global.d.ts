declare type Recordable<T = any> = Record<string, any>;
declare interface ViteEnv {
  VITE_PORT: number,
  VITE_OPEN: boolean,
  VITE_USE_COMPRESS: boolean,
  VITE_CONSOLE: boolean,
  VITE_API_URL: string,
  VITE_LOGIN_URL: string,
  VITE_USER_NODE_ENV: string
}
