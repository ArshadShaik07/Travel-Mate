import jwt from "jsonwebtoken";

function authUser(req, res, next) {
	const authHeader = req.headers["authorization"];
	if (!authHeader) throw Error("Unauthorised");
	const accessToken = authHeader.split(" ")[1];

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			res.status(403);
			throw Error("forbidden page!");
		}
		req.user = user;
	});
	next();
}

export { authUser };
