import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpScheme';

const UsernameQuerrySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username'),
    };
    // validate with zod
    const result = UsernameQuerrySchema.safeParse(queryParam);
    console.log(result); // TODO: remove
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid querry param',
        },
        { status: 400 }
      );
    }
    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username already taken',
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Username is Unique',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error Checking Username', err);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      {
        status: 500,
      }
    );
  }
}
