import ContactUs from "@/components/ContactUs";
import {Typography} from "@mui/material";

const MailPage = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ml:10,mt:5}}>Send Mail</Typography>
      <ContactUs />
    </div>
  );
};

export default MailPage;
