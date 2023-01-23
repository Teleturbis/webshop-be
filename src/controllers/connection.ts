require('dotenv').config();
var mongoose = require('mongoose');

export function startServer(app: any) {
  mongoose.set('strictQuery', true);

  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT, () =>
        console.log(`Server running at port ${process.env.PORT}`)
      );
    })
    .catch((err: any) => console.log('Error connecting to database:', err));
}
