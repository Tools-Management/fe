import { userService } from '@/services/user.service'
import type {
  User,
  AddMoneyRequest,
  AddMoneyResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UpdateRoleRequest,
} from '@/types/user'
import { ResponseError } from '@/utils/error'
import { defineStore } from 'pinia'

interface UserState {
  users: User[]
  user: User | null
  loading: boolean
  error: string
}

interface UserActions {
  getUsers: () => Promise<void>
  getUserById: (id: string) => Promise<void>
  updateUser: (user: User) => Promise<void>
  updateUserAvatar: (file: File) => Promise<void>
  updateRoleByAdmin: (request: UpdateRoleRequest) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  addMoneyToWallet: (userId: string, data: AddMoneyRequest) => Promise<AddMoneyResponse | null>
  changePassword: (data: ChangePasswordRequest) => Promise<ChangePasswordResponse | null>
}

export const useUserStore = defineStore<'user', UserState, Record<string, never>, UserActions>(
  'user',
  {
    state: (): UserState => ({
      users: [],
      user: null,
      loading: false,
      error: '',
    }),
    actions: {
      async getUsers() {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.getAllUsers()

          if (response instanceof ResponseError) throw response

          const users = response.data as User[]

          this.users = users
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async getUserById(id: string) {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.getUserById(id)

          if (response instanceof ResponseError) throw response

          this.user = response.data as User
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async updateUser(user: User) {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.updateUser(user)

          if (response instanceof ResponseError) throw response

          this.user = response.data as User
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async updateUserAvatar(file: File) {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.updateUserAvatar(file)

          if (response instanceof ResponseError) throw response

          this.user = response.data as User
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async updateRoleByAdmin(request: UpdateRoleRequest) {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.updateRoleByAdmin(request)          

          if (response instanceof ResponseError){
            throw response
          }
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async deleteUser(id: string) {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.deleteUser(id)

          if (response instanceof ResponseError) throw response

          await this.getUsers()
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'An unexpected error occurred.'
        } finally {
          this.loading = false
        }
      },

      async addMoneyToWallet(
        userId: string,
        data: AddMoneyRequest,
      ): Promise<AddMoneyResponse | null> {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.addMoneyToWallet(userId, data)

          if (response instanceof ResponseError) throw response

          // Refresh user list to show updated balance
          await this.getUsers()

          return response.data as AddMoneyResponse
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'Failed to add money to wallet.'
          return null
        } finally {
          this.loading = false
        }
      },

      async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse | null> {
        this.loading = true
        this.error = ''

        try {
          const response = await userService.changePassword(data)

          if (response instanceof ResponseError) throw response

          return response.data as ChangePasswordResponse
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'Failed to change pasrolesword.'
          return null
        } finally {
          this.loading = false
        }
      },
    },
  },
)
