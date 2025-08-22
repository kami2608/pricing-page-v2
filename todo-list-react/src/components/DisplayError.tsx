import type { FieldError } from "react-hook-form";

export default function DisplayError({error}: {error: FieldError | undefined}) {
  if (error) {
    return (
      <>
        <p style={{ color: "red" }}>
          { error.message }
        </p>
        <br />
      </>
    );
  }
  return null;
}
