import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type { ITicketResponse, Ticket, ITicketCreationAttributes } from "@/types/ticket"
import type { ResponseError } from "@/utils/error"


export interface ITicketService {
    getAllTickets: (params?: { page?: number; limit?: number; ticketId?: string; status?: string; department?: string }) => Promise<ApiResponse<ITicketResponse> | ResponseError>
    getTicketById: (id: string) => Promise<ApiResponse<Ticket> | ResponseError>
    createTicket: (ticket: ITicketCreationAttributes) => Promise<ApiResponse<Ticket> | ResponseError>
    updateTicket: (id: string, ticket: Partial<Ticket>) => Promise<ApiResponse<boolean> | ResponseError>
    getMyTickets: () => Promise<ApiResponse<Ticket[]> | ResponseError>
}

class TicketService implements ITicketService {
    getAllTickets(params?: { page?: number; limit?: number; ticketId?: string; status?: string; department?: string }): Promise<ApiResponse<ITicketResponse> | ResponseError> {
        const queryParams: Record<string, string | number> = {}

        if (params?.page) queryParams.page = params.page
        if (params?.limit) queryParams.limit = params.limit
        if (params?.ticketId) queryParams.ticketId = params.ticketId
        if (params?.status) queryParams.status = params.status || ''
        if (params?.department) queryParams.department = params.department || ''

        return apiService(API_ROUTES.TICKETS.BASE).addQueryParam(queryParams).get<ITicketResponse>()
    }

    getTicketById(id: string): Promise<ApiResponse<Ticket> | ResponseError> {
        return apiService(API_ROUTES.TICKETS.GET_BY_ID).addPathParam(':id', id).get<Ticket>()
    }

    createTicket(ticket: ITicketCreationAttributes): Promise<ApiResponse<Ticket> | ResponseError> {
        return apiService(API_ROUTES.TICKETS.CREATE).post<Ticket>(ticket)
    }

    updateTicket(id: string, ticket: Partial<Ticket>): Promise<ApiResponse<boolean> | ResponseError> {
        return apiService(API_ROUTES.TICKETS.UPDATE).addPathParam(':id', id).put<boolean>(ticket)
    }

    getMyTickets(): Promise<ApiResponse<Ticket[]> | ResponseError> {
        return apiService(API_ROUTES.TICKETS.MY_TICKETS).get<Ticket[]>()
    }
}

export const ticketService = new TicketService()
