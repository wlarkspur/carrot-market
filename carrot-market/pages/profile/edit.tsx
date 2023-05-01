import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { spawn } from "child_process";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [setValue, user]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email or Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { id, uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      await fetch(uploadURL, {
        method: "POST",
        body: form,
      });
      // upload file to CF URL
      return;
      editProfile({
        email,
        phone,
        name,
        //avatarUrl: CF URL
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  /* useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]); */
  const [avatarPreview, setAvatarPreiview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreiview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack>
      <form
        onChange={() => clearErrors()}
        onSubmit={handleSubmit(onValid)}
        className="py-10 px-4 space-y-4"
      >
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <img className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border-gray-500  rounded-md shadow-md text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          name="name"
          label="Name"
          kind="text"
          type="text"
          required={false}
          register={register("name")}
        />
        <Input
          name="email"
          label="Email"
          kind="text"
          type="text"
          required={false}
          register={register("email")}
        />

        <Input
          name="Phone"
          label="Phone number"
          kind="phone"
          type="text"
          register={register("phone")}
          required={false}
        />
        {errors.formErrors ? (
          <span className="my-3 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
