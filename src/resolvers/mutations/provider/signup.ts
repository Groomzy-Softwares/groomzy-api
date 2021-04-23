import { validate } from "isemail";
import bcrypt from "bcrypt";

import { IContext } from "../../types";
import { ISignupServiceProviderArgs } from "./types";
import { mailContent } from "../../../utils";
import { transport } from "../../../utils";

export const signupServiceProviderMutation = async (
  _: any,
  signupServiceProviderInput: ISignupServiceProviderArgs,
  ctx: IContext
) => {
  const { firstName, lastName, phoneNumber } = signupServiceProviderInput;

  let { email, password } = signupServiceProviderInput;

  try {
    // is email empty
    if (!email || email.length < 1) {
      throw new Error("Email is required.");
    }

    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new Error("Provided email is invalid.");
    }

    // password is empty
    if (!password) {
      throw new Error("Password is required");
    }

    // Password should be at least 5 charectors long.
    if (password.length < 5) {
      throw new Error("Password must be 5 charectors long.");
    }

    // Make email lower case and trim the white spaces.
    email = email.toLocaleLowerCase().trim();

    // Check if the iser already exists.
    if (
      await ctx.prisma.serviceProvider.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new Error(
        "Service provider already exists, navigate to signing in."
      );
    }

    // Hash password before stored in the database.
    password = await bcrypt.hash(password, 10);

    // A service provider address is not required at signing up
    // but a service provider can update his/her address
    // hence why we create as blank on sign up.
    const address = await ctx.prisma.address.create({
      data: {},
    });

    const serviceProvider = await ctx.prisma.serviceProvider.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        addressId: address.id,
      },
    });

    const serviceProviderEmailMessage = `You recently signed up to Groomzy.<br />
			This email serves to confirm that your detailes were captured.<br />
		`;

    if (!serviceProvider) {
      throw new Error(
        "Something went wrong when signing up, please try again later."
      );
    }

    let serviceProviderSendEmailErrorMessage = "";

    const serviceProviderContentEmail = mailContent(
      serviceProvider.firstName,
      serviceProviderEmailMessage
    );

    try {
      const serviceProviderEmail = {
        from: "info@groomzy.co.za",
        html: serviceProviderContentEmail,
        subject: "Groomzy signup confirmation.",
        to: serviceProvider.email,
      };

      await transport.sendMail(serviceProviderEmail);
    } catch (e) {
      serviceProviderSendEmailErrorMessage = `We tried to send an email to ${email} but it failed.
			This may be due to an email provided not working.
			Please provide an active email address.

			The signing up was not complete!
			`;
    }

    if (
      serviceProviderSendEmailErrorMessage &&
      serviceProviderSendEmailErrorMessage.length > 0
    ) {
      await ctx.prisma.serviceProvider.delete({
        where: {
          email,
        },
      });

      throw new Error(serviceProviderSendEmailErrorMessage);
    }

    return {
      message: `All set. Now you can sign in using the credentials you provided sent to: ${serviceProvider.email}. Please check your spam folder if email not recieved and report it as "not spam".`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
