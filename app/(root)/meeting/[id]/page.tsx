"use client"
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {

  const { user, isLoaded } = useUser();
  const [setupComplete, setSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading)
    return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme as="main" className="my-custom-root-class">
          {!setupComplete ? <MeetingSetup setSetupComplete={setSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting