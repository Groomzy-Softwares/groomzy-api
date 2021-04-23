import { validate } from "isemail";
import bcrypt from "bcrypt";

import { IContext } from "../../types";
import { ISignupClientArgs } from "./types";
import { mailContent } from "../../../utils";
import { transport } from "../../../utils";

export const signupClientMutation = async (
  _: any,
  clientInput: ISignupClientArgs,
  ctx: IContext
) => {
  const { firstName, lastName, phoneNumber } = clientInput;

  let { email, password } = clientInput;

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
      await ctx.prisma.client.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new Error("Client already exists, navigate to signing in.");
    }

    // Hash password before stored in the database.
    password = await bcrypt.hash(password, 10);

    // A client address is not required at signing up
    // but a client can update his/her address
    // hence why we create as blank on sign up.
    const address = await ctx.prisma.address.create({
      data: {},
    });

    const client = await ctx.prisma.client.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        addressId: address.id,
      },
    });

    const clientEmailMessage = `You recently signed up to Groomzy.<br />
			This email serves to confirm that your detailes were captured.<br />
		`;

    if (!client) {
      throw new Error(
        "Something went wrong when signing up, please try again later."
      );
    }

    let clientSendEmailErrorMessage = "";

    const clientContentEmail = mailContent(
      client.firstName,
      clientEmailMessage
    );

    try {
      const clientEmail = {
        from: "info@groomzy.co.za",
        html: clientContentEmail,
        subject: "Groomzy signup confirmation.",
        to: client.email,
      };

      await transport.sendMail(clientEmail);
    } catch (e) {
      clientSendEmailErrorMessage = `We tried to send an email to ${email} but it failed.
			This may be due to an email provided not working.
			Please provide an active email address.

			The signing up was not complete!
			`;
    }

    if (clientSendEmailErrorMessage && clientSendEmailErrorMessage.length > 0) {
      await ctx.prisma.client.delete({
        where: {
          email,
        },
      });

      throw new Error(clientSendEmailErrorMessage);
    }

    return {
      message: `All set. Now you can sign in using the credentials you provided sent to: ${client.email}. Please check your spam folder if email not recieved and report it as "not spam".`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
