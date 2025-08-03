import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import AuthRouter from '../modules/auth/auth.route';
import divisionRouter from '../modules/division/division.route';
import tourRouter from '../modules/tour/tour.route';
import bookingRoute from '../modules/booking/booking.route';
import paymentRoute from '../modules/payment/payment.route';
import { OTPRouter } from '../modules/otp/otp.route';

const router = Router();

interface IModuleRoutes {
  path: string;
  element: Router;
}

const moduleRoutes: IModuleRoutes[] = [
  {
    path: 'user',
    element: UserRoutes,
  },
  {
    path: 'auth',
    element: AuthRouter,
  },
  {
    path: 'division',
    element: divisionRouter,
  },
  {
    path: 'tour',
    element: tourRouter,
  },
  {
    path: 'booking',
    element: bookingRoute,
  },
  {
    path: 'payment',
    element: paymentRoute,
  },
  {
    path: 'otp',
    element: OTPRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(`/${r.path}`, r.element);
});

export default router;
