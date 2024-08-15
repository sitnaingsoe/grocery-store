import React, {useRef} from "react";
import emailjs from "@emailjs/browser";
import {Box, Button, TextField} from "@mui/material";

const ContactUs = () => {
  const form = useRef(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm("service_nc7g74k", "template_cyupbbq", form.current as any, {
        publicKey: "w85Zbz5PougxhMEHM",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <Box sx={{display: "flex", p: 5}}>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <br />
        <TextField type="text" name="sendername" />
        <br />
        <label>To Email</label>
        <br />
        <TextField type="email" name="to" />
        <br />
        <label>Subject</label>
        <br />
        <TextField type="text" name="subject" />
        <br />
        <label>Message</label>
        <br />
        <textarea name="message" cols={50} rows={5} />
        <br />
        <br />
        <Button type="submit" value="Send" variant="contained">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs;
