import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });


    if (!issue) notFound();

    return (
        <Grid gap="5" columns="1">
            <Box className="col-span-1">
                <IssueDetails issue={issue} />
                <Flex gap="5" mt="4">
                     <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
               </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage;