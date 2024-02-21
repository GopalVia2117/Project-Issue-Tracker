import { Button } from '@radix-ui/themes';
import React from 'react'
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
  return (
     <div className="max-w-xl ">
      <div className="space-y-3">
          <Skeleton height="2rem" />
          <Skeleton height="26rem"/>
          <Button>Submit New Issue</Button>
      </div>
    </div>
  )
}

export default LoadingNewIssuePage;