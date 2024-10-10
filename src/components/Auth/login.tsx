import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";


interface iFormLogin {
  email: string;
  password: string;
}


const Login = ({ setPage }: { setPage: (value: boolean) => void }) => {
 
  const { register, handleSubmit, formState } = useForm<iFormLogin>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<iFormLogin> = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <p className={styles.errors}>{formState.errors['password']?.message}</p>
        <p>
          Dont have an account?<a onClick={()=>setPage(true)}>Register</a>

        </p>
        <button>Login</button>
        
      </form>
    </div>
  );
};

export default Login;
