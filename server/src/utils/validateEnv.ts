import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
	MONGO_CONNECTION_STRING: str(),
	PORT: port(),
	CLIENT_URL: str(),
	EMAIL_USER: str(),
	EMAIL_PASS: str(),
	JWT_SECRET: str(),
});