export interface IEnv {
  readonly VITE_APP_TITLE?: string
  readonly VITE_STATIC_URL?: string
  readonly VITE_CDN_REMOTE_FILE_PATH?: string
  readonly VITE_CDN_FILE_PATH?: string
  readonly VITE_BUILD_REPORT?: boolean
  readonly VITE_IS_USE_CDN?: boolean
}
