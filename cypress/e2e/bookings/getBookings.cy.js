import { bookingService } from '../../support/services/bookingService'
import { bookingSchema } from '../../schemas/bookingSchema'
import { validateSchema } from '../../support/schemaValidator'

describe('GET Bookings', () => {

    it('Deve listar reservas com sucesso', () => {

        bookingService.getBookings()
            .then((response) => {

                console.log('GET /booking', response)

                expect(response.status).to.eq(200)

                expect(response.headers['content-type'])
                    .to.contain('application/json')

                expect(response.body)
                    .to.have.length.greaterThan(0)

                expect(response.body[0])
                    .to.have.property('bookingid')

                expect(response.body[0].bookingid)
                    .to.be.a('number')

            })

    })

    it('Deve retornar uma reserva existente', () => {

        bookingService.getBookings()
            .then((response) => {

                const bookingId = response.body[0].bookingid

                bookingService.getBookingById(bookingId)
                    .then((bookingResponse) => {

                        console.log('GET /booking/{id}', bookingResponse)

                        expect(bookingResponse.status)
                            .to.eq(200)

                        expect(bookingResponse.body.firstname)
                            .to.not.be.empty

                        expect(bookingResponse.body.lastname)
                            .to.not.be.empty

                    })

            })

    })

    it('Deve validar o contrato da reserva', () => {

        bookingService.getBookings()
            .then((response) => {

                const bookingId = response.body[0].bookingid

                bookingService.getBookingById(bookingId)
                    .then((bookingResponse) => {

                        console.log(
                            'GET /booking/{id}',
                            bookingResponse
                        )

                        const result = validateSchema(
                            bookingSchema,
                            bookingResponse.body
                        )

                        console.log(
                            'Schema validation:',
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

    it('Deve validar a estrutura das datas da reserva', () => {

        bookingService.getBookings()
            .then((response) => {

                const bookingId = response.body[0].bookingid

                bookingService.getBookingById(bookingId)
                    .then((bookingResponse) => {

                        console.log('GET /booking/{id}', bookingResponse)

                        expect(
                            bookingResponse.body.bookingdates.checkin
                        ).to.match(/^\d{4}-\d{2}-\d{2}$/)

                        expect(
                            bookingResponse.body.bookingdates.checkout
                        ).to.match(/^\d{4}-\d{2}-\d{2}$/)

                    })

            })

    })

    it('Deve validar que o preço total da reserva é maior que zero', () => {

        bookingService.getBookings()
            .then((response) => {

                const bookingId = response.body[0].bookingid

                bookingService.getBookingById(bookingId)
                    .then((bookingResponse) => {

                        console.log('GET /booking/{id}', bookingResponse)

                        expect(
                            bookingResponse.body.totalprice
                        ).to.be.greaterThan(0)

                    })

            })

    })

    it('Deve retornar 404 para reserva inexistente', () => {

        bookingService.getBookingById(99999999)
            .then((response) => {

                console.log(
                    'GET /booking/99999999',
                    response
                )

                expect(response.status)
                    .to.eq(404)

            })

    })

    it('Deve retornar erro para identificador inválido', () => {

        bookingService.getBookingById('abc')
            .then((response) => {

                console.log(
                    'GET /booking/abc',
                    response
                )

                expect(response.status)
                    .to.eq(404)

            })

    })

})