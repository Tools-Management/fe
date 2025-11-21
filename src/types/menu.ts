import type { Component } from 'vue'
import { USER_ROLES } from '@/constants'

export interface MenuItem {
  icon?: Component
  name: string
  path?: string
  subItems?: SubMenuItem[]
  requiredRole?: (typeof USER_ROLES)[keyof typeof USER_ROLES]
}

export interface SubMenuItem {
  name: string
  path: string
  pro: boolean
  new?: boolean
}

export interface MenuGroup {
  title: string
  items: MenuItem[]
}
