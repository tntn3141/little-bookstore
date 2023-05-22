import loadingdot from "../assets/images/loadingdot.gif";

function LoadingIcon() {
  return (
    <div className="flex mx-auto">
      <img src={loadingdot} alt="Loading..." className="mt-[152px]" />
    </div>
  );
}

export default LoadingIcon;
