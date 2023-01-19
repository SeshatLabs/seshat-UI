import mongoose from 'mongoose';
import { CONSTANTS } from '../shared/Constants';

export default function dbConnect (){

    mongoose.connect(CONSTANTS.dbconnectionURL);
}
