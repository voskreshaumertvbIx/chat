import React, { useState } from "react";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormRegister {
  username: string;
  email: string;
  img?: FileList;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState} = useForm<IFormRegister>({
    mode: "onChange",
  });

  const [avatar, setAvatar] = useState<string | null>('img/user.png');

  


  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    console.log(data);
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className={styles.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 4,
              message: "Username must have at least 4 characters",
            },
            maxLength: {
              value: 10,
              message: "Username must have at max 10 characters",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors["username"]?.message}</p>

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

      
      

        <input
          type="file"
          accept="image/*"
          {...register("img")}
          onChange={(e) => {
            handleImageChange(e); 
          }}
        />
          {avatar && <img src={avatar} alt="Avatar Preview" className={styles.avatarPreview} />}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
