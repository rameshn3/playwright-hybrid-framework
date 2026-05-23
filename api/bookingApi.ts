import { BaseApi } from "./baseApi";
import {
    BookingPayload,
    BookingResponse
} from "../utils/bookingInterface";

export class BookingApi extends BaseApi {

    private token: string | null = null;

    // Create Booking
    async createBooking(
        bookingData: BookingPayload
    ): Promise<BookingResponse> {

        const response = await this.post(
            "/booking",
            bookingData
        );

        return await response.json() as BookingResponse;
    }

    // Get Booking
    async getBooking(
        bookingId: number
    ): Promise<BookingPayload> {

        const response = await this.get(
            `/booking/${bookingId}`
        );

        return await response.json() as BookingPayload;
    }

    // Get All Bookings
    async getAllBookingIds() {

        const response = await this.get(
            "/booking"
        );

        return await response.json();
    }

    // Update Booking
    async updateBooking(
        bookingId: number,
        bookingData: BookingPayload
    ): Promise<BookingPayload> {

        const token = await this.getAuthToken();

        const response = await this.put(
            `/booking/${bookingId}`,
            bookingData,
            200,
            {
                cookie: `token=${token}`
            }
        );

        return await response.json() as BookingPayload;
    }

    // Partial Update
    async partialUpdateBooking(
        bookingId: number,
        bookingData: Partial<BookingPayload>
    ): Promise<BookingPayload> {

        const token = await this.getAuthToken();

        const response = await this.patch(
            `/booking/${bookingId}`,
            bookingData,
            200,
            {
                cookie: `token=${token}`
            }
        );

        return await response.json() as BookingPayload;
    }

    // Delete Booking
    async deleteBooking(
        bookingId: number
    ): Promise<void> {

        const token = await this.getAuthToken();

        await this.delete(
            `/booking/${bookingId}`,
            201,
            {
                cookie: `token=${token}`
            }
        );
    }

    // Generate Token
    private async generateAuthToken(): Promise<string> {

        const response = await this.post(
            "/auth",
            {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        );

        const responseBody = await response.json();

        return responseBody.token;
    }

    // Cached Token
    private async getAuthToken(): Promise<string> {

        if (this.token) {
            return this.token;
        }

        this.token = await this.generateAuthToken();

        return this.token;
    }
}