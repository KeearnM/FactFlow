import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import useFactCheck from "../hooks/useFactCheck";

const FactCheckModal = (props) => {
  const { loading, result, error } = useFactCheck(props.story);
  const [displayResult, setDisplayResult] = useState([]);
  const [claims, setClaims] = useState();
  const [source, setSource] = useState();
  const [analysis, setAnalysis] = useState();
  const [bias, setBias] = useState();

  const stringParse = (geminiRes) => {
    if (geminiRes.startsWith("```")) {
      const cleanString = geminiRes.replace(/^```|```$/g, "");
      if (/^(json|JSON)/i.test(cleanString)) {
        const parsedStr = cleanString.replace(/^(json|JSON)\s*/, "");
        const jsonparsed = JSON.parse(parsedStr);
        console.log(geminiRes); //when using geminiRes sit appears straight away
        console.log(jsonparsed);
        setDisplayResult(geminiRes);
        setClaims(jsonparsed.claims);
        setSource(jsonparsed.credible_sources);
        setAnalysis(jsonparsed.fact_check_results.analysis);
        setBias(jsonparsed.potential_biases);
      }
    } else {
      setDisplayResult(geminiRes);
    }
  };

  useEffect(() => {
    if (result) {
      stringParse(result);
    }
  }, [result]);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          color: "text.primary",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Fact Check Result
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <h4>Claims</h4>
          {claims}
          <h4>Sources</h4>
          {source}
          <h4>Analysis</h4>
          {analysis}
          <h4>Bias</h4>
          {bias}
        </Typography> */}
        <div id="modal-modal-description" sx={{ mt: 2 }}>
          <Typography variant="h6">Claims</Typography>
          {claims}
          <Typography variant="h6">Sources</Typography>
          {source}
          <Typography variant="h6">Analysis</Typography>
          {analysis}
          <Typography variant="h6">Bias</Typography>
          {bias}
        </div>
      </Box>
    </Modal>
  );
};

export default FactCheckModal;
