import heroVideo from "../assets/videos/sesha_ramya.mp4";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* VIDEO */}
      <video
        src={heroVideo}
        autoPlay
        loop
        className="absolute w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute w-full h-full bg-black/50"></div>
    </div>
  );
};

export default Hero;