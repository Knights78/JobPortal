import { google } from 'googleapis';

export const verifyIdToken = async (idToken) => {
  try {
    const ticket = await google.auth.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const decodedToken = ticket.getPayload();
    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};