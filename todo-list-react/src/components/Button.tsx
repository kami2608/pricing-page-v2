interface ButtonProps {
  title: string;
  handleClick?: () => void;
}

export default function Button({ title, handleClick }: ButtonProps) {
  return <button onClick={handleClick}>{title}</button>;
}
