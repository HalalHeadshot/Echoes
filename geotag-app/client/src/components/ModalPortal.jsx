import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default ModalPortal;
/*
This component makes sure your modal is mounted directly inside <body> — 
so it overlays everything, regardless of where it’s triggered.
 */