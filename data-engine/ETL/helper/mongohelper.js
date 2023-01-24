import mongoose from 'mongoose';
import { CONSTANTS } from '../shared/Constants';

export function dbConnect() {
    mongoose.connect(CONSTANTS.dbconnectionURL);
}

export function dbDisconnect() {
    mongoose.disconnect();
}
