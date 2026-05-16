import { APIRequestContext, expect} from "@playwright/test";

export class BookingApi {
    readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    //create booking
    async createBooking(bookingData: any) {
        const response = await this.apiContext.post('/booking', {
            data: bookingData
        });
        expect(response.status()).toBe(200);
        return response.json();
    }

    //get booking
    async getBooking(bookingId: number) {
        const response = await this.apiContext.get(`/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        return response.json();
    }

//get all booking ids
    async getAllBookingIds() {
        const response = await this.apiContext.get('/booking');
        expect(response.status()).toBe(200);
        return response.json();
    }

    //update booking
    async updateBooking(bookingId: number, bookingData: any) {
        const response = await this.apiContext.put(`/booking/${bookingId}`, {
            data: bookingData
        });
        expect(response.status()).toBe(200);
        return response.json();
    }

    //delete booking
    async deleteBooking(bookingId: number) {
        const response = await this.apiContext.delete(`/booking/${bookingId}`);
        expect(response.status()).toBe(201);
    }

    //PartialUpdateBooking
    async partialUpdateBooking(bookingId: number, bookingData: any) {
        const response = await this.apiContext.patch(`/booking/${bookingId}`, {
            data: bookingData
        });
        expect(response.status()).toBe(200);
        return response.json();
    }
}   