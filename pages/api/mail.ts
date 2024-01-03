import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import {  app, saveFormSubmission } from '../../firebase';
import { ref, push } from 'firebase/database';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';



// sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const {
            name,
            email,
            message,
        }: { name: string; email: string; message: string } = req.body;
        console.log(req.body);
        const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
        const data = {
            to: process.env.MAIL_TO as string,
            from: process.env.MAIL_FROM as string,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `Email => ${email}`,
            html: msg.replace(/\r\n/g, "<br>"),
        };
        const submissionData = {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
          };
        try {
            const database = getFirestore(app); // Use getFirestore to ensure compatibility
            const submissionsCollection = collection(database, 'contacts');
            await addDoc(submissionsCollection, submissionData);
            // console.log('Form submission saved successfully.');
            res.status(200).json({ message: "Your message was sent successfully." });
        } catch (err) {
            res.status(500).json({ message: `There was an error sending your message. ${err}` });
        }
    }
}