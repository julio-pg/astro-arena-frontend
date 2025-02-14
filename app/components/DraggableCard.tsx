import { useDraggable } from "@dnd-kit/core";

type Props = {
  monster: Monster;
};

function DraggableCard({ monster }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: monster.id, // Unique ID for each card
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <img
      className="object-contain  cursor-grab active:cursor-grabbing rounded-lg hover:shadow-lg hover:border-2 hover:border-neutral-200 hover:scale-125 transition-transform "
      src={monster.image}
      alt={monster.name}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    />
  );
}

export default DraggableCard;
