function Error(props) {
  console.log(props);
  return (
    <div className="bg-red-600 text-white my-24 w-[90%] mx-auto p-4">
      <p>{`There was an error handling your request.`}</p>
      <p>Please refresh the page or try again later.</p>
    </div>
  );
}

export default Error;
