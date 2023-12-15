import { FormEvent, useState } from "react";
import { SchemaValidation, validation } from "../../models/validation";
import { register } from "../../services/user";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";

export function RegisterForm() {
  const { closeModal } = useModal();
  const { updateToken } = useUser();
  const [formData] = useState<SchemaValidation>({
    firstName: "",
    lastName: "",
    email: "",
    nikName: "",
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
      registerForm();
      closeModal();
    }
  }

  async function registerForm() {
    const token = await register({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      nickname: formData.nikName,
    });
    if (token !== null) updateToken(token);
  }

  return (
    <form onSubmit={handelSubmit} className="rounded-md bg text">
      <h1 className="text-center font-bold  underline p-2 title">טופס הרשמה</h1>
      <div className="grid grid-cols-2 gap-5 p-5">
        <div>
          <label className="block" htmlFor="firstName">
            שם
          </label>
          <input
            onChange={(e) => (formData.firstName = e.target.value)}
            className="input"
            type="text"
            id="firstName"
          />
          {error.firstName && (
            <small className="text-red-600 block">{error.firstName}</small>
          )}
        </div>
        <div>
          <label className="block" htmlFor="lastName">
            שם משפחה
          </label>
          <input
            onChange={(e) => (formData.lastName = e.target.value)}
            className="input"
            type="text"
            id="lastName"
          />

          {error.lastName && (
            <small className="text-red-600 block">{error.lastName}</small>
          )}
        </div>
        <div>
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
        <div>
          <label className="block" htmlFor="nikName">
            ניק ניים
          </label>
          <input
            onChange={(e) => (formData.nikName = e.target.value)}
            className="input"
            type="text"
            id="nikName"
          />
          {error.nikName && (
            <small className="text-red-600 block">{error.nikName}</small>
          )}
        </div>
        <div>אוואטרים</div>
      </div>
      <div className="flex justify-center p-2">
        <button className="button">הרשם</button>
      </div>
    </form>
  );
}
