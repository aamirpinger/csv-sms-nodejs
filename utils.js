import axios from 'axios';
import fs from 'fs';
import { stdout } from 'process';

let totalCount = 0;
let unsentMessagesCount = 0;
const outputFile = `output/responses-${new Date().getTime()}.txt`;

export const sendSMS = async records => {
  for (let record of records) {
    const apiUrl = `${process.env.URL}?username=${process.env.USER_NAME}&apiId=${process.env.API_ID}&json=True&destination=${record.phone_number}&source=${process.env.SOURCE}&text=${record.message}`;
    const response = await axios.get(apiUrl);
    stdout.write('.');
    if (response.data['MessageCount']) {
      totalCount += response.data['MessageCount'];
      fs.appendFileSync(
        outputFile,
        `${record.phone_number}, ${record.message}, Sent: Successful. \n`
      );
    } else {
      unsentMessagesCount += response.data['MessageCount'];
      fs.appendFileSync(
        outputFile,
        `${record.phone_number}, ${record.message}, Sent: Unsuccessful. \n`
      );
    }
  }
  stdout.write('\n');
  fileReadCompleteMessage();
};

const fileReadCompleteMessage = () => {
  console.log(`********************************************************`);
  console.log(`Total ${totalCount} SMS sent.`);
  console.log(`Total ${unsentMessagesCount} SMS were failed to sent.`);
  console.log(`*********************************************************`);
};
