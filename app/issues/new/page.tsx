"use client";
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from "zod";
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import "easymde/dist/easymde.min.css";

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: {errors, isSubmitting} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState("");
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form onSubmit={onSubmit} className="space-y-3">
            <TextField.Root>
                <TextField.Input {...register("title")} placeholder="Title"/>
            </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      
            <Controller
              name="description"
              control={control}
              render={({field}) =>
                <SimpleMdeReact placeholder="Description" {...field} />
              }
        />
        
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type="submit">Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage