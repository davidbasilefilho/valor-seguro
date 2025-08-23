import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import {
	Activity,
	TrendingDown,
	TrendingUp,
	Target,
	BarChart,
} from "lucide-react";

export default function Home() {
	const features = [
		{
			name: "Controle de Despesas",
			description: "Registre e categorize suas despesas facilmente.",
			href: "/transactions",
			cta: "Registrar",
			className: "col-span-3 lg:col-span-1",
			gradient: "from-pink-400 via-purple-400 to-indigo-400",
		},
		{
			name: "Visualização de Ganhos",
			description: "Acompanhe seus ganhos e fontes de renda.",
			href: "/transactions",
			cta: "Ver ganhos",
			className: "col-span-3 lg:col-span-1",
			gradient: "from-green-400 via-teal-400 to-cyan-400",
		},
		{
			name: "Orçamentos Inteligentes",
			description: "Crie orçamentos para diferentes categorias e metas.",
			href: "/budgets",
			cta: "Criar",
			className: "col-span-3 lg:col-span-1",
			gradient: "from-yellow-400 via-orange-400 to-rose-400",
		},
		{
			name: "Relatórios Gráficos",
			description: "Visualize seus dados financeiros com gráficos interativos.",
			href: "/",
			cta: "Explorar",
			className: "col-span-3 lg:col-span-3",
			gradient: "from-blue-400 via-sky-400 to-cyan-400",
		},
	];

	const cardBackground = (gradient: string) => (
		<div
			className={`absolute inset-0 w-full h-full bg-gradient-to-br ${gradient} opacity-30 blur-3xl transition-all duration-500 group-hover:opacity-60 group-hover:blur-md`}
		/>
	);

	const commonCardClassName =
		"relative overflow-hidden bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-1 group";

	return (
		<div className="flex flex-col h-full">
			<main className="flex-1 flex flex-col items-center justify-center p-4 md:p-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
				<div className="relative z-10 flex flex-col items-center justify-center gap-6">
					<AnimatedGradientText
						className="text-4xl md:text-6xl font-extrabold leading-9 text-center tracking-tight"
						colorFrom="#0f172a"
						colorTo="#06b6d4"
					>
						Tome controle da sua vida — com estilo
					</AnimatedGradientText>

					<p className="text-base md:text-lg text-center mt-2 max-w-2xl text-muted-foreground">
						Valor Seguro torna finanças divertidas: risque metas, celebre
						vitórias e veja seu dinheiro trabalhar a seu favor com gráficos e
						orçamentos animados.
					</p>

					<div className="flex gap-3 mt-3">
						<a
							href="/signup"
							className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transform transition"
						>
							Começar — é grátis
						</a>
						<a
							href="/about"
							className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-foreground/90 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition"
						>
							Saiba mais
						</a>
					</div>
				</div>

				<div className="mt-10 w-full">
					<BentoGrid className="max-w-5xl mx-auto w-full">
						{features.map((feature, idx) => (
							<BentoCard
								key={feature.name}
								name={feature.name}
								description={feature.description}
								href={feature.href}
								cta={feature.cta}
								background={cardBackground(feature.gradient)}
								className={`${feature.className} ${commonCardClassName}`}
								Icon={() => {
									if (idx === 0)
										return <TrendingDown className="h-6 w-6 text-white" />;
									if (idx === 1)
										return <TrendingUp className="h-6 w-6 text-white" />;
									if (idx === 2)
										return <Target className="h-6 w-6 text-white" />;
									if (idx === 3)
										return <BarChart className="h-6 w-6 text-white" />;
									return <Activity className="h-6 w-6 text-white" />;
								}}
							/>
						))}
					</BentoGrid>
				</div>
			</main>
		</div>
	);
}
