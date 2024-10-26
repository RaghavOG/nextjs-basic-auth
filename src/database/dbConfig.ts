import mongoose from "mongoose";

export const connect = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error", err);
            process.exit(1);
        });
    } catch (error) {
        console.log("Something went wrong in DB connection", error);
    }
};

