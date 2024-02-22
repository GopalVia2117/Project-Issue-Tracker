import { Box, Button } from "@radix-ui/themes"
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-3">
        <Skeleton height="2rem" />
        <Skeleton height="26rem"/>
        <Button>Submit New Issue</Button>
    </Box>
  )
}

export default IssueFormSkeleton