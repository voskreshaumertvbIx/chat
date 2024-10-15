import React, { useState } from "react";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/uload";
import { toast } from "react-toastify";

export const Register = ({setPage}) => {
  const { register, formState } = useForm({
    mode: "onChange",
  });

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
 
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const imgUrl = await upload(avatar.file);
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: response.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", response.user.uid), {
        chats: [],
      });
      toast.success("Registered");
    } catch (err) {
      console.log("Error registering user:", err);
      toast.error("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className={styles.block}>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>

        <input
          type="text"
          placeholder="username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 6,
              message: "Username must have at least 6 characters",
            },
            maxLength: {
              value: 10,
              message: "Username must have at max 10 characters",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors.username?.message}</p>

        <input
          type="email"
          placeholder="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w+-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors.email?.message}</p>

        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        <p className={styles.errors}>{formState.errors.password?.message}</p>

        <input
          type="file"
          accept="image/*"
          {...register("img")}
          onChange={handleImageChange}
        />
        {avatar.url ? (
          <img
            src={avatar.url}
            alt="Avatar Preview"
            className={styles.avatarPreview}
          />
        ) : (
          <img
            src="./img/user.png"
            alt="Default Avatar"
            className={styles.avatarPreview}
          />
        )}
         <p>
          Have an account?<a onClick={() => setPage(false)}>Login</a>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Loading" : "Register"}
        </button>
      </form>
    </div>
  );
};
