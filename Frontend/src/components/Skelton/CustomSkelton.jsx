import './CustomSkelton.css'
import { Skeleton } from '@mui/material';

function Skelton({className, ...props}) {
    return (
        <Skeleton
            variant="rounded"
            className={`custom-skelton ${className}`}
            {...props}
        />

    );
}

export default Skelton;