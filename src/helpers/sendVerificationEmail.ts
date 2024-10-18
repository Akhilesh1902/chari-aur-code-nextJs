import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApirResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApirResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Next App | Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log({ data, error });
    return {
      success: false,
      message: 'Verification email sent successfully.',
    };
  } catch (emailError) {
    console.error('Error Sending verification email.', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
