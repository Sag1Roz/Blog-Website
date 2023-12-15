import { FormEvent, useState } from "react";
import {
  LoginValidation,
  SchemaValidation,
  validation,
} from "../../models/validation";
import { login } from "../../services/user";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";

export function SignInForm() {
  const { closeModal } = useModal();
  const { updateToken } = useUser();
  const [formData] = useState<LoginValidation>({
    email: "",
  });
  const [error, setError] = useState<Partial<SchemaValidation>>({});

  function handelSubmit(e: FormEvent) {
    e.preventDefault();
    const response = validation.safeParse(formData);
    if (!response.success) {
      const rawError = response.error.format();
      setError((errorMessage) => {
        errorMessage = {};
        for (const keyObject in formData) {
          const key = keyObject as keyof SchemaValidation;
          errorMessage[key] = rawError[key]?._errors[0];
        }
        return errorMessage;
      });
    }
    if (response.success) {
      loginForm();
      closeModal();
    }
  }

  async function loginForm() {
    const token = await login({
      email: formData.email,
    });
    if (token !== null) updateToken(token);
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
