export type APISingleResponse<T> = {
  data: T
}

export type APIListResponse<T> = {
  data: T[]
}

export type APIErrorResponse<ErrorMeta> = {
  errors: {
    message: string
    errorCode: string
    meta: ErrorMeta[]
  }
}
