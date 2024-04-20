import mongoose from "mongoose";

const connectDB = async () => {
    try {

        // This is important as you will have your own MongoDB URI in a .env file in the root of your project.
        const connectionString = process.env.MONGODB_URI;

        if (!connectionString) { // Simple error handling to verify that the MONGODB_URI environment variable is set.
            console.error("Missing MONGODB_URI environment variable.");
            process.exit(1);
        }

        await mongoose.connect(connectionString);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
