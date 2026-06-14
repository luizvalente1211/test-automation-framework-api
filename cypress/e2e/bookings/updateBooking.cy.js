import { bookingService } from '../../support/services/bookingService'
import { createBookingData } from '../../support/factories/bookingFactory'
import { bookingSchema } from '../../schemas/bookingSchema'
import { validateSchema } from '../../support/schemaValidator'

describe('PUT Booking', () => {

    it('Deve atualizar uma reserva com sucesso', () => {

        const booking = createBookingData()

        console.log('Payload criação:')
        console.log(booking)

        bookingService.createBooking(booking)
            .then((createResponse) => {

                console.log('Reserva criada:')
                console.log(createResponse.body)

                const bookingId =
                    createResponse.body.bookingid

                bookingService.createToken()
                    .then((tokenResponse) => {

                        const token =
                            tokenResponse.body.token

                        const updatedBooking =
                            createBookingData()

                        console.log('Payload atualização:')
                        console.log(updatedBooking)

                        bookingService.updateBooking(
                            bookingId,
                            token,
                            updatedBooking
                        )
                            .then((updateResponse) => {

                                console.log('Reserva atualizada:')
                                console.log(updateResponse.body)

                                expect(updateResponse.status)
                                    .to.eq(200)

                                expect(updateResponse.body.firstname)
                                    .to.eq(updatedBooking.firstname)

                                expect(updateResponse.body.lastname)
                                    .to.eq(updatedBooking.lastname)

                                expect(updateResponse.body.totalprice)
                                    .to.eq(updatedBooking.totalprice)

                                expect(updateResponse.body.depositpaid)
                                    .to.eq(updatedBooking.depositpaid)

                                const result = validateSchema(
                                    bookingSchema,
                                    updateResponse.body
                                )

                                console.log(
                                    'Schema Validation:',
                                    result
                                )

                                expect(
                                    result.valid,
                                    JSON.stringify(
                                        result.errors,
                                        null,
                                        2
                                    )
                                ).to.be.true

                            })

                    })

            })

    })

    it('Deve retornar erro ao atualizar reserva sem token', () => {

        const booking = createBookingData()

        bookingService.createBooking(booking)
            .then((createResponse) => {

                const updatedBooking =
                    createBookingData()

                bookingService.updateBooking(
                    createResponse.body.bookingid,
                    '',
                    updatedBooking
                )
                    .then((response) => {

                        console.log(
                            'PUT sem token',
                            response
                        )

                        expect(response.status)
                            .to.eq(403)

                    })

            })

    })

    it('Deve retornar erro ao atualizar reserva com token inválido', () => {

        const booking = createBookingData()

        bookingService.createBooking(booking)
            .then((createResponse) => {

                const updatedBooking =
                    createBookingData()

                bookingService.updateBooking(
                    createResponse.body.bookingid,
                    'token-invalido',
                    updatedBooking
                )
                    .then((response) => {

                        console.log(
                            'PUT token inválido',
                            response
                        )

                        expect(response.status)
                            .to.eq(403)

                    })

            })

    })

    it('Deve retornar erro ao atualizar reserva inexistente', () => {

        bookingService.createToken()
            .then((tokenResponse) => {

                const updatedBooking =
                    createBookingData()

                bookingService.updateBooking(
                    99999999,
                    tokenResponse.body.token,
                    updatedBooking
                )
                    .then((response) => {

                        console.log(
                            'PUT reserva inexistente',
                            response
                        )

                        expect(response.status)
                            .to.eq(405)

                    })

            })

    })

    it('Deve retornar erro ao atualizar com payload vazio', () => {

        const booking = createBookingData()

        bookingService.createBooking(booking)
            .then((createResponse) => {

                bookingService.createToken()
                    .then((tokenResponse) => {

                        bookingService.updateBooking(
                            createResponse.body.bookingid,
                            tokenResponse.body.token,
                            {}
                        )
                            .then((response) => {

                                console.log(
                                    'PUT payload vazio',
                                    response
                                )

                                expect(response.status)
                                    .to.be.oneOf([400, 500])

                            })

                    })

            })

    })

})