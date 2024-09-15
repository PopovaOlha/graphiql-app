'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

import GraphiQLClient from '@/components/Graphiql/GraphiQLClient/GraphiQLClient';

const GraphiqlPage: FC = () => {
    const params = useParams();
    return (
        <>
            <GraphiQLClient body={params.body ? params.body[0] : ''} />
        </>
    );
};
export default GraphiqlPage;
