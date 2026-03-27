export default function Vignette() {
    return (
      <div 
        className="pointer-events-none fixed inset-0 z-40 h-full w-full transition-all duration-700"
        style={{
          boxShadow: 'inset 0 0 500px rgba(0,0,0,0.7)' 
        }}
      />
    )
  }