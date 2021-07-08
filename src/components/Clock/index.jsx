import React, { useEffect, useState } from 'react';
import useClock from '../../hooks/useClock';

function Clock(props) {
    const {timeString} = useClock();

    return (
        <p style={{fontSize: '42px'}}>{timeString}</p>
    );
}

export default Clock;