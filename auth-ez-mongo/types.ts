import { EmailService } from "auth-ez";

export interface IUser {
  [x: string]: any;
  username: string;
  password: string;
  email: string;
}

export type RouteNames = {
  loginWithEmailRoute?: string;
  loginWithUsernameRoute?: string;
  signupRoute?: string;
  forgotPasswordRoute?: string;
  resetPasswordRoute?: string;
  logoutRoute?: string;
};

export type EmailOptions = {
  enableEmail?: boolean;
  emailType?: string;
  emailSdk?: any;
  forgotPasswordSubject: string;
  forgotPasswordBody: string;
  verificationMailSubject: string;
  verificationMailBody: string;
  emailService: EmailService;
};

export type Config = {
  User;
  enableLogs?: boolean;
  hashPassword?;
  comparePassword?: typeof Function;
  generateToken?;
  //   tokenOptions?: {
  //     expiresIn?: string;
  //   };
  routeNames?: {
    loginWithEmailRoute?: string;
    loginWithUsernameRoute?: string;
    signupRoute?: string;
    forgotPasswordRoute?: string;
    resetPasswordRoute?: string;
    logoutRoute?: string;
    refreshToken?: string;
  };
  emailOptions?: {
    enableEmail: boolean;
    emailType: string;
    emailSdk: any;
    forgotPasswordSubject?: string;
    forgotPasswordBody?: string;
    verificationMailSubject?: string;
    verificationMailBody?: string;
    emailService?: EmailService;
  };
};
