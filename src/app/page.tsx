import {
	Activity,
	BarChart,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

export default function Home() {
	const features = [
		{
			name: "Controle de Despesas",
			description: "Registre e categorize suas despesas facilmente.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Visualização de Ganhos",
			description: "Acompanhe seus ganhos e fontes de renda.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Orçamentos Inteligentes",
			description: "Crie orçamentos para diferentes categorias e metas.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Relatórios Gráficos",
			description: "Visualize seus dados financeiros com gráficos interativos.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-3",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 opacity-20 blur-2xl" />
			),
		},
	];

	const cardBackground = (
		<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-75 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-md" />
	);

	const commonCardClassName =
		"bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group";

	return (
		<div className="flex flex-col h-full">
			<main className="flex-1 flex flex-col items-center justify-center p-4 md:p-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
				<div className="z-10 items-center justify-center">
					<AnimatedGradientText
						className="text-4xl md:text-6xl font-bold leading-7 text-center"
						colorFrom="var(--color-foreground)"
						colorTo="var(--color-primary)"
					>
						Tome controle da sua vida
					</AnimatedGradientText>
				</div>

				<p className="text-lg md:text-xl text-center mt-4 md:mt-6 lg:mt-8 mb-8 md:mb-12 lg:mb-16 max-w-2xl text-muted-foreground">
					Gerencie suas finanças pessoais de forma inteligente e visual com o
					Valor Seguro. Acompanhe despesas, ganhos e orçamentos com tabelas
					detalhadas e mantenha o controle total do seu dinheiro.
				</p>

				<BentoGrid className="max-w-5xl mx-auto w-full">
					{features.map((feature, idx) => (
						<BentoCard
							key={feature.name}
							name={feature.name}
							description={feature.description}
							href={feature.href}
							cta={feature.cta}
							background={cardBackground}
							className={`${feature.className} ${commonCardClassName}`}
							Icon={() => {
								if (idx === 0)
									return <TrendingDown className="h-6 w-6 text-primary" />;
								if (idx === 1)
									return <TrendingUp className="h-6 w-6 text-primary" />;
								if (idx === 2)
									return <Target className="h-6 w-6 text-primary" />;
								if (idx === 3)
									return <BarChart className="h-6 w-6 text-primary" />;
								return <Activity className="h-6 w-6 text-primary" />;
							}}
						/>
					))}
				</BentoGrid>
			</main>
		</div>
	);
}
