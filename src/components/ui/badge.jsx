export const Badge = ({ children, variant = 'default' }) => {
  // Diccionario de estilos según la variante
  const variantStyles = {
    perro: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    gato: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    default: 'bg-[#1E1E1E] text-[#CFCFCF] border-[#4A4A4A]'
  };

  const selectedStyle = variantStyles[variant.toLowerCase()] || variantStyles.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedStyle} capitalize`}>
      {children}
    </span>
  );
};