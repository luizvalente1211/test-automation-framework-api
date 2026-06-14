import { bookingService } from '../../support/services/bookingService'
import { createBookingData } from '../../support/factories/bookingFactory'

describe('DELETE Booking', () => {

    it('Deve excluir uma reserva com sucesso', () => {

        const booking = createBookingData()

        bookingService.createBooking(booking)
            .then((createResponse) => {

                console.log(
                    'Reserva criada:',
                    createResponse.body
                )

                const bookingId =
                    createResponse.body.bookingid

                bookingService.createToken()
                    .then((tokenResponse) => {

                        const token =
                            tokenResponse.body.token

                        bookingService.deleteBooking(
                            bookingId,
                            token
                        )
                            .then((deleteResponse) => {

                                console.log(
                                    'DELETE /booking',
                                    deleteResponse
                                )

                                expect(deleteResponse.status)
                                    .to.eq(201)

                            })

                    })

            })

    })
    it('Deve retornar erro ao excluir sem token', () => {

    const booking = createBookingData()

    bookingService.createBooking(booking)
        .then((createResponse) => {

            bookingService.deleteBooking(
                createResponse.body.bookingid,
                ''
            )
                .then((response) => {

                    console.log(
                        'DELETE sem token',
                        response
                    )

                    expect(response.status)
                        .to.eq(403)

                })

        })

})
it('Deve retornar erro ao excluir com token inválido', () => {

    const booking = createBookingData()

    bookingService.createBooking(booking)
        .then((createResponse) => {

            bookingService.deleteBooking(
                createResponse.body.bookingid,
                'token-invalido'
            )
                .then((response) => {

                    console.log(
                        'DELETE token inválido',
                        response
                    )

                    expect(response.status)
                        .to.eq(403)

                })

        })

})
it('Deve retornar erro ao excluir reserva inexistente', () => {

    bookingService.createToken()
        .then((tokenResponse) => {

            bookingService.deleteBooking(
                99999999,
                tokenResponse.body.token
            )
                .then((response) => {

                    console.log(
                        'DELETE reserva inexistente',
                        response
                    )

                })

        })

})

})