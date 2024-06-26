import { iRole } from "./role"

export interface iUser {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  avatar?: string
  roles: iRole[]
}
