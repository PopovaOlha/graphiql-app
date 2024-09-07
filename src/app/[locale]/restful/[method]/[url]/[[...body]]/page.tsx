'use client';

import { useParams } from 'next/navigation';

import { RestClient } from '@/components/RestClient/RestClient';

const RestfulPage = () => {
    const params = useParams();
    return <RestClient body={params.body[0]} />;
};

export default RestfulPage;
