import session from "express-session";

const setSession = () => {
  return (
    session({
      domain: 'testbscs2b.netlify.app',
      secret: 'secretKey',
      resave: false,
      saveUninitialized: false,
      cookie:{
        sameSite: "None",
        secure:true,
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  )
};

export default setSession;