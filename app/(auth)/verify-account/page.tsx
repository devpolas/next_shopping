import { Metadata } from "next";
import VerifyEmail from "./VerifyEmail";

export const metadata: Metadata = {
  title: "Verify Account",
  description: "Next Shopping Verify Account Page",
};

export default function VerifyAccount() {
  return <VerifyEmail />;
}
