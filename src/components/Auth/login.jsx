import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setPage }) => {
  const { register, formState } = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successful login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.block}>
      <form onSubmit={onSubmit}>
        <h1>Back to your digital life</h1>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors["email"]?.message}</p>

        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must have at least 4 characters",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors["password"]?.message}</p>
        <p>
          Dont have an account?<a onClick={() => setPage(true)}>Register</a>
        </p>
        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
