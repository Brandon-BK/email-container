import {
  getByLabelText,
  getElementError,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import AuthForm from "../src/components/Auth/AuthForm";
import "@testing-library/jest-dom";
import AddEdit from "./pages/AddEdit";

describe("Click the login button on the header to direct user to the auth form", () => {
  test("should select the email input and insert a value", async () => {
    render(<AuthForm />);
    const loginElement = await screen.getByText("User Email");
    await expect(loginElement).toBeInTheDocument();

    const emailInput = await screen.getByLabelText("User Email");
    await expect(emailInput).toHaveAttribute("type", "email");
  });

  test("Should insert user email and user password in the auth form", async () => {
    render(<AuthForm />);

    //inserting values, events are like this:
    const emailInput = await screen.getByPlaceholderText("Enter Email");
    await fireEvent.change(emailInput, { target: { value: "Kisibubrandon55@gmail.com" },});
    await expect(emailInput.value).toBe("Kisibubrandon55@gmail.com");

    const passwordInput = await screen.getByPlaceholderText("Enter Email");
    await fireEvent.change(passwordInput, { target: { value: "Kisibubrandon55" },});
    await expect(emailInput.value).toBe("Kisibubrandon55");
  });

  test("Should click the login button on the form", async () => {
    render(<AuthForm />);
    //clicking events are like this:
    const loginFormBtn = await screen.getByText("Login");
    await fireEvent.click(loginFormBtn);
  });

  // test("Should click the Add Conctact link on the navbar then create a single contact", async () => {
  //   render(<AddEdit />);

  //   //inserting values, events are like this:
  //   const contactNameInput = await screen.getByPlaceholderText("Enter Name...");
  //   await fireEvent.change(contactNameInput, { target: { value: "bheki" },});
  //   await expect(contactNameInput.value).toBe("bheki");

  //   const contactEmailInput = await screen.getByPlaceholderText("Enter Email...");
  //   await fireEvent.change(contactEmailInput, { target: { value: "bheki@gmail.com" },});
  //   await expect(contactEmailInput.value).toBe("bheki@gmail.com");

  //   const contactNumberInput = await screen.getByPlaceholderText( "Enter Contact...");
  //   await fireEvent.change(contactNumberInput, { target: { value: "1234567890" },});
  //   await expect(contactNumberInput.value).toBe("1234567890");
  // });

  //   test("Should click the edit button on the contacts screen which should allow the user to edit a contact", async () => {
  //     render(<AddEdit />);

  //     // const contactNameInput = await screen.getByPlaceholderText("Enter Name...");
  //     // await fireEvent.change(contactNameInput, {
  //     //   target: { value: "Bheki122" },
  //     // });
  //     // await expect(contactNameInput.value).toBe("Bheki122");

  //     const sveBtn = await screen.getByText("Save");
  //     await fireEvent.click(sveBtn);

  //   });
  // });

  // test("Should click the delete button on the contacts screen table, which should the user to delete a contact", async () => {
  //   render(<AddEdit />);

  //   // const contactNameInput = await screen.getByPlaceholderText("Enter Name...");
  //   // await fireEvent.change(contactNameInput, {
  //   //   target: { value: "Bheki122" },
  //   // });
  //   // await expect(contactNameInput.value).toBe("Bheki122");

  //   const sveBtn = await screen.getByText("Save");
  //   await fireEvent.click(sveBtn);

  // });
});
