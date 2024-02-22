"use client"

import { EraserIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";


const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete("/api/issues/" + issueId);
    router.push("/issues");
    router.refresh();
  }

  return (
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
  );
};

export default DeleteIssueButton;