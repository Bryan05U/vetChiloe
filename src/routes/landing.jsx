// routes/Landing.jsx
import GradientBorderButton from "../components/ui/GradientButton";
import DotGrid from "../components/ui/DotGrid";
function Landing() {
  return (
    <main className="font-poppins relative w-full min-h-screen max-h-screen overflow-hidden landing-page">
      {/* Grilla de puntos */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2F293A"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Texto Principal */}
      <div className="relative z-10 flex flex-col w-full min-h-screen justify-center items-center pointer-events-none">
        <div className="flex flex-col mb-7 justify-around text-center">
          <h1 className="text-6xl font-bold text-white">VetChiloe</h1>
          <h2 className="text-5xl font-bold text-white">
            Sistema De información
          </h2>
        </div>

        {/* El botón sí necesita recibir clics */}
        <div className="pointer-events-auto">
          <GradientBorderButton link="home" buttonText="Ingresar" />
        </div>
      </div>
    </main>
  );
}
export default Landing;
