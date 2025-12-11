export * from './routes'
export * from './pricing'

export const USER_ROLES = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_STAFF: 'ROLE_STAFF',
  ROLE_USER: 'ROLE_USER',
  ROLE_GUEST: 'ROLE_GUEST',
  ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
} as const

export const LIMIT_OPTIONS = [10, 20, 50, 100]

export const TOAST_GROUP = 'MODAL_TOAST_GROUP'