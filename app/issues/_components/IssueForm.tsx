"use client";
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;


const IssueForm = async ({ issue }: {issue? : Issue}) => {
  const { register, control, handleSubmit, formState: {errors, isSubmitting} } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState("");
  
  const onSubmit = handleSubmit(async (data) => {
      try {
          if (issue) 
              await axios.patch("/api/issues/" + issue.id, data);
        else
            await axios.post("/api/issues", data);
        router.push("/issues");
        router.refresh();
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  });

  const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });

  return (
    <div className="max-w-xl ">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form onSubmit={onSubmit} className="space-y-3">
            <TextField.Root>
                <TextField.Input {...register("title")} defaultValue={issue?.title} placeholder="Title"/>
            </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({field}) =>
                <SimpleMdeReact placeholder="Description" {...field} />
              }
        />
        
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm;