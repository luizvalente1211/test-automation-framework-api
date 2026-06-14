import { routes } from '../routes'

export class BookingService {

    getBookings() {
        return cy.request({
            method: 'GET',
            url: routes.bookings
        })
    }

    getBookingById(id) {
        return cy.request({
            method: 'GET',
            url: routes.bookingById(id),
            failOnStatusCode: false
        })
    }
    getInvalidRoute() {
        return cy.request({
            method: 'GET',
            url: '/rota-inexistente',
            failOnStatusCode: false
        })
    }
    createBooking(body) {
        return cy.request({
            method: 'POST',
            url: routes.bookings,
            body,
            failOnStatusCode: false
        })
    }
    createToken() {
        return cy.request({
            method: 'POST',
            url: '/auth',
            body: {
                username: 'admin',
                password: 'password123'
            }
        })
    }
    updateBooking(id, token, body) {
        return cy.request({
            method: 'PUT',
            url: `/booking/${id}`,
            headers: {
                Cookie: `token=${token}`
            },
            body,
            failOnStatusCode: false
        })
    }
    deleteBooking(id, token) {
    return cy.request({
        method: 'DELETE',
        url: `/booking/${id}`,
        headers: {
            Cookie: `token=${token}`
        },
        failOnStatusCode: false
    })
}
}

export const bookingService = new BookingService()