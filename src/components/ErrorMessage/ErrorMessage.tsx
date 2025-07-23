interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p style={{ color: "red", padding: "1rem" }}>{message}</p>;
}
