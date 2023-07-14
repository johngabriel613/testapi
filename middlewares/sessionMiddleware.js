import session from "express-session";

const setSession = () => {
  return (
    session({
      domain: '.netlify.app',
      secret: 'secretKey',
      resave: false,
      saveUninitialized: false,
      cookie:{
        sameSite: false,
        secure:true,
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  )
};

export default setSession;