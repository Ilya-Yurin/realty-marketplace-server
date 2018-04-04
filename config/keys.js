//add this file to .gitignore

const GOOGLE_CLIENT_ID = '--add-your-client-id--';
const GOOGLE_CLIENT_SECRET = '--add-your-secret--';
const GOOGLE_REDIRECT_URI = '--add-your-redirect-uri--';

module.exports = Object.freeze({
  GOOGLE: {
    CLIENT_ID: GOOGLE_CLIENT_ID,
    CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: GOOGLE_REDIRECT_URI
  }
});
