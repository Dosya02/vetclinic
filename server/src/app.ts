import "dotenv/config";
import express from "express";
import cors from "cors";
import env from "./utils/validateEnv";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors({
	origin: env.CLIENT_URL,
	credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

export default app;