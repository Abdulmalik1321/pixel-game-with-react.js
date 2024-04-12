import { GameWindow } from "./components/GameWindow";

import "./App.css";

function App() {
  // console.log("app reloading");

  const obstacles: number[][] = [
    [525, 550],
    [725, 750],
    [925, 950],
  ];

  let positionLeft: number = 0;
  let positionTop: number = 0;
  const keys: { [key: string]: boolean } = {};

  const player = (e: KeyboardEvent): void => {
    if (e.type === "keydown") {
      keys[e.key] = true;
    } else {
      delete keys[e.key];
    }
  };

  const gameLoop = (): void => {
    const character = document.getElementById("player") as HTMLDivElement;
    const GameBackground = document.getElementById(
      "GameBackground"
    ) as HTMLDivElement;

    // const counts = [4, 9, 15, 6, 2],
    // goal = 5;

    const nearestObstacle: number[] = obstacles.reduce(
      (prev: number[], curr: number[]) => {
        // console.log(prev, curr);

        return Math.abs(curr[0] - Math.abs(positionLeft)) <
          Math.abs(prev[0] - Math.abs(positionLeft))
          ? curr
          : prev;
      }
    );
    // console.log(nearestObstacle, Math.abs(positionLeft));

    if (keys["ArrowUp"]) {
      if (positionTop < 50) {
        // character.classList.add("jump");
        positionTop = positionTop + 25;
        character.style.top = `calc(85% - ${positionTop}px)`;

        if (
          positionLeft > -nearestObstacle[0] ||
          positionLeft < -nearestObstacle[1]
        ) {
          setTimeout(() => {
            // character.classList.remove("jump");
            positionTop = positionTop - 25;
            character.style.top = `calc(100% - 50px)`;
          }, 200);
        } else {
          setTimeout(() => {
            // character.classList.remove("jump");
            positionTop = positionTop - 25;
            character.style.top = `calc(100% - 100px)`;
          }, 200);
        }
      }
    }

    // console.log(
    //   positionTop,
    //   positionLeft,
    //   0 - obstacles[0][0],
    //   0 - obstacles[0][1]
    // );

    if (
      keys["ArrowRight"] &&
      (positionLeft > -nearestObstacle[0] ||
        positionLeft < -nearestObstacle[1] ||
        positionTop >= 50)
    ) {
      positionLeft = positionLeft - 5;
      GameBackground.style.left = `${positionLeft}px`;
    } else if (
      keys["ArrowRight"] &&
      !(
        positionLeft > -nearestObstacle[0] ||
        positionLeft < -nearestObstacle[1] ||
        positionTop >= 50
      )
    ) {
      positionTop = 25;
    }

    if (
      keys["ArrowLeft"] &&
      (positionLeft > -(nearestObstacle[0] + 25) ||
        positionLeft < -(nearestObstacle[1] + 25) ||
        positionTop >= 50)
    ) {
      positionLeft = positionLeft + 5;
      GameBackground.style.left = `${positionLeft}px`;
    } else if (
      keys["ArrowLeft"] &&
      !(
        positionLeft > -(nearestObstacle[0] + 25) ||
        positionLeft < -(nearestObstacle[1] + 25) ||
        positionTop >= 50
      )
    ) {
      positionTop = 25;
    }

    requestAnimationFrame(gameLoop);
  };

  window.onkeydown = window.onkeyup = player;
  gameLoop();

  return (
    <>
      <GameWindow obstacles={obstacles} />
    </>
  );
}

export default App;
