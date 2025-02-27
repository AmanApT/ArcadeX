const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-white bg-cover bg-no-repeat bg-center bg-[url(/src/assets/img.jpg)]">
      <div className="max-w-[65%] font-kdam">
        <h1 className="!text-[3rem] text p-8 shadow-2xl hover:scale-102 backdrop-blur-xl transition delay-150 duration-300 ease-in-out  shadow-black rounded-3xl text-center leading-16 text-[#ffffff]">
          UNLOCK YOUR INNER BEAST AT ARCADE<span className="text-6xl"> X</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
