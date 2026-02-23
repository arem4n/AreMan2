
import React from 'react';
import { motion } from 'framer-motion';

const DrawIcon: React.FC<{ type: 'check' | 'cross' }> = ({ type }) => {
    const isCheck = type === 'check';
    const color = isCheck ? '#4ade80' : '#ef4444'; // green-400 : red-500

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2.5">
            {isCheck ? (
                <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                    }}
                />
            ) : (
                <>
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                        }}
                    />
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1,
                            delay: 0.5 // Stagger the cross lines
                        }}
                    />
                </>
            )}
        </svg>
    );
};

const ROI: React.FC = () => {
    return (
        <section className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                        El Costo de la Invisibilidad
                    </h2>
                    <p className="text-lg text-deep-600 max-w-3xl mx-auto">
                        El diseño no es un gasto decorativo. Es una herramienta de valoración financiera. ¿Cuánto vale que tu cliente confíe en ti en 0.05 segundos?
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Scenario A: The Commodity */}
                    <div className="bg-deep-50 p-8 rounded-2xl border border-deep-100 opacity-70 hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-bold text-deep-500 mb-4 uppercase tracking-wider">El Camino Genérico</h3>
                        <ul className="space-y-4 text-deep-700">
                            <li className="flex items-start">
                                <DrawIcon type="cross" />
                                <span><strong>Guerra de Precios:</strong> Si te ves igual a los demás, el cliente elige al más barato.</span>
                            </li>
                            <li className="flex items-start">
                                <DrawIcon type="cross" />
                                <span><strong>Desconfianza Automática:</strong> Una estética de plantilla grita &quot;amateur&quot; o &quot;riesgo&quot; a los inversores.</span>
                            </li>
                            <li className="flex items-start">
                                <DrawIcon type="cross" />
                                <span><strong>Deuda Técnica Visual:</strong> Re-hacer tu marca en 2 años cuesta el triple (papelería, web, confusión de clientes).</span>
                            </li>
                        </ul>
                    </div>

                    {/* Scenario B: The Sovereign Brand */}
                    <div className="bg-deep-900 p-8 rounded-2xl shadow-2xl border border-symbolic-500 relative overflow-hidden text-white transform md:scale-105">
                        <div className="absolute top-0 right-0 bg-symbolic-600 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">La Ruta LogoCodex™</div>
                        <h3 className="text-xl font-bold text-creative-400 mb-4 uppercase tracking-wider">Soberanía Visual</h3>
                        <ul className="space-y-4 text-deep-100">
                            <li className="flex items-start">
                                <DrawIcon type="check" />
                                <span><strong>Premium Pricing:</strong> La autoridad visual justifica tarifas más altas. Pareces más caro, puedes cobrar más caro.</span>
                            </li>
                            <li className="flex items-start">
                                <DrawIcon type="check" />
                                <span><strong>Conversión Instantánea:</strong> La coherencia semiótica reduce la fricción. El cliente &quot;entiende&quot; tu valor sin leer.</span>
                            </li>
                            <li className="flex items-start">
                                <DrawIcon type="check" />
                                <span><strong>Activo Intangible:</strong> Construyes propiedad intelectual (IP) que aumenta la valoración de tu empresa al levantar capital.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROI;
