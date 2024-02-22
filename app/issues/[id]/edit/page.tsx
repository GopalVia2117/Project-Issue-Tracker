import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import prisma from '@/prisma/client';
import IssueFormSkeleton from './loading';


const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    })

const EditIssuePage = async ({ params }: {params: {id: string}}) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound();

  return (
    <div> 
          <IssueForm issue={issue} />  
    </div>
  )
}

export default EditIssuePage;