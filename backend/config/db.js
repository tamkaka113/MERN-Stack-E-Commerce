import mongoose from 'mongoose'

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log('MongoDB Connected')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDB
