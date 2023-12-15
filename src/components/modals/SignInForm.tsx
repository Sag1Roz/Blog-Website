import { FormEvent, useState } from "react";
import { LoginValidation, loginValidation } from "../../models/validation";
import { login } from "../../services/user";
import { useModal } from "../../context/ModalContext";
import { RegisterForm } from "./RegisterForm";
import { OtpForm } from "./OtpForm";

export function SignInForm() {
  const { closeModal, openModal } = useModal();
  const [formData] = useState<LoginValidation>({
    email: "",
  });
  const [error, setError] = useState<Partial<LoginValidation>>({});

  function handelSubmit(e: FormEvent) {
    e.preventDefault();
    const response = loginValidation.safeParse(formData);
    if (!response.success) {
      const rawError = response.error.format();
      setError((errorMessage) => {
        errorMessage = {};
        for (const keyObject in formData) {
          const key = keyObject as keyof LoginValidation;
          errorMessage[key] = rawError[key]?._errors[0];
        }
        return errorMessage;
      });
    }

    loginForm();
  }

  async function loginForm() {
    const token = await login({
      email: formData.email,
    });

    closeModal();
    if (token) {
      openModal(<OtpForm />);
    }
    if (token === null) {
      openModal(<RegisterForm />);
    }
  }

  return (
    <div className="flex  justify-center items-center">
      <form onSubmit={handelSubmit} className=" rounded-md bg text">
        <h1 className="text-center font-bold text-xl underline p-2">
          טופס התחברות
        </h1>

        <div className="p-5">
          <label className="block" htmlFor="email">
            איימל
          </label>
          <input
            onChange={(e) => (formData.email = e.target.value)}
            className="input"
            type="text"
            id="email"
          />
          {error.email && (
            <small className="text-red-600 block">{error.email}</small>
          )}
        </div>
        <div className="flex justify-center p-2">
          <button className="button">התחבר</button>
        </div>
      </form>
    </div>
  );
}
