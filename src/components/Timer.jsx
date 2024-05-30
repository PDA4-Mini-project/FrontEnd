import { memo, useEffect, useState } from 'react';

export const Timer = memo(({ time }) => {
    // time 분
    const playTime = time * 60 * 1000;
    // 1분
    const INTERVAL = 60 * 1000;
    // 남은 시간
    const [leftTime, setLeftTime] = useState(playTime);

    // 시간을 시간과 분으로 변환하는 함수
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return {
            hours: hours.toString(),
            minutes: String(minutes).padStart(2, '0'),
        };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setLeftTime((prevTime) => {
                if (prevTime <= INTERVAL) {
                    clearInterval(timer);
                    console.log('시간 끝');
                    return 0;
                }
                return prevTime - INTERVAL;
            });
        }, INTERVAL);

        return () => clearInterval(timer);
    }, []);

    const { hours, minutes } = formatTime(leftTime);

    return (
        <p className="text-white font-bold text-2xl w-fit">
            {hours} : {minutes}
        </p>
    );
});

Timer.displayName = 'Timer';
