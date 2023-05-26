import app from "./app";
import { connectMongoDB } from "./database/connection";

connectMongoDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(`Error while connecting MongoDB ${err}`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
