export interface Project {
  id?: string
  name: string
  client: string
  start_date: string
  end_date: string
  image?: string
  favorite?: boolean
}

type OrderBy = 'alphabetical' | 'start_date' | 'end_date'