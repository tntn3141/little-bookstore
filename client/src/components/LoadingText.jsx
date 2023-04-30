import loadingtext from "../assets/images/loadingtext.gif";

function LoadingText() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <img src={loadingtext} alt="Loading..." />
    </div>
  );
}

export default LoadingText;
