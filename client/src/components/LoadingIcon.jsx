import loadingdot from "../assets/images/loadingdot.gif";

function LoadingText() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <img src={loadingdot} alt="Loading..." />
    </div>
  );
}

export default LoadingText;
