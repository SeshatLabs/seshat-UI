import mongoose from 'mongoose';
import { CONSTANTS } from '../shared/Constants';

export function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(CONSTANTS.dbconnectionURL);
    }
}

export function dbDisconnect() {
    mongoose.disconnect();
}
