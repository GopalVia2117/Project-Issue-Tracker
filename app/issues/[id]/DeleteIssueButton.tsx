"use client"

import { EraserIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (err) {
      setError(true);
    }
  }

  return (
    <>
      <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <EraserIcon/>
          <span>Delete Issue</span>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>

        <Flex mt="4" gap="4">
          <AlertDialog.Action>
            <Button onClick={handleDelete} color="red">Confirm Delete</Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>

      </AlertDialog.Root>
      

      <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This action could not be deleted.</AlertDialog.Description>
        <AlertDialog.Action>
          <Button onClick={() => setError(false)} color="gray" variant="soft" mt="4">OK</Button>   
        </AlertDialog.Action>
      </AlertDialog.Content>

    </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;


