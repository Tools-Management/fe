import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type { User } from "@/types/user"
import type { ResponseError } from "@/utils/error"


export interface IUserService {
    getAllUsers: () => Promise<ApiResponse<User[]> | ResponseError>
    getUserById: (id: string) => Promise<ApiResponse<User> | ResponseError>
    updateUser: (user: User) => Promise<ApiResponse<User> | ResponseError>
    updateUserAvatar: (file: File) => Promise<ApiResponse<User> | ResponseError>
    deleteUser: (id: string) => Promise<ApiResponse<User> | ResponseError>
}

class UserService implements IUserService {
    getAllUsers(): Promise<ApiResponse<User[]> | ResponseError> {
        return apiService(API_ROUTES.USERS.BASE).get<User[]>()
    }

    getUserById(id: string): Promise<ApiResponse<User> | ResponseError> {
        return apiService(API_ROUTES.USERS.GET_BY_ID).addPathParam(':id', id).get<User>()
    }

    updateUser(user: User): Promise<ApiResponse<User> | ResponseError> {
        return apiService(API_ROUTES.USERS.UPDATE_PROFILE).put<User>(user)
    }

    updateUserAvatar(file: File): Promise<ApiResponse<User> | ResponseError> {
        const formData = new FormData()
        formData.append('avatar', file)
        return apiService(API_ROUTES.USERS.UPDATE_AVATAR).put<User>(formData)
    }

    deleteUser(id: string): Promise<ApiResponse<User> | ResponseError> {
        return apiService(API_ROUTES.USERS.DELETE).addPathParam(':id', id).delete<User>()
    }
}

export const userService = new UserService()