// Hard-coded article for promotions and other programs

const Article = () => {
  return (
    <div className="flex flex-col justify-center md:w-[80%] mx-auto pt-10">
      <img
        src="/assets/book-sale-640.webp"
        srcSet="/assets/book-sale-360.webp 640w"
        alt="to feature article 4"
        width="100%"
      />
      <h1>Lorem Ispum 50%</h1>
      <p className="break-words wrap text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a viverra
        justo. In sed semper tortor, sed maximus mauris. Nullam pulvinar nisi
        sit amet nisi finibus egestas. Aenean quis erat ac ante tempus aliquam.
        Pellentesque vel finibus quam, a volutpat nisl. Nam lacinia in ante
        vitae ullamcorper. Proin feugiat tincidunt faucibus. Curabitur mollis
        justo non laoreet iaculis.
      </p>
      <p className="break-words wrap text-justify">
        Aliquam erat volutpat. Vestibulum ut turpis quis elit accumsan dapibus
        eu nec dui. Donec eleifend faucibus placerat. Vivamus scelerisque
        tristique sollicitudin. Aenean ut nunc aliquet tellus consectetur varius
        vel eget est. Donec massa quam, eleifend at convallis ut, iaculis in
        augue. Proin egestas tempor placerat. Vestibulum nisi nibh, ultrices sit
        amet velit at, eleifend dapibus lacus. Cras in nibh vel massa malesuada
        fermentum. Aenean hendrerit in augue at suscipit. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Vivamus varius at dolor nec convallis. Curabitur ut nisl sit amet purus
        congue accumsan at finibus lorem. Sed ut volutpat orci, at finibus nunc.
        Phasellus aliquet ligula sapien, eu bibendum leo tincidunt sed.
      </p>
      <p className="break-words wrap text-justify">
        Fusce rutrum augue mi, at blandit elit faucibus a. Vivamus ultricies
        consequat velit vulputate tincidunt. Suspendisse felis nunc, vulputate
        sed libero vel, vulputate tincidunt risus. Ut id commodo erat. Mauris
        euismod sit amet massa eget posuere. Donec sit amet vehicula lectus.
        Nulla placerat libero a nibh semper mollis. Sed tincidunt non dui a
        fringilla.
      </p>
    </div>
  );
};

export default Article;
