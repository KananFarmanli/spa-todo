import React from "react";

import cls from "./ProcessRing.module.scss";

interface ProgressRingProps {
  render?:boolean;
  size?: number;
  progress: number ;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: "round" | "inherit" | "butt" | "square" | undefined;
  label?: string;
  labelColor?: string;
  spinnerSpeed?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = (props) => {
  let {
    render=true,
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `#ddd`,
    indicatorWidth = 10,
    indicatorColor = `#07c`,
    indicatorCap = `round`,
    label = `Subtasks done...`,
    labelColor = `#333`,

    spinnerSpeed = 1.5,
  } = props;

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  let hideLabel = size < 100 || !label.length ? true : false;

  return (
    <>
      <div
        className={cls["svg-pi-wrapper"]}
        style={{ width: size, height: size }}
      >
        <svg className={cls["svg-pi"]} style={{ width: size, height: size }}>
          <circle
            className={cls["svg-pi-track"]}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`${cls["svg-pi-indicator"]} ${cls["svg-pi-indicator--spinner"]}`}
            style={{ animationDuration: ` ${spinnerSpeed}s` }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        {!hideLabel && (
          <div className={cls["svg-pi-label"]} style={{ color: labelColor }}>
        
            <span className={cls["svg-pi-label__loading"]}>{label}</span>
            {render && (
              <span className={cls["svg-pi-label__progress"]}>
                {`${progress > 100 ? 100 : progress}%`}
              </span>

            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressRing;

<div style={{ width: "100%" }}>
  <div style={{ display: "flex" }}>
    <div className={cls.section}>Description</div>
    <div className={cls.section}>Comments</div>
    <div className={cls.section}>Attached files</div>
  </div>
  <span className="background"></span>
</div>;
