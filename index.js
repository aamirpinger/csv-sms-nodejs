import dotenv from 'dotenv';
import csv from 'csv-parser';
import fs from 'fs';
import { sendSMS } from './utils.js';
let records = [];

dotenv.config();
const csvStream = fs.createReadStream('msgs.csv').pipe(csv());
console.log(`Sending sms Process started.`);
console.log(`*******************************`);
csvStream
  .on('data', data => {
    if (data?.phone_number) {
      records.push(data);
    }
  })
  .on('end', async () => {
    console.log(`File read complete, total ${records.length} records were loaded.`);
    await sendSMS(records);
  });
