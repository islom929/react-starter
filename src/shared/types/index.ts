export interface IPagination {
  page: number
  limit: number
  total: number
}

export interface ILang {
  uz: string
  ru: string
  uz_cyr: string
}

export interface IApiError {
  message: string
  status: number
}
