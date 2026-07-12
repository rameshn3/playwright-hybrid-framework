import{test,expect} from "../../fixtures/apiFixture";

test.describe('Booking API - Get All Booking IDs', () => {

    test('should retrieve all booking IDs successfully', async ({ bookingApi }) => {
        const bookingIds = await bookingApi.getAllBookingIds();

        expect(Array.isArray(bookingIds)).toBeTruthy();
        expect(bookingIds.length).toBeGreaterThan(0);
        expect(bookingIds[0]).toHaveProperty('bookingid');
    });

   test('should get booking details by booking id', async ({ bookingApi }) => {

    const response = await bookingApi.getBookingResponse(1, 200);

    const booking = await response.json();

    expect(booking).toHaveProperty('firstname');
    expect(booking).toHaveProperty('lastname');
    expect(booking).toHaveProperty('totalprice');
    expect(booking).toHaveProperty('depositpaid');
    expect(booking).toHaveProperty('bookingdates');
});

    test('should thow 404 statuscode for invalid booking id', async ({ bookingApi }) => {
        const invalidBookingId = 999999; 
        const response = await bookingApi.getBookingResponse(invalidBookingId, 404);
     expect(await response.text()).toBe("Not Found");
       
        
    });

})
        // This test assumes that there are no bookings in the system.
        // In a real-world scenario, you might want to set up a clean state before running this test.   