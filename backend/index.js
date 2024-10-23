const imaps = require('imap-simple');
const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(
    cors({
      origin: "*", // Your frontend URL
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
app.use(express.json());
// Gmail IMAP credentials

async function sendReplyEmail(toEmail, originalSubject, message, email,password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass:password,  // You need to generate an app-specific password for Gmail
        },
    });

    const mailOptions = {
        from: email,
        to: toEmail,
        subject: 'RE: ' + originalSubject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reply sent successfully to:', toEmail);
    } catch (err) {
        console.error('Error sending reply:', err);
    }
}

// Helper function to extract plain text from the raw message body
function extractPlainText(body) {
    const startMarker = 'Content-Type: text/plain; charset="UTF-8"';
    const endMarker = 'Content-Type: text/html; charset="UTF-8"';

    const startIndex = body.indexOf(startMarker);
    const endIndex = body.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
        let plainText = body.substring(startIndex + startMarker.length, endIndex).trim();
        plainText = plainText.replace(/--.*\r?\n/g, '').replace(/Content-Transfer-Encoding.*/g, '').trim();

        const lines = plainText.split('\n').filter(line => line.trim() !== '');
        if (lines.length > 2) {
            lines.pop(); // Remove last line
            lines.pop(); // Remove one more line
        }

        return lines.join('\n').trim();
    }
    
    return 'No plain text available';
}

// Function to format the date
function formatDate(dateString) {
    const date = new Date(dateString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    return { formattedDate, formattedTime, dayName };
}

// Function to fetch all emails
async function fetchAllEmails(req,res,email,password) {
    const emails=[]
    try {
        console.log(email,password)
        const config = {
            imap: {
                user: email,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 9000,
                tlsOptions: { rejectUnauthorized: false }
            }
        };
        const connection = await imaps.connect({ imap: config.imap });
        await connection.openBox('INBOX');

        // Search for all emails within the past 7 days
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - 3); // Fetch emails from the past 7 days

        const searchCriteria = [['SINCE', sinceDate]];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'], 
            markSeen: false, // Set this to false if you don't want to mark emails as read
            struct: true,  // Fetch structure of the email
        };

        const messages = await connection.search(searchCriteria, fetchOptions);

        if (messages.length === 0) {
            console.log("No new emails found.");
            return null;
        }

        // Sort messages by date to ensure the latest email is retrieved first
        messages.sort((a, b) => {
            const dateA = new Date(a.parts.filter(part => part.which === 'HEADER')[0].body.date[0]);
            const dateB = new Date(b.parts.filter(part => part.which === 'HEADER')[0].body.date[0]);
            return dateB - dateA;  // Sort in descending order to get the latest email first
        });

        // Loop through and print details of each email
        for (const message of messages) {
            const headerPart = message.parts.filter(part => part.which === 'HEADER')[0].body;
            const subject = headerPart.subject[0];
            const from = headerPart.from[0];
            const date = headerPart.date[0];

            const { formattedDate, formattedTime, dayName } = formatDate(date);

            const bodyPart = message.parts.find(part => part.which === 'TEXT');
            let rawBody = bodyPart ? bodyPart.body : '';

            const plainText = extractPlainText(rawBody);

            const isRead = message.attributes.flags.includes('\\Seen') ? 'Read' : 'Unread';
            
            emails.push({
                from,
                subject,
                formattedDate,
                dayName,
                formattedTime,
                plainText,
                readStatus: isRead,
              });
           
        }
    
        res.json(emails);
    } catch (err) {
        console.error('Error fetching emails:', err);
        return null;
    }
}

app.get('/',  async (req, res) => {
    res.json({ status: "ZORA BACKEND IS RUNNING" });
    
});
app.post('/fetch-emails',  async (req, res) => {
    const { email,password } = req.body;
    console.log(email,password)
    fetchAllEmails(req,res,email,password);
    
});
app.post('/reply', async (req, res) => {
    const { toEmail, originalSubject, message, email,password } = req.body;

    if (!toEmail || !originalSubject || !message) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await sendReplyEmail(toEmail, originalSubject, message, email,password);
        res.json({ status: "success" });
    } catch (err) {
        res.status(500).send('Error sending reply: ' + err.message);
    }
});

app.post('/summarize', async (req, res) => {
    const { prompt} = req.body;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const runFetch = async () => {
          try {
            const response = await fetch(
              'https://ab4d254740f884ca1880358531f9e89a-21771294.ap-south-1.elb.amazonaws.com/fastapi/query',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  prompt:prompt,
                }),
              }
            );
            const data = await response.json();
            console.log(data);
            res.json({ generated_text: data['generated_text'].split('\n')[1] });
          } catch (error) {
            console.error('Error:', error);
          }
        };

runFetch();
});


async function periodicAPICall() {
    try {
        // Example API call, modify as needed
        const response = await fetch('https://zora-backend-5.onrender.com/'); // Replace with your API
        const data = await response.json();
        console.log('Periodic API call data:', data);
    } catch (error) {
        console.error('Error during periodic API call:', error);
    }
}

// Set interval to call the periodicAPICall function every 10 seconds
setInterval(periodicAPICall, 10000); // 10000 milliseconds = 10 seconds


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});