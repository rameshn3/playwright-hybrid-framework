import { BookingPayload } from "../utils/bookingInterface";

export const createBookingPayload: BookingPayload = {
    firstname: "John",
    lastname: "Doe",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-10"
    },
    additionalneeds: "Breakfast"
};

export const updateBookingPayload: BookingPayload = {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
        checkin: "2024-02-01",
        checkout: "2024-02-10"
    },
    additionalneeds: "Lunch"
};