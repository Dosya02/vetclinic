import { app } from 'app';
import { env } from 'config/env';
import { connectDB } from 'config/database';

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server is running at http://localhost:${env.PORT}`);
  });
}

start();