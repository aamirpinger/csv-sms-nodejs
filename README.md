# CSV to SMS

This utility will read all the records from msgs.csv file and send messages as sms. This utility
will output a file will the message sent status along with message details.

This utility will end once api requests for all sms messages are invoked.

## CSV Format

---

save file as **msgs.csv**

```csv
phone_number,message
0300123456, This is test message 1
0300123456, This is test message 2
```

# Node must be installed

- Node JS 14.16+ https://nodejs.org/en/download/

# Install app dependencies

```
npm install
```

# Run the app

```
npm run start
```
