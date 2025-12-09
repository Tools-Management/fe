<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div :class="['py-8 flex', !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start']">
      <router-link to="/">
        <div
          v-if="isExpanded || isHovered || isMobileOpen"
          class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          AIRemake<span class="text-pink-400">Pro</span>
        </div>
        <div
          v-else
          class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          AI
        </div>
      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
                !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(groupIndex, index),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                </router-link>
                <transition
                  @enter="enter"
                  @after-enter="cleanup"
                  @before-leave="beforeLeave"
                  @after-leave="cleanup"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) && (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(subItem.path),
                              'menu-dropdown-item-inactive': !isActive(subItem.path),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(subItem.path),
                                  'menu-dropdown-badge-inactive': !isActive(subItem.path),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(subItem.path),
                                  'menu-dropdown-badge-inactive': !isActive(subItem.path),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  GridIcon,
  UserCircleIcon,
  ChevronDownIcon,
  HorizontalDots,
  ListIcon,
  PlugInIcon,
} from '../../icons'
import { useSidebar } from '@/composables/useSidebar'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'
import type { MenuGroup, MenuItem } from '@/types/menu'

const route = useRoute()
const authStore = useAuthStore()

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar()

const menuGroups = computed<MenuGroup[]>(() => {
  const fullMenu: MenuGroup[] = [
    {
      title: 'Menu',
      items: [
        { icon: GridIcon, name: 'Tổng quan', path: '/administrators' },
        {
          icon: PlugInIcon,
          name: 'Phần mềm',
          subItems: [
            { name: 'Phần mềm', path: '/tools', pro: false },
            { name: 'Mua phần mềm', path: '/purchase-license', pro: false },
          ],
        },
        {
          name: 'Tài khoản',
          icon: UserCircleIcon,
          subItems: [
            { name: 'Ví của tôi', path: '/wallet', pro: false },
            { name: 'Quản lý tài khoản', path: '/account', pro: false },
            { name: 'Lịch sử giao dịch', path: '/transaction-history', pro: false },
            { name: 'Keys đã mua', path: '/my-keys', pro: false },
          ],
        },

        {
          icon: PlugInIcon,
          name: 'Quản trị',
          requiredRole: USER_ROLES.ROLE_ADMIN,
          subItems: [
            { name: 'Quản lý tickets', path: '/administrators/tickets', pro: false },
            { name: 'Quản lý tools', path: '/administrators/tools-management', pro: false },
            { name: 'License Keys', path: '/administrators/license-keys', pro: false },
            // { name: 'Phân quyền', path: '/administrators/permissions', pro: false },
            { name: 'Quản lý users', path: '/administrators/users', pro: false },
          ],
        },

        {
          name: 'Ticket hỗ trợ',
          icon: ListIcon,
          subItems: [
            { name: 'Ticket Support', path: '/ticket-support', pro: false },
            { name: 'Open Ticket', path: '/ticket-support/create', pro: false },
          ],
        },
      ],
    },
  ]

  return fullMenu.map((group) => ({
    ...group,
    items: group.items.filter((item: MenuItem) => {
      if (item.requiredRole === USER_ROLES.ROLE_ADMIN) {
        return authStore.isAdmin
      }
      return true
    }),
  }))
})

const isActive = (path: string) => route.path === path

const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`
  openSubmenu.value = openSubmenu.value === key ? null : key
}

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.value.some((group) =>
    group.items.some(
      (item: MenuItem) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path)),
    ),
  )
})

const isSubmenuOpen = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups.value[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path),
      ) === true)
  )
}

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  const height = element.scrollHeight
  element.style.height = '0px'
  void element.offsetHeight
  element.style.height = `${height}px`

  const onEnd = () => {
    element.removeEventListener('transitionend', onEnd)
    done()
  }
  element.addEventListener('transitionend', onEnd)
}

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  void element.offsetHeight // force reflow
  element.style.height = '0px'
}

const cleanup = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
}

watch(
  () => route.path,
  () => {
    if (isMobileOpen.value) {
      isMobileOpen.value = false
    }
  },
)
</script>
