'use client'
import * as React from 'react';
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur';
import { useSession } from 'next-auth/react';

import Alert from '@/components/Alert';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const FormSubmit = observer(() => {
    const { data: session, status } = useSession()
    return (
        <>
            { registerEntrepreneur.progress &&
                <Box sx={{ width: '100%', marginBottom: '1rem' }}>
                    <LinearProgress />
                </Box>
            }
            <Alert open={registerEntrepreneur.alert.open} state={registerEntrepreneur.alert.state} link={registerEntrepreneur.alert.link}
            text={registerEntrepreneur.alert.text} close={()=>registerEntrepreneur.resetAlert()}/>
            <Button variant="contained" sx={{color: 'white', width: '100%', borderRadius: '5rem'}} onClick={()=>registerEntrepreneur.submitForm(session?.user?.id)}>ยืนยันการสมัคร</Button>            
        </>
    )
})

export default FormSubmit