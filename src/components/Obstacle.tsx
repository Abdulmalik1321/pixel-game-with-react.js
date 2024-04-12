export function Obstacle({ obstacle }: { obstacle: number[] }) {
  return (
    <div
      style={{
        left: `${obstacle[0] + 653}px`,
        width: `${obstacle[1] - obstacle[0]}px`,
      }}
      className="obstacle"
    ></div>
  );
}
