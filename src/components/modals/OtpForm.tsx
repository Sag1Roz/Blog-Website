import { FormEvent, useState } from "react";
import { OtpValidation, otpValidation } from "../../models/validation";
import { verifyCode } from "../../services/user";
import { useUser } from "../../context/UserContext";
import { useModal } from "../../context/ModalContext";
import { RegisterForm } from "./RegisterForm";

export function OtpForm() {
  const { updateToken } = useUser();
  const { openModal } = useModal();
  const [formData] = useState<OtpValidation>({
    email: "",
    otp: "",
  });
  const [error, setError] = useState<Partial<OtpValidation>>({});
  function handelSubmit(e: FormEvent) {
    e.preventDefault();
    const response = otpValidation.safeParse(formData);
    if (!response.success) {
      const rawError = response.error.format();
      setError((errorMessage) => {
        errorMessage = {};
        for (const keyObject in formData) {
          const key = keyObject as keyof OtpValidation;
          errorMessage[key] = rawError[key]?._errors[0];
        }
        return errorMessage;
      });
    }
    codeValidation();
  }

  async function codeValidation() {
    const data = await verifyCode({
      email: formData.email,
      otp: formData.otp,
    });
    if (data === null) return;
    if (data.newUser) {
      openModal(<RegisterForm />);
    }
    if (data.token !== null) updateToken(data.token);
  }
  return (
    <div className="flex  justify-center items-center">
      <form onSubmit={handelSubmit} className=" rounded-md bg text">
        <h1 className="text-center font-bold text-xl underline p-2">
          טופס בדיקה
        </h1>

        <div className="p-5">
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
            <label className="block" htmlFor="otp">
              קוד
            </label>
            <input
              onChange={(e) => (formData.email = e.target.value)}
              className="input"
              type="text"
              id="otp"
            />
            {error.otp && (
              <small className="text-red-600 block">{error.otp}</small>
            )}
          </div>
        </div>
        <div className="flex justify-center p-2">
          <button className="button">בדיקה</button>
        </div>
      </form>
    </div>
  );
}
