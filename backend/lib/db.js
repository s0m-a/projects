import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config();

// const DB_HOST = process.env.DB_HOST ;
// const DB_PORT = process.env.DB_PORT ;
// const DB_DATABASE = process.env.DB_DATABASE ;
// const DB_USER = process.env.DB_USER ;
// const DB_PWD = process.env.DB_PWD ;
const DATABASE_URL = process.env.DB_DATABASE_URL;



 class Dbstorage{
    constructor(){
        this.db = new Sequelize(DATABASE_URL, {
            logging: console.log,
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // Allow self-signed certificates
                },
           },
        });
    }

    async checklife(){
        try {
            await this.db.authenticate();
            console.log("Connection to the database successful");
            return true;
        } catch (error) {
            console.error("Unable to connect to the database:", error);
            return false;
        }
    }

        // Sync the database schema
        async sync(force = false) {
            try {
                await this.db.sync({ force });
                console.log("Database schema synchronized successfully");
            } catch (error) {
                console.error("Error synchronizing database schema:", error);
            }
        }
    
        // Close the database connection
        async close() {
            try {
                await this.db.close();
                console.log("Database connection closed.");
            } catch (error) {
                console.error("Error closing database connection:", error);
            }
        }
}

const dbStorage = new Dbstorage();
export default dbStorage;