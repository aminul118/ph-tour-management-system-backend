import { Router } from 'express';
import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createBookingZodSchema, updateBookingStatusZodSchema } from './booking.validation';
import BookingControllers from './booking.controller';

const router = Router();

// api/v1/booking
router.post(
  '/',
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingControllers.createBooking,
);

// api/v1/booking
router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), BookingControllers.getAllBookings);

// api/v1/booking/my-bookings
router.get('/my-bookings', checkAuth(...Object.values(Role)), BookingControllers.getUserBookings);

// api/v1/booking/bookingId
router.get('/:bookingId', checkAuth(...Object.values(Role)), BookingControllers.getSingleBooking);

// api/v1/booking/bookingId/status
router.patch(
  '/:bookingId/status',
  checkAuth(...Object.values(Role)),
  validateRequest(updateBookingStatusZodSchema),
  BookingControllers.updateBookingStatus,
);

const bookingRoute = router;

export default bookingRoute;
