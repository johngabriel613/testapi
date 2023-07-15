import session from "express-session";

const setSession = () => {
  return (
    session({
      secret: 'secretKey',
      resave: false,
      saveUninitialized: false,
      cookie:{
        sameSite: "None",
        secure:true,
        httpOnly:false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  )
};

export default setSession;