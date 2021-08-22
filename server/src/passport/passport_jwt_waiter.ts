import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import Account from "../models/Account";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await Account.findById(payload.id);

        if (!user) return done(null, false);
        else if (!user.rols.includes("waiter") && !user.rols.includes("admin"))
            return done(null, false);

        return done(null, user);
    } catch (e) {
        console.log(e);
        console.log("passport_jwt_waiter.ts");
        return done(e, false);
    }
});
