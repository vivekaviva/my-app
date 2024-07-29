import { useNavigate } from "react-router-dom";

export default function Student1() {
  const navigate = useNavigate();

  function submit() {
    navigate("/students/student2");
  }
  return (
    <>
      <p>Student 1 </p>
      <button onClick={submit}>Click to navigate</button>
    </>
  );
}
