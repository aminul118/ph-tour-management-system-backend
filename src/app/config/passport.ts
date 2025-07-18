/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions as GoogleStrategyOptions,
  VerifyCallback as GoogleVerifyCallback,
} from "passport-google-oauth20";

import {
  Strategy as LocalStrategy,
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
} from "passport-local";

import bcrypt from "bcryptjs";
import envVars from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";

// ----------------------------
// Local Strategy (email/password)
// ----------------------------

const localStrategyOptions: IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const localVerifyFunction: VerifyFunctionWithRequest = async (
  req,
  email,
  password,
  done
) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done("User doesn't exist");
    }

    const isGoogleAuthenticate: boolean = user.auths.some((providerObj) => {
      return providerObj.provider === "google";
    });

    if (isGoogleAuthenticate && !user.password) {
      return done(
        "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password"
      );
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordMatched) {
      return done("Incorrect password");
    }

    return done(null, user);
  } catch (error) {
    if (envVars.NODE_ENV === "development") {
      console.log(error);
    }
    return done(error);
  }
};

// ----------------------------
// Google OAuth Strategy
// ----------------------------
const googleStrategyOptions: GoogleStrategyOptions = {
  clientID: envVars.GOOGLE_CLIENT_ID,
  clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  callbackURL: envVars.GOOGLE_CALLBACK_URL,
};

const googleVerifyFunction = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: GoogleVerifyCallback
) => {
  try {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done("No email found");
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value,
        role: Role.USER,
        isVerified: true,
        auths: [
          {
            provider: "google",
            providerId: profile.id,
          },
        ],
      });
    }

    return done(null, user);
  } catch (error) {
    console.error("Google strategy error:", error);
    return done(error);
  }
};

// Using  local strategy middleware
passport.use(new LocalStrategy(localStrategyOptions, localVerifyFunction));
// Using google strategy middleware
passport.use(new GoogleStrategy(googleStrategyOptions, googleVerifyFunction));

// ----------------------------
// Session Handling
// ----------------------------

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(
  async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      if (envVars.NODE_ENV === "development") {
        console.log("Deserialize", error);
      }
      done(error);
    }
  }
);

export default passport;
