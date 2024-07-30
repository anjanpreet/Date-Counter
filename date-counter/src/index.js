import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const StepContext = createContext();

// Create a provider component
function StepProvider({ children }) {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <StepContext.Provider value={{ step, setStep, count, setCount }}>
      {children}
    </StepContext.Provider>
  );
}
// Custom hook to use the step context
function useStep() {
  return useContext(StepContext);
}

function Button({ onClick, children }) {
  return (
    <button id="button" onClick={onClick}>
      {children}
    </button>
  );
}

function DateMessage() {
  const { count } = useStep();
  const date = new Date();

  // Increment the date based on count
  date.setDate(date.getDate() + count);

  // Get the full day of the week
  const day = date.toLocaleString("default", { weekday: "long" });
  // Get the day of the month
  const dayOfMonth = date.getDate();
  // Get the month in words
  const month = date.toLocaleString("default", { month: "long" });
  // Get the year
  const year = date.getFullYear();

  return (
    <h3>
      {day}, {dayOfMonth} {month} {year}
    </h3>
  );
}

function Step() {
  const { step, setStep } = useStep();
  return (
    <>
      <Button onClick={() => setStep((step) => step + 1)}>+</Button>
      <span>Step: {step}</span>
      <Button onClick={() => setStep((step) => step - 1)}>-</Button>
    </>
  );
}

function Count() {
  const { step } = useStep();
  const { count, setCount } = useStep();
  return (
    <>
      <Button onClick={() => setCount((count) => count + step)}>+</Button>
      <span>Count: {count}</span>
      <Button onClick={() => setCount((count) => count - step)}>-</Button>
    </>
  );
}

function App() {
  return (
    <>
      <StepProvider>
        <Step></Step>
        <br></br>
        <Count></Count>
        <br></br>
        <DateMessage></DateMessage>
      </StepProvider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
