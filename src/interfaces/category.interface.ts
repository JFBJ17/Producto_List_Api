export interface Category {
  id: number
  name: string
  description?: string
  created_at: string
}

export type CategoryInput = Omit<Category, 'id' | 'created_at'>
