import React, { useEffect } from "react";
import "../pages/ProgressBar.css";
const ProgressBar = ({ percentage }) => {
  useEffect(() => {
    const circularProgress = document.querySelectorAll(".circular-progress");
    Array.from(circularProgress).forEach((progressBar) => {
      const progressValue = progressBar.querySelector(".percentage");
      const innerCircle = progressBar.querySelector(".inner-circle");
      let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 1,
        progressColor = progressBar.getAttribute("data-progress-color");

      const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}%`;
        // progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
          "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${
          startValue * 3.6
        }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
        if (startValue === endValue) {
          clearInterval(progress);
        }
      }, speed);
    });
  }, [percentage]);

  return isNaN(Number(percentage)) ? (
    <div>No prediction Found</div>
  ) : (
    // this file is in wrong folder; move it to components under dashboard
    <div
      class="circular-progress"
      data-inner-circle-color="white"
      data-percentage={percentage}
      data-progress-color="#009fee"
      data-bg-color="rgba(57,80,155,.1)"
      style={{ marginLeft: "140px", marginTop: "25px" }}
    >
      <div class="inner-circle"></div>
      <p class="percentage" style={{ color: "black", fontWeight: "400" }}>
        0%
      </p>
    </div>
  );
};

export default ProgressBar;
