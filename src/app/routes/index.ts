import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import AuthRouter from '../modules/auth/auth.route';
import divisionRouter from '../modules/division/division.route';
import tourRouter from '../modules/tour/tour.route';
import bookingRoute from '../modules/booking/booking.route';
import paymentRoute from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/division',
    route: divisionRouter,
  },
  {
    path: '/tour',
    route: tourRouter,
  },
  {
    path: '/booking',
    route: bookingRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

moduleRoutes.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;
