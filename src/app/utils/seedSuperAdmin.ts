/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import envVars from '../config/env';
import { IAuthProvider, IUser, Role } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const seedSupperAdmin = async () => {
  try {
    const isSupperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSupperAdminExist) {
      console.log('Supper admin already Exits');
      return;
    }

    console.log('Trying to create supper admin...');

    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      envVars.BCRYPT_SALT_ROUND,
    );

    const authProvider: IAuthProvider = {
      provider: 'credentials',
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: 'super admin',
      email: envVars.SUPER_ADMIN_EMAIL,
      role: Role.SUPER_ADMIN,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log('Super admin created successfully \n');
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};

export { seedSupperAdmin };
