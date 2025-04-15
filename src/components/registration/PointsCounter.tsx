"use client";

import React, { useEffect } from 'react';

interface PointsCounterProps {
    points: number;
}

const PointsCounter: React.FC<PointsCounterProps> = ({ points }) => {
    useEffect(() => {
        // Store points in sessionStorage to persist across pages
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('points', points.toString());
        }
    }, [points]);

    return (
        <div className="points-counter">
            Points: <span id="points">{points}</span>/100
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${points}%` }}></div>
            </div>
        </div>
    );
};

export default PointsCounter; 