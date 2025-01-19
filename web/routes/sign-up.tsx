import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";


export default function () {
  const {
    register,
    submit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.signUp);
  const { search } = useLocation();

  return (
    <form className="custom-form" onSubmit={submit}>
      <h1 className="form-title">Create account</h1>
      <div className="custom-form">
        <a className="google-oauth-button" href={`/auth/google/start${search}`}>
          <img src="https://assets.gadget.dev/assets/default-app-assets/google.svg" width={22} height={22} /> Continue with Google
        </a>
        <input className="custom-input" placeholder="Email" {...register("email")} />
        {errors?.user?.email?.message && <p className="format-message error">Email: {errors.user.email.message}</p>}
        <input className="custom-input" placeholder="Password" type="password" {...register("password")} />
        {errors?.user?.password?.message && <p className="format-message error">Password: {errors.user.password.message}</p>}
        {errors?.root?.message && <p className="format-message error">{errors.root.message}</p>}
        {isSubmitSuccessful && <p className="format-message success">Please check your inbox</p>}
        <button disabled={isSubmitting} type="submit"> Sign Up!
        </button>
      </div>
    </form>
  );
}
