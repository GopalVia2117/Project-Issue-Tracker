"use client";
import { Button, TextField } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "easymde/dist/easymde.min.css";

interface IssueForm {
    title: string;
    description: string
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  
  return (
    <form onSubmit={
      handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/");
        })
      } className="max-w-xl space-y-3">
          <TextField.Root>
              <TextField.Input {...register("title")} placeholder="Title"/>
          </TextField.Root>
     
          <Controller
            name="description"
            control={control}
            render={({field}) => 
              <SimpleMdeReact placeholder="Description" {...field} />
            }
          />
          <Button type="submit">Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage