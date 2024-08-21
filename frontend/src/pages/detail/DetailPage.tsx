import React from 'react';
import { useParams } from 'react-router-dom';

type MatchParams = {
    touristRouteId : string,
    other : string
}

export const DetailPage:React.FC = () => {
    var parmas = useParams<MatchParams>();
    return <h1>Detail, id: {parmas.touristRouteId} {parmas.other}</h1>;
};
