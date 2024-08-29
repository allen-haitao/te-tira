import React from "react";
import { UserLayout } from "../../layouts/userLayout";
import { LogInForm } from "./LogInForm";

export const LogInPage: React.FC = (props) => {
  return (
    <UserLayout>
      <LogInForm />
    </UserLayout>
  );
};