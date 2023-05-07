import loadingdot from "../assets/images/loadingdot.gif";

function LoadingIcon() {
  return (
    <div className="flex w-full h-full items-center justify-center m-24">
      <img src={loadingdot} alt="Loading..." className="mt-[152px]" />
    </div>
  );
}

export default LoadingIcon;
