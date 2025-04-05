import { Container } from "@mui/material";
import { EditorPage } from "./grid-editor/pages/EditorPage";
import { Snackbar } from "./shared/components/Snackbar";

function App() {
  return (
    <>
      <Container>
        <EditorPage />
      </Container>
      <Snackbar />
    </>
  );
}

export default App;
