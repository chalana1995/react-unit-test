import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Login from "./login/Login"


jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: { id: 1, name: "John" }
        })
    }
}))

test("username input should be render", () => {
    render(<Login />);
    const userinputEl = screen.getByPlaceholderText(/username/i);
    expect(userinputEl).toBeInTheDocument()
})

test("password input should be render", () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument()
})

test("button input should be rendered", () => {
    render(<Login />);
    const buttonInputEl = screen.getByRole("button");
    expect(buttonInputEl).toBeInTheDocument()
})

test("username input should be empty", () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i);
    expect(userInputEl.value).toBe("")
})


test("password input should be empty", () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe("")
})


test("button should be disabled", () => {
    render(<Login />);
    const buttonInputEl = screen.getByRole("button");
    expect(buttonInputEl).toBeDisabled()
})

test("error message should not be visible", () => {
    render(<Login />);
    const errorEl = screen.getByTestId("error");
    expect(errorEl).not.toBeVisible()
})

test("username input should change", () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = "test"

    fireEvent.change(userInputEl, { target: { value: testValue } })
    expect(userInputEl.value).toBe(testValue)
})


test("password input should change", () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "password";

    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    expect(passwordInputEl.value).toBe(testValue)
})


test("button should not be disabled when input exist", () => {
    render(<Login />);
    const buttonInputEl = screen.getByRole("button");
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test"

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })

    expect(buttonInputEl).not.toBeDisabled()
})


test("loading should not be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).not.toHaveTextContent()
})


test("loading should be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test"

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.click(buttonEl)

    expect(buttonEl).toHaveTextContent(/please wait/i)
})


test("loading should not be rendered after fetching", async () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test"

    fireEvent.change(userInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.click(buttonEl)

    const userItem = await screen.findByText("John")

    expect(buttonEl).toBeInTheDocument()


})