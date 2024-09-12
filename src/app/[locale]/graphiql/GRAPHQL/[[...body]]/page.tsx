import { FC } from 'react';

import GraphiQLClient from '@/components/Graphiql/GraphiQLClient/GraphiQLClient';

const GraphiqlPage: FC = () => {
    return (
        <>
            <GraphiQLClient body={''} />
        </>
    );
};
export default GraphiqlPage;
