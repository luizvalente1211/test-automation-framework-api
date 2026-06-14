import { bookingService } from '../../support/services/bookingService'
import { createBookingSchema } from '../../schemas/createBookingSchema'
import { validateSchema } from '../../support/schemaValidator'

describe('POST Booking', () => {

    it('Deve criar uma reserva com sucesso', () => {

        cy.fixture('booking')
            .then((booking) => {

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking',
                            response
                        )

                        expect(response.status)
                            .to.eq(200)

                        expect(response.headers['content-type'])
                            .to.contain('application/json')

                    })

            })

    })

    it('Deve retornar o bookingid da reserva criada', () => {

        cy.fixture('booking')
            .then((booking) => {

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking',
                            response
                        )

                        expect(response.body)
                            .to.have.property('bookingid')

                        expect(response.body.bookingid)
                            .to.be.a('number')

                    })

            })

    })

    it('Deve retornar os dados enviados na criação da reserva', () => {

        cy.fixture('booking')
            .then((booking) => {

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking',
                            response
                        )

                        expect(
                            response.body.booking.firstname
                        ).to.eq(
                            booking.firstname
                        )

                        expect(
                            response.body.booking.lastname
                        ).to.eq(
                            booking.lastname
                        )

                        expect(
                            response.body.booking.totalprice
                        ).to.eq(
                            booking.totalprice
                        )

                    })

            })

    })

    it('Deve validar o contrato da resposta de criação da reserva', () => {

        cy.fixture('booking')
            .then((booking) => {

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking',
                            response
                        )

                        const result = validateSchema(
                            createBookingSchema,
                            response.body
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

    it('Deve retornar erro ao criar reserva com payload vazio', () => {

    bookingService.createBooking({})
        .then((response) => {

            console.log(
                'POST /booking - payload vazio',
                response
            )

            expect(response.status)
                .to.eq(500)

        })

})

it('Deve retornar erro ao criar reserva sem firstname', () => {

    cy.fixture('booking')
        .then((booking) => {

            delete booking.firstname

            bookingService.createBooking(booking)
                .then((response) => {

                    console.log(
                        'POST /booking - sem firstname',
                        response
                    )

                    expect(response.status)
                        .to.eq(500)

                })

        })

})
    it('Deve validar o comportamento ao criar reserva sem firstname', () => {

        cy.fixture('booking')
            .then((booking) => {

                delete booking.firstname

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking - sem firstname',
                            response
                        )

                    })

            })

    })

    it('Deve validar o comportamento ao criar reserva sem lastname', () => {

        cy.fixture('booking')
            .then((booking) => {

                delete booking.lastname

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking - sem lastname',
                            response
                        )

                    })

            })

    })

    it('Deve validar o comportamento ao criar reserva sem bookingdates', () => {

        cy.fixture('booking')
            .then((booking) => {

                delete booking.bookingdates

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking - sem bookingdates',
                            response
                        )

                    })

            })

    })

    it('Deve validar o comportamento ao criar reserva com totalprice inválido', () => {

        cy.fixture('booking')
            .then((booking) => {

                booking.totalprice = null

                bookingService.createBooking(booking)
                    .then((response) => {

                        console.log(
                            'POST /booking - totalprice inválido',
                            response
                        )

                    })

            })

    })

})