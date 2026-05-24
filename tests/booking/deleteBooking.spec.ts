import{test,expect} from '../../fixtures/apiFixture';
import{createBookingPayload} from '../../testdata/bookingTestData';
import { bookingResponseSchema } from '../../api/schemas/bookingSchema';
import {validateSchema} from '../../utils/schemaValidator';

test.describe('Booking API - Create Booking--then delete booking', () => {

    test('should create a new booking --> delete th same booking successfully', async ({ bookingApi }) => {
    
        const response = await bookingApi.createBooking(createBookingPayload);
        //lets validat the responseBody
        expect(response).toHaveProperty('bookingid');
        //schema validation using bookingResponseSchema
        expect(response.bookingid).toBeGreaterThan(0);
        validateSchema(response, bookingResponseSchema);

        const bookingId = response.bookingid;

        // Now let's delete the same booking
      await bookingApi.deleteBooking(bookingId);  

    });
});