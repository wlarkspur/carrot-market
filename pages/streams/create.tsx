import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "@prisma/client";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Go live">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 py-10 px-4">
        <Input
          required
          name="name"
          label="Name"
          kind="text"
          type="text"
          register={register("name", { required: true })}
        />
        <Input
          name="price"
          label="Price"
          kind="price"
          type="text"
          required
          register={register("price", { required: true, valueAsNumber: true })}
        />
        <TextArea
          label="Description"
          name="description"
          register={register("description", { required: true })}
        ></TextArea>
        <Button text={loading ? "Loading..." : "Go Live"}></Button>
      </form>
    </Layout>
  );
};

export default Create;
