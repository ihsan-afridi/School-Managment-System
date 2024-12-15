import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled components
const PageWrapper = styled.div`
  overflow-x: hidden;
  background-color: #04122c;
  background-repeat: no-repeat;
  font-family: "Poppins, sans-serif";
  color: rgb(255 255 255 / var(--tw-text-opacity));
  background-image: radial-gradient(
      100% 100% at 50% -30%,
      #2d80e1 0%,
      #073aff00 100%
    ),
    radial-gradient(100% 100% at 50% 0%, #ff000000 0%, #ff000000 99%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 634px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  background-color: black;
  color: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: "Poppins, sans-serif";
`;

const Header = styled.div`
  background-color: #007bff;
  color: #fff;
  border-radius: 8px 8px 0 0;
  padding: 1rem;
  text-align: center;
`;

const Heading = styled.h2`
  margin: 0;
`;

const Form = styled.form`
  padding: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
  }
`;

const RedirectText = styled.p`
  text-align: center;
  color: #ddd;
  font-size: 0.9rem;
`;

const RedirectLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminRegistration = () => {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: adminName,
          email,
          password,
        }
      );

      if (response.data.success) {
        navigate("/admin-login"); // Redirect to login after successful registration
      }
    } catch (error) {
      setError("Error registering the admin. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <FormContainer>
        <FormBox>
          <Header>
            <Heading>Admin Registration</Heading>
          </Header>
          <Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormGroup>
              <Label htmlFor="adminName">Admin Name</Label>
              <Input
                type="text"
                id="adminName"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            <SubmitButton type="submit">Register</SubmitButton>
          </Form>
          <RedirectText>
            Already have an account?{" "}
            <RedirectLink href="sign-in">Login here</RedirectLink>
          </RedirectText>
        </FormBox>
      </FormContainer>
    </PageWrapper>
  );
};

export default AdminRegistration;
