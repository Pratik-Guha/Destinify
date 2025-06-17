"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Model } from "./Model";
import { Heading } from "../Heading";
import { Inputs } from "../inputs/Inputs";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRegisterModel } from "@/app/hooks/useRegisterModel";
import { useLoginModel } from "@/app/hooks/useLogin";

export const LoginModel = () => {
  const router = useRouter();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh(); // Refresh the page to reflect the logged-in state
          loginModel.onClose();
          router.push("/"); // Redirect to homepage after successful login
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 text-black">
      <Heading title="Welcome back" subtitle="Login with your account!" />
      <Inputs
        id="email"
        label="Email"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Inputs
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={IoLogoGithub}
        onClick={() => signIn("github")}
      />
      {/* <div className="text-center">
        <span className="text-neutral-500">Or log in with Clerk:</span>
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => {
              if (!user) {
                openSignIn(); // Only open SignIn modal if user is not signed in
              } else {
                toast.error("You are already signed in.");
              }
            }}
            className="px-4 py-2 border border-black bg-red-500 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            Log In with Clerk
          </button>
        </div>
      </div> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div
            onClick={() => {
              loginModel.onClose(); // Close login modal
              registerModel.onOpen(); // Open register modal
            }}
            className="text-neutral-800 cursor-pointer hover:underline hover:text-blue-500"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};