import './CustomSkelton.css'
import { Skeleton } from '@mui/material';

function CustomSkelton({className , ...props}) {
    return (
        <Skeleton
            variant="rounded"
            className={className}
            {...props}
        />

    );
}

export default CustomSkelton;