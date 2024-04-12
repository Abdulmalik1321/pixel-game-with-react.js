import { Obstacle } from "./Obstacle";
import { Player } from "./Player";

export function GameWindow({ obstacles }: { obstacles: number[][] }) {
  return (
    <div className="GameWindow">
      <div id="GameBackground" className="GameBackground">
        {obstacles.map((obstacle) => {
          return <Obstacle obstacle={obstacle} />;
        })}
      </div>
      <Player />
    </div>
  );
}
