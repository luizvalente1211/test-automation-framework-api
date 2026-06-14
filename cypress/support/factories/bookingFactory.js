import { faker } from '@faker-js/faker'

export const createBookingData = () => {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({
            min: 100,
            max: 5000
        }),
        depositpaid: true,
        bookingdates: {
            checkin: '2026-09-10',
            checkout: '2026-09-20'
        },
        additionalneeds: 'Breakfast'
    }
}