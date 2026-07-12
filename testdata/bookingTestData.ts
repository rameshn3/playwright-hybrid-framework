import { BookingPayload } from "../utils/bookingInterface";

export const createBookingPayload: BookingPayload = {
    firstname: "John",
    lastname: "Doe",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
        checkin: "2026-06-30",
        checkout: "2026-07-10"
    },
    additionalneeds: "Breakfast"
};

export const updateBookingPayload: BookingPayload = {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
        checkin: "2026-07-01",
        checkout: "2026-07-15"
    },
    additionalneeds: "Lunch"
};