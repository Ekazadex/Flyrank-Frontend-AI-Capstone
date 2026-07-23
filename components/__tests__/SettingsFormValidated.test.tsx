import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsFormValidated } from "@/components/SettingsFormValidated";

describe("SettingsFormValidated", () => {
  it("renders the form fields", () => {
    render(<SettingsFormValidated />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<SettingsFormValidated />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const alert = await screen.findByRole("alert");
    expect(within(alert).getByText(/Full name must be at least 3 characters./i)).toBeInTheDocument();
    expect(within(alert).getByText(/Enter a valid email address./i)).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<SettingsFormValidated />);

    await user.type(screen.getByLabelText(/Full Name/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "invalid-email");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const alert = await screen.findByRole("alert");
    expect(within(alert).getByText(/Enter a valid email address./i)).toBeInTheDocument();
  });

  it("accepts optional password when empty", async () => {
    const user = userEvent.setup();
    render(<SettingsFormValidated />);

    await user.type(screen.getByLabelText(/Full Name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/Email/i), "jane@example.com");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.queryByText(/Password must be at least 8 characters/i)).not.toBeInTheDocument();
  });

  it("shows password validation error for weak password", async () => {
    const user = userEvent.setup();
    render(<SettingsFormValidated />);

    await user.type(screen.getByLabelText(/Full Name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/Email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/Password/i), "weakpass");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByText(/Password must be at least 8 characters and include one uppercase letter and one number./i)
    ).toBeInTheDocument();
  });
});
