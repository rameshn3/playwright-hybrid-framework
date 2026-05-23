import{test,expect} from "../../fixtures/apiFixture";

test.describe('Booking API - Get All Booking IDs', () => {

    test('should retrieve all booking IDs successfully', async ({ bookingApi }) => {
        const bookingIds = await bookingApi.getAllBookingIds();

        expect(Array.isArray(bookingIds)).toBeTruthy();
        expect(bookingIds.length).toBeGreaterThan(0);
        expect(bookingIds[0]).toHaveProperty('bookingid');
    });

    test('should get booking details by booking id', async ({ bookingApi }) => {
        const bookingIds = await bookingApi.getBooking(1); // Assuming booking ID 1 exists

        expect(bookingIds).toHaveProperty('firstname');
        expect(bookingIds).toHaveProperty('lastname');
        expect(bookingIds).toHaveProperty('totalprice');
        expect(bookingIds).toHaveProperty('depositpaid');   
        expect(bookingIds).toHaveProperty('bookingdates');
    });

})
        // This test assumes that there are no bookings in the system.
        // In a real-world scenario, you might want to set up a clean state before running this test.   